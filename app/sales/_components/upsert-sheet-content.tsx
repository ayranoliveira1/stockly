"use client";

import { Button } from "@/app/_components/ui/button";
import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
   SheetContent,
   SheetDescription,
   SheetFooter,
   SheetHeader,
   SheetTitle,
} from "@/app/_components/ui/sheet";
import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableFooter,
   TableHead,
   TableHeader,
   TableRow,
} from "@/app/_components/ui/table";
import { formatCurrency } from "@/app/_helpers/currency";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { upsertSale } from "@/app/_actions/sales/upsert-sales";
import { toast } from "sonner";
import UpsertSaleTableDropdownMenu from "./upsert-table-dropdown-menu";
import { ProductDto } from "@/app/_data-acess/product/get-product";

const formSchema = z.object({
   productId: z.string().uuid({ message: "Produto é obrigatorio" }),
   quantity: z.coerce.number().int().positive(),
});

type FormSchema = z.infer<typeof formSchema>;

interface SelectedProduct {
   id: string;
   name: string;
   price: number;
   quantity: number;
}

interface SalesUpsertSheetContentProps {
   saleId?: string;
   products: ProductDto[];
   productsOptions: ComboboxOption[];
   setSheetIsOpen: () => void;
   defaultSelectedProduct?: SelectedProduct[];
}

const SalesUpsertSheetContent = ({
   saleId,
   productsOptions,
   products,
   setSheetIsOpen,
   defaultSelectedProduct,
}: SalesUpsertSheetContentProps) => {
   const [selectedProduct, setSelectedProduct] = useState<SelectedProduct[]>(
      defaultSelectedProduct ?? [],
   );

   const form = useForm<FormSchema>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         productId: "",
         quantity: 1,
      },
   });

   const onSubmit = (data: FormSchema) => {
      const selectedProduct = products.find(
         (product) => product.id === data.productId,
      );

      if (!selectedProduct) return;

      setSelectedProduct((currencyProducts) => {
         const existingProduct = currencyProducts.find(
            (product) => product.id === selectedProduct.id,
         );

         if (existingProduct) {
            const productIsOutOfStock =
               existingProduct.quantity + data.quantity > selectedProduct.stock;

            if (productIsOutOfStock) {
               form.setError("quantity", {
                  message: "Quantidade indisponível em estoque.",
               });

               return currencyProducts;
            }
            form.reset();

            return currencyProducts.map((product) => {
               if (product.id === selectedProduct.id) {
                  return {
                     ...product,
                     quantity: product.quantity + data.quantity,
                  };
               }

               return product;
            });
         }

         const productIsOutOfStock = data.quantity > selectedProduct.stock;

         if (productIsOutOfStock) {
            form.setError("quantity", {
               message: "Quantidade indisponível em estoque.",
            });

            return currencyProducts;
         }
         form.reset();

         return [
            ...currencyProducts,
            {
               ...selectedProduct,
               price: Number(selectedProduct.price),
               quantity: data.quantity,
            },
         ];
      });
   };

   const productsTotal = useMemo(() => {
      return selectedProduct.reduce((acc, product) => {
         return acc + product.price * product.quantity;
      }, 0);
   }, [selectedProduct]);

   const onDelete = (productId: string) => {
      setSelectedProduct((products) => {
         return products.filter((products) => products.id !== productId);
      });
   };

   const onSubmitSale = async () => {
      try {
         await upsertSale({
            id: saleId,
            products: selectedProduct.map((product) => {
               return {
                  id: product.id,
                  quantity: product.quantity,
               };
            }),
         });
         toast.success("Venda criada com sucesso!");
         setSheetIsOpen();
         setSelectedProduct([]);
      } catch (error) {
         toast.error("Erro ao criar a venda.");
         setSelectedProduct([]);
      }
   };

   return (
      <SheetContent className="!max-w-[600px]">
         <SheetHeader>
            <SheetTitle>Nova Venda</SheetTitle>
            <SheetDescription>
               Insira as informações da venda abaixo.
            </SheetDescription>
         </SheetHeader>

         <Form {...form}>
            <form
               onSubmit={form.handleSubmit(onSubmit)}
               className="space-y-6 py-6"
            >
               <FormField
                  control={form.control}
                  name="productId"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Produto</FormLabel>
                        <FormControl>
                           <Combobox
                              options={productsOptions}
                              {...field}
                              placeholder="Selecione um produto"
                           />
                        </FormControl>

                        <FormMessage />
                     </FormItem>
                  )}
               />

               <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Quantidade</FormLabel>
                        <FormControl>
                           <Input
                              type="number"
                              placeholder="Digite a quantidade"
                              {...field}
                           />
                        </FormControl>

                        <FormMessage />
                     </FormItem>
                  )}
               />

               <Button
                  className="w-full gap-2"
                  type="submit"
                  variant="secondary"
               >
                  <PlusIcon size={20} />
                  Adicionar produto a venda
               </Button>
            </form>
         </Form>

         <Table>
            <TableCaption>Lista dos produtos adicionados à venda.</TableCaption>
            <TableHeader>
               <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Preço unitário</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Ações</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {selectedProduct.map((product) => (
                  <TableRow key={product.id}>
                     <TableCell>{product.name}</TableCell>
                     <TableCell>{formatCurrency(product.price)}</TableCell>
                     <TableCell>{product.quantity}</TableCell>
                     <TableCell>
                        {formatCurrency(product.price * product.quantity)}
                     </TableCell>
                     <TableCell>
                        <UpsertSaleTableDropdownMenu
                           onDelete={onDelete}
                           product={product}
                        />
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>

            <TableFooter>
               <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell>{formatCurrency(productsTotal)}</TableCell>
               </TableRow>
            </TableFooter>
         </Table>

         <SheetFooter className="pt-6">
            <Button
               className="w-full gap-2"
               disabled={selectedProduct.length === 0}
               onClick={onSubmitSale}
            >
               <CheckIcon size={16} />
               Finalizar venda
            </Button>
         </SheetFooter>
      </SheetContent>
   );
};

export default SalesUpsertSheetContent;

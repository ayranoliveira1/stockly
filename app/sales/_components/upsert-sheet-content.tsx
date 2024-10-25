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
import { Product } from "@prisma/client";
import { MoreHorizontalIcon, PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SalesTableDropdownMenu from "./table-dropdown-menu";

const formSchema = z.object({
   productId: z.string().uuid({ message: "Produto é obrigatorio" }),
   quantity: z.coerce.number().int().positive(),
});

type FormSchema = z.infer<typeof formSchema>;

interface SalesUpsertSheetContentProps {
   products: Product[];
   productsOptions: ComboboxOption[];
}

interface SelectedProduct {
   id: string;
   name: string;
   price: number;
   quantity: number;
}

const SalesUpsertSheetContent = ({
   productsOptions,
   products,
}: SalesUpsertSheetContentProps) => {
   const [selectedProduct, setSelectedProduct] = useState<SelectedProduct[]>(
      [],
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

         return [
            ...currencyProducts,
            {
               ...selectedProduct,
               price: Number(selectedProduct.price),
               quantity: data.quantity,
            },
         ];
      });

      form.reset();
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
                        <SalesTableDropdownMenu
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
      </SheetContent>
   );
};

export default SalesUpsertSheetContent;

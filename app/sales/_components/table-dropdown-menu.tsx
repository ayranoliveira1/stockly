"use client";

import { deleteSale } from "@/app/_actions/sales/delete-sales";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import {
   MoreHorizontalIcon,
   ClipboardCopyIcon,
   EditIcon,
   TrashIcon,
} from "lucide-react";
import { toast } from "sonner";
import SalesUpsertSheetContent from "./upsert-sheet-content";
import { useState } from "react";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { ProductDto } from "@/app/_data-acess/product/get-product";
import { SaleDto } from "@/app/_data-acess/sale/get-sale";

interface SalesPageDropdownMenuProps {
   sale: Pick<SaleDto, "id" | "saleProduct">;
   products: ProductDto[];
   productsOptions: ComboboxOption[];
}

const SalesPageDropdownMenu = ({
   sale,
   products,
   productsOptions,
}: SalesPageDropdownMenuProps) => {
   const [upsertShetIsOpen, setUpsertSheetIsOpen] = useState(false);

   const handleCopyToClipboardClick = () => {
      navigator.clipboard.writeText(sale.id);
      toast.success("ID copiado para a área de transferência");
   };

   const handleConfirmDeleteClick = async () => {
      try {
         await deleteSale({ id: sale.id });
         toast.success("Venda deletada com sucesso");
      } catch (error) {
         toast.error("Erro ao deletar a venda");
      }
   };

   return (
      <Sheet open={upsertShetIsOpen} onOpenChange={setUpsertSheetIsOpen}>
         <AlertDialog>
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                     <MoreHorizontalIcon size={16} />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent>
                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                     className="gap-1.5"
                     onClick={handleCopyToClipboardClick}
                  >
                     <ClipboardCopyIcon size={16} />
                     Copiar ID
                  </DropdownMenuItem>

                  <SheetTrigger asChild>
                     <DropdownMenuItem className="gap-1.5">
                        <EditIcon size={16} />
                        Editar
                     </DropdownMenuItem>
                  </SheetTrigger>

                  <AlertDialogTrigger asChild>
                     <DropdownMenuItem className="gap-1.5">
                        <TrashIcon size={16} />
                        Deletar
                     </DropdownMenuItem>
                  </AlertDialogTrigger>
               </DropdownMenuContent>
            </DropdownMenu>

            <SalesUpsertSheetContent
               saleId={sale.id}
               products={products}
               productsOptions={productsOptions}
               setSheetIsOpen={() => setUpsertSheetIsOpen(false)}
               defaultSelectedProduct={sale.saleProduct.map((saleProduct) => ({
                  id: saleProduct.productId,
                  name: saleProduct.productName,
                  quantity: saleProduct.quantity,
                  price: saleProduct.unitPrice,
               }))}
            />

            {/* Deletar venda*/}
            <AlertDialogContent>
               <AlertDialogHeader>
                  <AlertDialogTitle>Deletar venda</AlertDialogTitle>
                  <AlertDialogDescription>
                     Você está prestes a deletar este protuto. Está ação não
                     pode ser desfeita. Deseja continuar?
                  </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleConfirmDeleteClick}>
                     Deletar
                  </AlertDialogAction>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </Sheet>
   );
};

export default SalesPageDropdownMenu;

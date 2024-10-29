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
import { Sale } from "@prisma/client";
import {
   MoreHorizontalIcon,
   ClipboardCopyIcon,
   EditIcon,
   TrashIcon,
} from "lucide-react";
import { toast } from "sonner";

interface SalesPageDropdownMenuProps {
   sale: Pick<Sale, "id">;
}

const SalesPageDropdownMenu = ({ sale }: SalesPageDropdownMenuProps) => {
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

               <DropdownMenuItem className="gap-1.5">
                  <EditIcon size={16} />
                  Editar
               </DropdownMenuItem>

               <AlertDialogTrigger asChild>
                  <DropdownMenuItem className="gap-1.5">
                     <TrashIcon size={16} />
                     Deletar
                  </DropdownMenuItem>
               </AlertDialogTrigger>
            </DropdownMenuContent>
         </DropdownMenu>

         {/*  */}
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Deletar venda</AlertDialogTitle>
               <AlertDialogDescription>
                  Você está prestes a deletar este protuto. Está ação não pode
                  ser desfeita. Deseja continuar?
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
   );
};

export default SalesPageDropdownMenu;

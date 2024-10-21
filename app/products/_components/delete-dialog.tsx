import { deleteProduct } from "@/app/_actions/product/delete-product";
import {
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { toast } from "sonner";

interface DeleteDialogContentProps {
   productId: string;
   productName: string;
}

const DeleteDialogContent = ({
   productId,
   productName,
}: DeleteDialogContentProps) => {
   const handleDeleteClick = async () => {
      try {
         await deleteProduct({ id: productId });
         toast.success(`Produto excluido com sucesso!`);
      } catch (error) {
         console.error(error);
         toast.error(`Ocorreu um erro ao excluir o produto.`);
      }
   };

   return (
      <AlertDialogContent>
         <AlertDialogHeader>
            <AlertDialogTitle>
               Deletar o produto "{productName}"
            </AlertDialogTitle>
            <AlertDialogDescription>
               Você está prestes a deletar este protuto. Está ação não pode ser
               desfeita. Deseja continuar?
            </AlertDialogDescription>
         </AlertDialogHeader>
         <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteClick}>
               Deletar
            </AlertDialogAction>
         </AlertDialogFooter>
      </AlertDialogContent>
   );
};

export default DeleteDialogContent;

import { CircleIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { ProductStatusDto } from "../_data-acess/product/get-product";

const getStatusLabel = (status: string) => {
   if (status === "IN_STOCK") {
      return "Em estoque";
   }

   return "Fora de estoque";
};

interface ProductStatusBadgeProps {
   status: ProductStatusDto;
}

const ProductStatusBadge = ({ status }: ProductStatusBadgeProps) => {
   const label = getStatusLabel(status);

   return (
      <Badge
         variant={label === "Em estoque" ? "default" : "destructive"}
         className="gap-2"
      >
         <CircleIcon size={12} className="fill-white" />
         {label}
      </Badge>
   );
};

export default ProductStatusBadge;

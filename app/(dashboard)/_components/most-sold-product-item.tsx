import ProductStatusBadge from "@/app/_components/product-status-badge";
import { MostSoldProductDto } from "@/app/_data-acess/dashboard/get-last-14-days-revenue";
import { formatCurrency } from "@/app/_helpers/currency";

interface MostSoldProductItemProps {
   product: MostSoldProductDto;
}

const MostSoldProductItem = ({ product }: MostSoldProductItemProps) => {
   return (
      <div className="flex items-center justify-between">
         <div className="space-y-[6px]">
            <ProductStatusBadge status={product.status} />
            <p className="font-semibold">{product.name}</p>
            <p className="font-medium text-slate-500">
               {formatCurrency(product.price)}
            </p>
         </div>

         <div>
            <p className="text-sm font-semibold">
               {product.totalSold} vendidos
            </p>
         </div>
      </div>
   );
};

export default MostSoldProductItem;

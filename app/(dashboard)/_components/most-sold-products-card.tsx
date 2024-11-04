import { getMostSoldProducts } from "@/app/_data-acess/dashboard/get-most-sold-products";
import MostSoldProductItem from "./most-sold-product-item";

const MostSoldProductsCard = async () => {
   const mostSoldProducts = await getMostSoldProducts();

   return (
      <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white">
         <p className="mb-2 px-6 py-3 text-xl font-semibold text-slate-900">
            Produtos mais vendidos
         </p>

         <div className="mt-2 space-y-7 overflow-y-auto px-6 pb-6 [&::-webkit-scrollbar]:hidden">
            {mostSoldProducts.map((product) => (
               <MostSoldProductItem key={product.productId} product={product} />
            ))}
         </div>
      </div>
   );
};

export default MostSoldProductsCard;

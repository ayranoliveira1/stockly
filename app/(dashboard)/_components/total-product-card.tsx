import { ShoppingBasketIcon } from "lucide-react";
import SummaryCard, {
   SummaryCardIcon,
   SummaryCardTitle,
   SummaryCardValue,
} from "./summary-card";
import { getTotalProduct } from "@/app/_data-acess/dashboard/get-total-product";

const TotalProductCard = async () => {
   const totalProducts = await getTotalProduct();

   return (
      <SummaryCard>
         <SummaryCardIcon>
            <ShoppingBasketIcon />
         </SummaryCardIcon>
         <SummaryCardTitle>Produtos</SummaryCardTitle>
         <SummaryCardValue>{totalProducts}</SummaryCardValue>
      </SummaryCard>
   );
};

export default TotalProductCard;

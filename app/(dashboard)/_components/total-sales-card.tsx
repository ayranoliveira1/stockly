import { CircleDollarSign } from "lucide-react";
import SummaryCard, {
   SummaryCardIcon,
   SummaryCardTitle,
   SummaryCardValue,
} from "./summary-card";
import { getTotalSales } from "@/app/_data-acess/dashboard/get-total-sales";

const TotalSalesCard = async () => {
   const totalSales = getTotalSales();

   return (
      <SummaryCard>
         <SummaryCardIcon>
            <CircleDollarSign />
         </SummaryCardIcon>
         <SummaryCardTitle>Vendas totais</SummaryCardTitle>
         <SummaryCardValue>{totalSales}</SummaryCardValue>
      </SummaryCard>
   );
};

export default TotalSalesCard;

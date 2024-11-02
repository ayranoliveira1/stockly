import { formatCurrency } from "@/app/_helpers/currency";
import { DollarSign } from "lucide-react";
import SummaryCard, {
   SummaryCardIcon,
   SummaryCardTitle,
   SummaryCardValue,
} from "./summary-card";
import { getTotalRevenue } from "@/app/_data-acess/dashboard/get-total-revenue";

const TotalRevenueCard = async () => {
   const totalRevenue = await getTotalRevenue();

   return (
      <SummaryCard>
         <SummaryCardIcon>
            <DollarSign />
         </SummaryCardIcon>
         <SummaryCardTitle>Receita total</SummaryCardTitle>
         <SummaryCardValue>{formatCurrency(totalRevenue)}</SummaryCardValue>
      </SummaryCard>
   );
};

export default TotalRevenueCard;

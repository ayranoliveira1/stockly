import { formatCurrency } from "@/app/_helpers/currency";
import SummaryCard, {
   SummaryCardIcon,
   SummaryCardTitle,
   SummaryCardValue,
} from "./summary-card";
import { DollarSign } from "lucide-react";
import { getTodayRevenue } from "@/app/_data-acess/dashboard/get-today-revenue";

const TodayRevenueCard = async () => {
   const todayRevenue = await getTodayRevenue();

   return (
      <SummaryCard>
         <SummaryCardIcon>
            <DollarSign />
         </SummaryCardIcon>
         <SummaryCardTitle>Receita hoje</SummaryCardTitle>
         <SummaryCardValue>{formatCurrency(todayRevenue)}</SummaryCardValue>
      </SummaryCard>
   );
};

export default TodayRevenueCard;
import {
   CircleDollarSign,
   DollarSign,
   PackageIcon,
   ShoppingBasketIcon,
} from "lucide-react";
import Header, {
   HeaderLeft,
   HeaderSubTitle,
   HeaderTitle,
} from "../_components/header";
import SummaryCard, {
   SummaryCardIcon,
   SummaryCardTitle,
   SummaryCardValue,
} from "./_components/summary-card";
import { getDashboard } from "../_data-acess/dashboard/get-dashboard";
import { formatCurrency } from "../_helpers/currency";

const Home = async () => {
   const { totalRevenue, todayRevenue, totalSales, totalStock, totalProducts } =
      await getDashboard();

   return (
      <div className="w-full space-y-8 p-8">
         <Header>
            <HeaderLeft>
               <HeaderSubTitle>Dashboard</HeaderSubTitle>
               <HeaderTitle>Visão Geral dos dados</HeaderTitle>
            </HeaderLeft>
         </Header>

         <div className="grid grid-cols-2 gap-6">
            <SummaryCard>
               <SummaryCardIcon>
                  <DollarSign />
               </SummaryCardIcon>
               <SummaryCardTitle>Receita total</SummaryCardTitle>
               <SummaryCardValue>
                  {formatCurrency(totalRevenue)}
               </SummaryCardValue>
            </SummaryCard>

            <SummaryCard>
               <SummaryCardIcon>
                  <DollarSign />
               </SummaryCardIcon>
               <SummaryCardTitle>Receita hoje</SummaryCardTitle>
               <SummaryCardValue>
                  {formatCurrency(todayRevenue)}
               </SummaryCardValue>
            </SummaryCard>
         </div>

         <div className="grid grid-cols-3 gap-6">
            <SummaryCard>
               <SummaryCardIcon>
                  <CircleDollarSign />
               </SummaryCardIcon>
               <SummaryCardTitle>Vendas totais</SummaryCardTitle>
               <SummaryCardValue>{totalSales}</SummaryCardValue>
            </SummaryCard>

            <SummaryCard>
               <SummaryCardIcon>
                  <PackageIcon />
               </SummaryCardIcon>
               <SummaryCardTitle>Total em estoque</SummaryCardTitle>
               <SummaryCardValue>{totalStock}</SummaryCardValue>
            </SummaryCard>

            <SummaryCard>
               <SummaryCardIcon>
                  <ShoppingBasketIcon />
               </SummaryCardIcon>
               <SummaryCardTitle>Produtos</SummaryCardTitle>
               <SummaryCardValue>{totalProducts}</SummaryCardValue>
            </SummaryCard>
         </div>
      </div>
   );
};

export default Home;

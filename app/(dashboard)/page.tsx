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
import RevenueChart from "./_components/revenue-chart";
import MostSoldProductItem from "./_components/most-sold-product-item";

const Home = async () => {
   const {
      totalRevenue,
      todayRevenue,
      totalSales,
      totalStock,
      totalProducts,
      totalLast14DaysRevenue,
      mostSoldProducts,
   } = await getDashboard();

   return (
      <div className="flex w-full flex-col space-y-8 p-8">
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

         <div className="grid min-h-0 grid-cols-[2.05fr,1fr] gap-6">
            <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
               <p className="mb-2 text-xl font-semibold text-slate-900">
                  Receita
               </p>
               <p className="text-sm text-slate-400">Últimos 14 dias</p>

               <RevenueChart data={totalLast14DaysRevenue} />
            </div>

            <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white">
               <p className="mb-2 px-6 py-3 text-xl font-semibold text-slate-900">
                  Produtos mais vendidos
               </p>

               <div className="mt-2 space-y-7 overflow-y-auto px-6 pb-6">
                  {mostSoldProducts.map((product) => (
                     <MostSoldProductItem
                        key={product.productId}
                        product={product}
                     />
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Home;

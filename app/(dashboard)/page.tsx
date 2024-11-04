import Header, {
   HeaderLeft,
   HeaderSubTitle,
   HeaderTitle,
} from "../_components/header";

import { getDashboard } from "../_data-acess/dashboard/get-dashboard";
import RevenueChart from "./_components/revenue-chart";
import TotalRevenueCard from "./_components/total-revenue-card";
import { Suspense } from "react";
import { Skeleton } from "../_components/ui/skeleton";
import TodayRevenueCard from "./_components/today-revenue-card";
import TotalSalesCard from "./_components/total-sales-card";
import TotalStockCard from "./_components/total-stock-card";
import TotalProductCard from "./_components/total-product-card";
import MostSoldProductsCard from "./_components/most-sold-products-card";

const Home = async () => {
   const { totalLast14DaysRevenue } = await getDashboard();

   return (
      <div className="flex w-full flex-col space-y-8 p-8">
         <Header>
            <HeaderLeft>
               <HeaderSubTitle>Dashboard</HeaderSubTitle>
               <HeaderTitle>Visão Geral dos dados</HeaderTitle>
            </HeaderLeft>
         </Header>

         <div className="grid grid-cols-2 gap-6">
            <Suspense
               fallback={<Skeleton className="bg-white bg-opacity-75" />}
            >
               <TotalRevenueCard />
            </Suspense>

            <Suspense
               fallback={<Skeleton className="bg-white bg-opacity-75" />}
            >
               <TodayRevenueCard />
            </Suspense>
         </div>

         <div className="grid grid-cols-3 gap-6">
            <Suspense
               fallback={<Skeleton className="bg-white bg-opacity-75" />}
            >
               <TotalSalesCard />
            </Suspense>

            <Suspense
               fallback={<Skeleton className="bg-white bg-opacity-75" />}
            >
               <TotalStockCard />
            </Suspense>

            <Suspense
               fallback={<Skeleton className="bg-white bg-opacity-75" />}
            >
               <TotalProductCard />
            </Suspense>
         </div>

         <div className="grid min-h-0 grid-cols-[2.05fr,1fr] gap-6">
            <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
               <p className="mb-2 text-xl font-semibold text-slate-900">
                  Receita
               </p>
               <p className="text-sm text-slate-400">Últimos 14 dias</p>

               <RevenueChart data={totalLast14DaysRevenue} />
            </div>

            <Suspense
               fallback={<Skeleton className="bg-white bg-opacity-75" />}
            >
               <MostSoldProductsCard />
            </Suspense>
         </div>
      </div>
   );
};

export default Home;

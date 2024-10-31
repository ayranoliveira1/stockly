"use client";

import {
   ChartConfig,
   ChartContainer,
   ChartTooltip,
   ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { DayTotalRevenue } from "@/app/_data-acess/dashboard/get-dashboard";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartconfig = {
   totalRevenue: {
      label: "Receita",
   },
} satisfies ChartConfig;

interface RevenueChartProps {
   data: DayTotalRevenue[];
}

const RevenueChart = ({ data }: RevenueChartProps) => {
   return (
      <ChartContainer config={chartconfig} className="min-h-0 w-full">
         <BarChart data={data} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
               dataKey="date"
               tickLine={false}
               tickMargin={10}
               axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="totalRevenue" fill="#00A180" radius={4} />
         </BarChart>
      </ChartContainer>
   );
};

export default RevenueChart;

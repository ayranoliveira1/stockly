import { ReactNode } from "react";

interface SummaryCardProps {
   children: ReactNode;
}

export const SummaryCardIcon = ({ children }: SummaryCardProps) => {
   return (
      <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-md bg-emerald-500 bg-opacity-10 text-emerald-500">
         {children}
      </div>
   );
};

export const SummaryCardTitle = ({ children }: SummaryCardProps) => {
   return <p className="text-sm font-medium text-slate-500">{children}</p>;
};

export const SummaryCardValue = ({ children }: SummaryCardProps) => {
   return <p className="text-2xl font-semibold text-slate-900">{children}</p>;
};

const SummaryCard = ({ children }: SummaryCardProps) => {
   return <div className="rounded-xl bg-white p-6">{children}</div>;
};

export default SummaryCard;

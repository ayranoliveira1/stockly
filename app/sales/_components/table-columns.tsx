"use client";

import { Button } from "@/app/_components/ui/button";
import { SaleDto } from "@/app/_data-acess/sale/get-sale";
import { formatCurrency } from "@/app/_helpers/currency";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";

export const saleTableColumns: ColumnDef<SaleDto>[] = [
   {
      accessorKey: "productsNames",
      header: "Produtos",
   },
   {
      accessorKey: "totalProducts",
      header: "Quantidade de produtos",
   },
   {
      accessorKey: "totalAmount",
      header: "Valor total",
      cell: ({
         row: {
            original: { totalAmount },
         },
      }) => formatCurrency(totalAmount),
   },
   {
      accessorKey: "date",
      header: "Data",
      cell: ({
         row: {
            original: { date },
         },
      }) => new Date(date).toLocaleDateString("pt-BR"),
   },
   {
      header: "Ações",
      cell: (row) => (
         <Button>
            <MoreHorizontalIcon size={16} />
         </Button>
      ),
   },
];

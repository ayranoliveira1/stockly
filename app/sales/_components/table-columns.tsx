"use client";

import { Button } from "@/app/_components/ui/button";
import { SaleDto } from "@/app/_data-acess/sale/get-sale";
import { formatCurrency } from "@/app/_helpers/currency";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";
import SalesPageDropdownMenu from "./table-dropdown-menu";

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
      cell: ({ row: { original: sale } }) => (
         <SalesPageDropdownMenu sale={sale} />
      ),
   },
];

"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon } from "lucide-react";

const getStatusLabel = (status: string) => {
   if (status === "IN_STOCK") {
      return "Em estoque";
   }

   return "Fora de estoque";
};

export const productTableColumns: ColumnDef<Product>[] = [
   {
      accessorKey: "name",
      header: "Produto",
   },
   {
      accessorKey: "price",
      header: "Valor Unitário",
   },
   {
      accessorKey: "stock",
      header: "Estoque",
   },
   {
      accessorKey: "status",
      header: "Status",
      cell: (row) => {
         const product = row.row.original;
         const label = getStatusLabel(product.status);

         return (
            <Badge
               variant={label === "Em estoque" ? "default" : "destructive"}
               className="gap-2"
            >
               <CircleIcon size={12} className="fill-white" />
               {label}
            </Badge>
         );
      },
   },
];

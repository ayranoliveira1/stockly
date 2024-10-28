"use client";

import { Badge } from "@/app/_components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon } from "lucide-react";
import ProductTableDropdownMenu from "./table-dropdown-menu";
import { ProductDto } from "@/app/_data-acess/product/get-product";

const getStatusLabel = (status: string) => {
   if (status === "IN STOCK") {
      return "Em estoque";
   }

   return "Fora de estoque";
};

export const productTableColumns: ColumnDef<ProductDto>[] = [
   {
      accessorKey: "name",
      header: "Produto",
   },
   {
      accessorKey: "price",
      header: "Valor Unitário",
      cell: (row) => {
         const product = row.row.original;

         return Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
         }).format(Number(product.price));
      },
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
   {
      accessorKey: "actions",
      header: "Ações",
      cell: (row) => <ProductTableDropdownMenu product={row.row.original} />,
   },
];

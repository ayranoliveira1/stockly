"use client";

import { Badge } from "@/app/_components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon } from "lucide-react";
import ProductTableDropdownMenu from "./table-dropdown-menu";
import { ProductDto } from "@/app/_data-acess/product/get-product";
import ProductStatusBadge from "@/app/_components/product-status-badge";

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
      cell: ({ row: { original: product } }) => {
         return <ProductStatusBadge status={product.status} />;
      },
   },
   {
      accessorKey: "actions",
      header: "Ações",
      cell: (row) => <ProductTableDropdownMenu product={row.row.original} />,
   },
];

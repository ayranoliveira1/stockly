"use client";

import {
   AlertDialog,
   AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
   CircleIcon,
   ClipboardCopyIcon,
   EditIcon,
   MoreHorizontalIcon,
   TrashIcon,
} from "lucide-react";
import DeleteDialogContent from "./delete-dialog";
import { Dialog } from "@/app/_components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import UpsertProductDialogContent from "./upsert-dialog-content";
import { useState } from "react";
import ProductTableDropdownMenu from "./table-dropdown-menu";

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

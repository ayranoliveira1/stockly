"use client";

import { SaleDto } from "@/app/_data-acess/sale/get-sale";
import { formatCurrency } from "@/app/_helpers/currency";
import { ColumnDef } from "@tanstack/react-table";
import SalesPageDropdownMenu from "./table-dropdown-menu";
import { ProductDto } from "@/app/_data-acess/product/get-product";
import { ComboboxOption } from "@/app/_components/ui/combobox";

interface SaleTableColumns extends SaleDto {
   products: ProductDto[];
   productsOptions: ComboboxOption[];
}

export const saleTableColumns: ColumnDef<SaleTableColumns>[] = [
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
         <SalesPageDropdownMenu
            sale={sale}
            products={sale.products}
            productsOptions={sale.productsOptions}
         />
      ),
   },
];

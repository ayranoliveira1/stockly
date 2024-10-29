import "server-only";

import { db } from "@/app/_lib/prisma";

interface SaleProductDto {
   productId: string;
   quantity: number;
   unitPrice: number;
   productName: string;
}

export interface SaleDto {
   id: string;
   productsNames: string;
   totalProducts: number;
   totalAmount: number;
   date: Date;
   saleProduct: SaleProductDto[];
}

export const getSales = async (): Promise<SaleDto[]> => {
   const sales = await db.sale.findMany({
      include: {
         salesProducts: {
            include: {
               product: true,
            },
         },
      },
   });

   return sales.map((sale) => ({
      id: sale.id,
      date: sale.date,
      productsNames: sale.salesProducts
         .map((product) => product.product.name)
         .join(" • "),
      totalProducts: sale.salesProducts.reduce(
         (acc, product) => acc + product.quantity,
         0,
      ),
      totalAmount: sale.salesProducts.reduce(
         (acc, product) => acc + Number(product.unitPrice),
         0,
      ),
      saleProduct: sale.salesProducts.map(
         (saleProduct): SaleProductDto => ({
            productId: saleProduct.productId,
            productName: saleProduct.product.name,
            quantity: saleProduct.quantity,
            unitPrice: Number(saleProduct.unitPrice),
         }),
      ),
   }));
};

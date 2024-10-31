"use server";

import { db } from "@/app/_lib/prisma";
import { deleteSaleSchema, DeleteSaleType } from "./schema";
import { revalidatePath } from "next/cache";

export const deleteSale = async ({ id }: DeleteSaleType) => {
   deleteSaleSchema.parse({ id });

   await db.$transaction(async (trx) => {
      const sale = await trx.sale.findUnique({
         where: {
            id,
         },
         include: {
            salesProducts: true,
         },
      });

      if (!sale) return;

      await trx.sale.delete({
         where: {
            id,
         },
      });

      for (const product of sale.salesProducts) {
         await trx.product.update({
            where: {
               id: product.productId,
            },
            data: {
               stock: {
                  increment: product.quantity,
               },
            },
         });
      }
   });

   revalidatePath("/sales");
   revalidatePath("/products");
   revalidatePath("/");
};

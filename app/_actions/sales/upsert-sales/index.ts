"use server";

import { db } from "@/app/_lib/prisma";
import { upsertSaleSchema, UpsertSaleSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const upsertSale = async (data: UpsertSaleSchema) => {
   upsertSaleSchema.parse(data);

   const isUpdate = Boolean(data.id);

   await db.$transaction(async (trx) => {
      if (isUpdate) {
         const isExistingsale = await trx.sale.findUnique({
            where: {
               id: data.id,
            },
            include: {
               salesProducts: true,
            },
         });

         if (!isExistingsale) return;

         await trx.sale.delete({
            where: {
               id: data.id,
            },
         });

         for (const product of isExistingsale.salesProducts) {
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
      }

      const sale = await trx.sale.create({
         data: {
            date: new Date(),
         },
      });

      for (const product of data.products) {
         const productFromDb = await trx.product.findUnique({
            where: {
               id: product.id,
            },
         });

         if (!productFromDb) {
            throw new Error("Product not found");
         }

         const productIsOutOfStock = product.quantity > productFromDb.stock;

         if (productIsOutOfStock) {
            throw new Error("Product out of stock");
         }

         await trx.saleProduct.create({
            data: {
               saleId: sale.id,
               productId: product.id,
               quantity: product.quantity,
               unitPrice: productFromDb.price,
            },
         });

         await trx.product.update({
            where: {
               id: product.id,
            },
            data: {
               stock: {
                  decrement: product.quantity,
               },
            },
         });
      }
   });

   revalidatePath("/products");
   revalidatePath("/sales");
};

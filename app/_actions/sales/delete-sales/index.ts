"use server";

import { db } from "@/app/_lib/prisma";
import { deleteSaleSchema, DeleteSaleType } from "./schema";
import { revalidatePath } from "next/cache";

export const deleteSale = async ({ id }: DeleteSaleType) => {
   deleteSaleSchema.parse({ id });

   await db.sale.delete({
      where: {
         id,
      },
   });

   revalidatePath("/sales");
};

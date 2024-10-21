"use server";

import { db } from "@/app/_lib/prisma";
import { deleteProductSchema, DeleteProductType } from "./shema";
import { revalidatePath } from "next/cache";

export const deleteProduct = async ({ id }: DeleteProductType) => {
   deleteProductSchema.parse({ id });

   await db.product.delete({
      where: {
         id,
      },
   });

   revalidatePath("/products");
};

"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { upsertProductSchema, UpsertProductSchemaType } from "./schema";

export const upsertProduct = async (data: UpsertProductSchemaType) => {
   upsertProductSchema.parse(data);

   await db.product.upsert({
      where: { id: data?.id ?? "" },
      update: data,
      create: data,
   });

   revalidatePath("/products");
   revalidatePath("/");
};

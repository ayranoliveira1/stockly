import { db } from "@/app/_lib/prisma";

export const getTotalProduct = async (): Promise<number> => {
   return db.product.count();
};

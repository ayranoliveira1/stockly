import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

export async function GET() {
   const products = await db.product.findMany({});
   return Response.json(products, { status: 200 });
}

export async function POST(request: Request) {
   const { name, price, stock } = await request.json();

   await db.product.create({
      data: {
         name,
         price,
         stock,
      },
   });

   revalidatePath("/products");

   return Response.json({ message: "Product created" }, { status: 201 });
}

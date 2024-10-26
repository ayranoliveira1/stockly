"use client";

import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { PlusIcon } from "lucide-react";
import SalesUpsertSheetContent from "./upsert-sheet-content";
import { Product } from "@prisma/client";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { useState } from "react";

interface CreateSaleButtunProps {
   products: Product[];
   productsOptions: ComboboxOption[];
}

const CreateSaleButtun = ({
   products,
   productsOptions,
}: CreateSaleButtunProps) => {
   const [sheetIsOpen, setSheetIsOpen] = useState(false);

   return (
      <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
         <SheetTrigger asChild>
            <Button className="gap-2">
               <PlusIcon size={20} />
               Nova venda
            </Button>
         </SheetTrigger>

         <SalesUpsertSheetContent
            setSheetIsOpen={() => setSheetIsOpen(false)}
            products={products}
            productsOptions={productsOptions}
         />
      </Sheet>
   );
};

export default CreateSaleButtun;

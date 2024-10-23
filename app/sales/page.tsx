import { Button } from "../_components/ui/button";
import { ComboboxOption } from "../_components/ui/combobox";
import { Sheet, SheetTrigger } from "../_components/ui/sheet";
import { getProducts } from "../_data-acess/product/get-product";
import SalesUpsertSheetContent from "./_components/upsert-sheet-content";

const SalesPage = async () => {
   const products = await getProducts();

   const productsOptions: ComboboxOption[] = products.map((product) => ({
      label: product.name,
      value: product.id,
   }));
   return (
      <div className="w-full space-y-8 p-8">
         <div className="flex w-full items-center justify-between">
            <div className="space-y-1">
               <span className="text-xs font-semibold text-slate-500">
                  Produtos
               </span>
               <h2 className="text-xl font-semibold">Gestão de produtos</h2>
            </div>

            <Sheet>
               <SheetTrigger asChild>
                  <Button>Nova venda</Button>
               </SheetTrigger>

               <SalesUpsertSheetContent productsOptions={productsOptions} />
            </Sheet>
         </div>

         {/* <DataTable
            columns={productTableColumns}
            data={JSON.parse(JSON.stringify(products))}
         /> */}
      </div>
   );
};

export default SalesPage;

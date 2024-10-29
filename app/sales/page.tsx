import { ComboboxOption } from "../_components/ui/combobox";
import { DataTable } from "../_components/ui/data-table";
import { getProducts } from "../_data-acess/product/get-product";
import { getSales } from "../_data-acess/sale/get-sale";
import CreateSaleButtun from "./_components/create-sale-button";
import { saleTableColumns } from "./_components/table-columns";

const SalesPage = async () => {
   const sales = await getSales();
   const products = await getProducts();

   const productsOptions: ComboboxOption[] = products.map((product) => ({
      label: product.name,
      value: product.id,
   }));

   const tableData = sales.map((sale) => ({
      ...sale,
      products,
      productsOptions,
   }));

   return (
      <div className="w-full space-y-8 p-8">
         <div className="flex w-full items-center justify-between">
            <div className="space-y-1">
               <span className="text-xs font-semibold text-slate-500">
                  Vendas
               </span>
               <h2 className="text-xl font-semibold">Gestão de vendas</h2>
            </div>

            <CreateSaleButtun
               products={JSON.parse(JSON.stringify(products))}
               productsOptions={productsOptions}
            />
         </div>

         <DataTable
            columns={saleTableColumns}
            data={JSON.parse(JSON.stringify(tableData))}
         />
      </div>
   );
};

export default SalesPage;

import Header, {
   HeaderLeft,
   HeaderRight,
   HeaderSubTitle,
   HeaderTitle,
} from "../_components/header";
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
      <div className="w-full space-y-8 overflow-y-auto p-8">
         <Header>
            <HeaderLeft>
               <HeaderSubTitle>Vendas</HeaderSubTitle>
               <HeaderTitle>Gestão de vendas</HeaderTitle>
            </HeaderLeft>

            <HeaderRight>
               <CreateSaleButtun
                  products={JSON.parse(JSON.stringify(products))}
                  productsOptions={productsOptions}
               />
            </HeaderRight>
         </Header>

         <DataTable
            columns={saleTableColumns}
            data={JSON.parse(JSON.stringify(tableData))}
         />
      </div>
   );
};

export default SalesPage;

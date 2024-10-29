import { DataTable } from "../_components/ui/data-table";
import { productTableColumns } from "./_components/table-columns";
import { getProducts } from "../_data-acess/product/get-product";
import CreateProductButton from "./_components/create-product-button";
import Header, {
   HeaderLeft,
   HeaderRight,
   HeaderSubTitle,
   HeaderTitle,
} from "../_components/header";

const ProductsPage = async () => {
   const products = await getProducts();

   return (
      <div className="w-full space-y-8 p-8">
         <Header>
            <HeaderLeft>
               <HeaderSubTitle>Produtos</HeaderSubTitle>
               <HeaderTitle>Gestão de produtos</HeaderTitle>
            </HeaderLeft>

            <HeaderRight>
               <CreateProductButton />
            </HeaderRight>
         </Header>

         <DataTable
            columns={productTableColumns}
            data={JSON.parse(JSON.stringify(products))}
         />
      </div>
   );
};

export default ProductsPage;

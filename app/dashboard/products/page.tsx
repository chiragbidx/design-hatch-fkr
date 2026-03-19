import { getProducts, Product as ProductType } from "./actions";
import ProductsClient from "./client";

export default async function ProductsPage() {
  const products: ProductType[] = await getProducts();
  return <ProductsClient products={products} />;
}
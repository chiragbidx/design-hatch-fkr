import { getProducts } from "./actions";
import ProductsClient from "./client";

export default async function ProductsPage() {
  const products = await getProducts();
  return <ProductsClient products={products} />;
}
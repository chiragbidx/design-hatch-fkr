export default function ProductsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Products</h1>
        <p className="text-muted-foreground">
          No products yet. Add your first product to start selling.
        </p>
        <div className="mt-6">
          <a
            href="/dashboard/products"
            className="inline-block rounded-md bg-primary px-5 py-2 text-white font-semibold shadow hover:bg-primary/90 transition"
          >
            Add Product
          </a>
        </div>
      </div>
    </div>
  );
}
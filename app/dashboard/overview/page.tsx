export default function OverviewPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Store Overview</h1>
        <p className="text-muted-foreground">
          Your store is ready! Start adding products to begin selling.
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
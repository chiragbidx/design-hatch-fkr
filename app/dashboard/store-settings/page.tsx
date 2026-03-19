export default function StoreSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Store Settings</h1>
        <p className="text-muted-foreground">
          Customize your store name, branding, and domain here.
        </p>
        <div className="mt-6">
          <a
            href="#"
            className="inline-block rounded-md bg-primary px-5 py-2 text-white font-semibold shadow hover:bg-primary/90 transition"
          >
            Edit Store Details
          </a>
        </div>
      </div>
    </div>
  );
}
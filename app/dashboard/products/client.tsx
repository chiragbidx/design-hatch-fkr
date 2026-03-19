"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { FormField, Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addProduct } from "./actions";

// Expected product type (align with schema)
type Product = {
  id: string;
  name: string;
  description?: string;
  price: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function ProductsClient({ products }: { products: Product[] }) {
  // For loading and optimistic UI
  const [isOpen, setIsOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [newProducts, setNewProducts] = useState<Product[]>(products);

  const handleAdd = async (formData: FormData) => {
    setFormError(null);
    startTransition(async () => {
      const res = await addProduct(formData);
      if (res?.status === "success" && res.product) {
        setNewProducts((p) => [res.product, ...p]);
        setIsOpen(false);
      } else {
        setFormError(res?.message || "Failed to add product");
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">
            {newProducts.length === 0
              ? "No products yet. Add your first product to start selling."
              : "Add, view, and manage products for your store."}
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary px-5 py-2 font-semibold shadow" onClick={() => setIsOpen(true)}>
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Product</DialogTitle>
              <DialogDescription>
                Enter your product details below.
              </DialogDescription>
            </DialogHeader>
            <form
              action={handleAdd}
              className="space-y-4 pt-2"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                handleAdd(fd);
              }}
            >
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input name="name" required placeholder="Product name" />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input name="description" placeholder="Product details (optional)" />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel>Price ($)</FormLabel>
                <FormControl>
                  <Input name="price" required type="number" min={0} step={0.01} placeholder="0.00" />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input name="imageUrl" placeholder="https://..." />
                </FormControl>
              </FormItem>
              {formError && <div className="text-destructive font-medium text-sm">{formError}</div>}
              <DialogFooter className="pt-2">
                <Button type="submit" disabled={pending}>
                  {pending ? "Adding..." : "Add Product"}
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant="ghost" className="ml-2">
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {newProducts.length === 0 ? null : (
        <div className="overflow-x-auto border rounded-lg bg-card shadow">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Description</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Image</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {newProducts.map((prod) => (
                <tr key={prod.id}>
                  <td className="px-4 py-2 font-medium">{prod.name}</td>
                  <td className="px-4 py-2">{prod.description}</td>
                  <td className="px-4 py-2">${Number(prod.price).toFixed(2)}</td>
                  <td className="px-4 py-2">
                    {prod.imageUrl ? (
                      <img
                        src={prod.imageUrl}
                        alt={prod.name}
                        className="h-10 w-10 object-cover rounded border"
                        onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/40x40?text=No+Image"; }}
                      />
                    ) : (
                      <span className="italic text-muted-foreground">No image</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
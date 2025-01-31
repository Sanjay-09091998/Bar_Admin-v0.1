import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import ProductList from "@/components/dashboard/ProductList";
import AddProductDialog from "@/components/dashboard/AddProductDialog";
import { useProducts } from "@/hooks/useProducts";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const ProductsPage = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const { products, isLoading, createProduct, toggleProductStock } =
    useProducts();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex">
        <Sidebar />
        <main className="flex-1 p-6 flex items-center justify-center">
          <LoadingSpinner />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Products</h1>
        </div>

        <ProductList
          products={products}
          onAddProduct={() => setShowAddProduct(true)}
          onToggleStock={({ id, inStock }) =>
            toggleProductStock.mutate({ id, inStock })
          }
        />

        <AddProductDialog
          open={showAddProduct}
          onOpenChange={setShowAddProduct}
          onSubmit={(data) => {
            createProduct.mutate({
              name: data.name,
              type: data.type,
              description: data.description,
              bottle_price: data.bottlePrice,
              bottle_size: parseInt(data.bottleSize),
              age: data.age ? parseInt(data.age) : undefined,
              serving_sizes: [
                {
                  size: 45,
                  price: parseFloat(data.servingSizes.small.price),
                  size_type: "small",
                },
                {
                  size: 60,
                  price: parseFloat(data.servingSizes.medium.price),
                  size_type: "medium",
                },
                {
                  size: 90,
                  price: parseFloat(data.servingSizes.large.price),
                  size_type: "large",
                },
              ],
            });
            setShowAddProduct(false);
          }}
        />
      </main>
    </div>
  );
};

export default ProductsPage;

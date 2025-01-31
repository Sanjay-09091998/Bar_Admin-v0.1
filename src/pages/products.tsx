import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import ProductList from "@/components/dashboard/ProductList";
import AddProductDialog from "@/components/dashboard/AddProductDialog";
import { useToast } from "@/components/ui/use-toast";

const ProductsPage = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const { toast } = useToast();

  const handleAddProduct = (newProduct) => {
    toast({
      title: "Product Created",
      description: `${newProduct.name} has been successfully created.`,
    });
    // In a real app, you would add this to your products list
    console.log("New product created:", newProduct);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Products</h1>
        </div>

        <ProductList onAddProduct={() => setShowAddProduct(true)} />

        <AddProductDialog
          open={showAddProduct}
          onOpenChange={setShowAddProduct}
          onSubmit={handleAddProduct}
        />
      </main>
    </div>
  );
};

export default ProductsPage;

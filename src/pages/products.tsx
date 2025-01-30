import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import ProductList from "@/components/dashboard/ProductList";

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Products</h1>
        </div>

        <ProductList />
      </main>
    </div>
  );
};

export default ProductsPage;

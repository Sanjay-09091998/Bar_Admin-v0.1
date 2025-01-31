import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import ProductList from "@/components/dashboard/ProductList";
import AddProductDialog from "@/components/dashboard/AddProductDialog";
import { useProducts } from "@/hooks/useProducts";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const ProductsPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const {
    products = [],
    isLoading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    toggleProductStock,
  } = useProducts();

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex">
        <Sidebar />
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-red-600">
              Error loading products
            </h2>
            <p className="text-sm text-muted-foreground">{error.message}</p>
          </div>
        </main>
      </div>
    );
  }

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

  const handleCreateProduct = async (data: any) => {
    try {
      await createProduct.mutateAsync({
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
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  const handleToggleStock = async ({
    id,
    inStock,
  }: {
    id: string;
    inStock: boolean;
  }) => {
    try {
      await toggleProductStock.mutateAsync({ id, inStock });
    } catch (error) {
      console.error("Failed to toggle stock:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Products</h1>
        </div>

        <ProductList
          products={products}
          onAddProduct={() => {
            setSelectedProduct(null);
            setIsEditMode(false);
            setShowAddProduct(true);
          }}
          onToggleStock={handleToggleStock}
          onProductClick={(product) => {
            setSelectedProduct(product);
            setIsEditMode(true);
            setShowAddProduct(true);
          }}
        />

        <AddProductDialog
          open={showAddProduct}
          onOpenChange={setShowAddProduct}
          onDelete={async (id) => {
            try {
              await deleteProduct.mutateAsync(id);
              setShowAddProduct(false);
              setSelectedProduct(null);
              setIsEditMode(false);
            } catch (error) {
              console.error("Failed to delete product:", error);
            }
          }}
          onSubmit={async (data) => {
            if (isEditMode && selectedProduct) {
              try {
                await updateProduct.mutateAsync({
                  id: selectedProduct.id,
                  updates: {
                    name: data.name,
                    type: data.type,
                    description: data.description,
                    bottle_price: data.bottlePrice,
                    bottle_size: parseInt(data.bottleSize),
                    age: data.age ? parseInt(data.age) : null,
                  },
                });
                setShowAddProduct(false);
                setSelectedProduct(null);
                setIsEditMode(false);
              } catch (error) {
                console.error("Failed to update product:", error);
              }
            } else {
              await handleCreateProduct(data);
            }
          }}
          initialData={
            selectedProduct
              ? {
                  name: selectedProduct.name,
                  type: selectedProduct.type,
                  description: selectedProduct.description,
                  bottlePrice: selectedProduct.bottle_price.toString(),
                  bottleSize: selectedProduct.bottle_size.toString(),
                  age: selectedProduct.age?.toString() || "",
                  servingSizes: {
                    small: {
                      size: 45,
                      price:
                        selectedProduct.serving_sizes
                          .find((s) => s.size_type === "small")
                          ?.price.toString() || "",
                    },
                    medium: {
                      size: 60,
                      price:
                        selectedProduct.serving_sizes
                          .find((s) => s.size_type === "medium")
                          ?.price.toString() || "",
                    },
                    large: {
                      size: 90,
                      price:
                        selectedProduct.serving_sizes
                          .find((s) => s.size_type === "large")
                          ?.price.toString() || "",
                    },
                  },
                }
              : undefined
          }
        />
      </main>
    </div>
  );
};

export default ProductsPage;

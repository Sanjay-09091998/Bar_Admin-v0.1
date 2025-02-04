import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, MoreHorizontal } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useProducts } from "@/hooks/useProducts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import AddProductDialog from "@/components/dashboard/AddProductDialog";
import ProductFilters from "@/components/dashboard/ProductFilters";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ProductsPage = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  // Pagination and filter state
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    inStock: undefined,
  });
  const [sort, setSort] = useState({ field: "name", order: "asc" });

  const {
    products,
    total,
    pageCount,
    isLoading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts({
    page,
    perPage,
    filters: {
      search: filters.search || undefined,
      type: filters.type === "all" ? undefined : filters.type,
      inStock: filters.inStock,
    },
    sortBy: sort.field,
    sortOrder: sort.order,
  });

  if (error) {
    return (
      <div className="min-h-screen bg-background flex">
        <Sidebar />
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-destructive">
              Error loading products
            </h2>
            <p className="text-sm text-muted-foreground">{error.message}</p>
          </div>
        </main>
      </div>
    );
  }

  const handleSearch = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
    setPage(1);
  };

  const handleTypeFilter = (value: string) => {
    setFilters((prev) => ({ ...prev, type: value }));
    setPage(1);
  };

  const handleStockFilter = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      inStock: value === "all" ? undefined : value === "in_stock",
    }));
    setPage(1);
  };

  const handleSort = (value: string) => {
    const [field, order] = value.split("-");
    setSort({ field, order });
  };

  const handleAddProduct = async (data) => {
    try {
      await createProduct.mutateAsync(data);
      setShowAddProduct(false);
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  const handleEditProduct = async (data) => {
    try {
      await updateProduct.mutateAsync({
        id: editingProduct.id,
        updates: data,
      });
      setEditingProduct(null);
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct.mutateAsync(deletingProduct.id);
      setDeletingProduct(null);
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleToggleStatus = async (product) => {
    try {
      await updateProduct.mutateAsync({
        id: product.id,
        updates: { in_stock: !product.in_stock },
      });
    } catch (error) {
      console.error("Failed to update product status:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex">
        <Sidebar />
        <main className="flex-1 p-6 flex items-center justify-center">
          <LoadingSpinner />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Products</h1>
          <Button onClick={() => setShowAddProduct(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>

        <ProductFilters
          onSearch={handleSearch}
          onTypeFilter={handleTypeFilter}
          onStockFilter={handleStockFilter}
          onSort={handleSort}
        />

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.type}</TableCell>
                  <TableCell>${product.bottle_price}</TableCell>
                  <TableCell>{product.bottle_size}ml</TableCell>
                  <TableCell>{product.age || "-"}</TableCell>
                  <TableCell>
                    <Badge
                      variant={product.in_stock ? "default" : "secondary"}
                      className="cursor-pointer"
                      onClick={() => handleToggleStatus(product)}
                    >
                      {product.in_stock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setEditingProduct(product)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setDeletingProduct(product)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="border-t p-4">
            <DataTablePagination
              pageCount={pageCount}
              currentPage={page}
              perPage={perPage}
              total={total}
              onPageChange={setPage}
              onPerPageChange={setPerPage}
            />
          </div>
        </div>

        <AddProductDialog
          open={showAddProduct || !!editingProduct}
          onOpenChange={(open) => {
            if (!open) {
              setShowAddProduct(false);
              setEditingProduct(null);
            }
          }}
          onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
          initialData={editingProduct}
        />

        <AlertDialog open={!!deletingProduct} onOpenChange={setDeletingProduct}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the product "
                {deletingProduct?.name}". This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDeletingProduct(null)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteProduct}
                className="bg-destructive text-destructive-foreground"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
};

export default ProductsPage;

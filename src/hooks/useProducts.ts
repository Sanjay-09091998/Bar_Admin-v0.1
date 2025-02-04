import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  productsApi,
  type Product,
  type ProductFilters,
} from "@/lib/api/products";
import { toast } from "@/components/ui/use-toast";

export function useProducts({
  page = 1,
  perPage = 10,
  filters,
  sortBy = "name",
  sortOrder = "asc",
}: {
  page?: number;
  perPage?: number;
  filters?: ProductFilters;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
} = {}) {
  const queryClient = useQueryClient();

  const {
    data = { data: [], total: 0 },
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", { page, perPage, filters, sortBy, sortOrder }],
    queryFn: () =>
      productsApi.getAll({ page, perPage, filters, sortBy, sortOrder }),
  });

  const createProduct = useMutation({
    mutationFn: productsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Product created",
        description: "The product has been created successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateProduct = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Product> }) =>
      productsApi.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Product updated",
        description: "The product has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteProduct = useMutation({
    mutationFn: productsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Product deleted",
        description: "The product has been deleted successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    products: data.data,
    total: data.total,
    pageCount: Math.ceil(data.total / perPage),
    isLoading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}

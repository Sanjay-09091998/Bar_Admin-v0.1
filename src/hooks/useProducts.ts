import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productsApi, type ProductWithServingSizes } from "@/lib/api/products";
import { toast } from "@/components/ui/use-toast";

export function useProducts() {
  const queryClient = useQueryClient();

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery<ProductWithServingSizes[]>({
    queryKey: ["products"],
    queryFn: () => productsApi.getAll(),
  });

  const createProduct = useMutation({
    mutationFn: productsApi.create,
    onMutate: async (newProduct) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["products"] });

      // Snapshot the previous value
      const previousProducts = queryClient.getQueryData(["products"]);

      // Return a context object with the snapshotted value
      return { previousProducts };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["products"],
        (old: ProductWithServingSizes[] = []) => {
          return [...old, data];
        },
      );
      toast({
        title: "Product created",
        description: "The product has been created successfully.",
      });
    },
    onError: (error, _, context) => {
      // Rollback to the previous value if there was an error
      if (context?.previousProducts) {
        queryClient.setQueryData(["products"], context.previousProducts);
      }
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
    onSettled: () => {
      // Always refetch after error or success to ensure we have the latest data
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const updateProduct = useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: Parameters<typeof productsApi.update>[1];
    }) => productsApi.update(id, updates),
    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });
      const previousProducts = queryClient.getQueryData(["products"]);
      queryClient.setQueryData(
        ["products"],
        (old: ProductWithServingSizes[] = []) => {
          return old.map((product) =>
            product.id === id ? { ...product, ...updates } : product,
          );
        },
      );
      return { previousProducts };
    },
    onSuccess: () => {
      toast({
        title: "Product updated",
        description: "The product has been updated successfully.",
      });
    },
    onError: (error, _, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(["products"], context.previousProducts);
      }
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const deleteProduct = useMutation({
    mutationFn: productsApi.delete,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });
      const previousProducts = queryClient.getQueryData(["products"]);
      queryClient.setQueryData(
        ["products"],
        (old: ProductWithServingSizes[] = []) => {
          return old.filter((product) => product.id !== id);
        },
      );
      return { previousProducts };
    },
    onSuccess: () => {
      toast({
        title: "Product deleted",
        description: "The product has been deleted successfully.",
      });
    },
    onError: (error, _, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(["products"], context.previousProducts);
      }
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const toggleProductStock = useMutation({
    mutationFn: ({ id, inStock }: { id: string; inStock: boolean }) =>
      productsApi.toggleStock(id, inStock),
    onMutate: async ({ id, inStock }) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });
      const previousProducts = queryClient.getQueryData(["products"]);
      queryClient.setQueryData(
        ["products"],
        (old: ProductWithServingSizes[] = []) => {
          return old.map((product) =>
            product.id === id ? { ...product, in_stock: inStock } : product,
          );
        },
      );
      return { previousProducts };
    },
    onError: (error, _, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(["products"], context.previousProducts);
      }
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return {
    products,
    isLoading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    toggleProductStock,
  };
}

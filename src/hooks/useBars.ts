import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  barsApi,
  type Bar,
  type BarFilters,
  type BarWithProducts,
} from "@/lib/api/bars";
import { toast } from "@/components/ui/use-toast";

export function useBars({
  page = 1,
  perPage = 10,
  filters,
  sortBy = "name",
  sortOrder = "asc",
}: {
  page?: number;
  perPage?: number;
  filters?: BarFilters;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
} = {}) {
  const queryClient = useQueryClient();

  const {
    data = { data: [], total: 0 },
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bars", { page, perPage, filters, sortBy, sortOrder }],
    queryFn: () =>
      barsApi.getAll({ page, perPage, filters, sortBy, sortOrder }),
  });

  const createBar = useMutation({
    mutationFn: barsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bars"] });
      toast({
        title: "Bar created",
        description: "The bar has been created successfully.",
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

  const updateBar = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Bar> }) =>
      barsApi.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bars"] });
      toast({
        title: "Bar updated",
        description: "The bar has been updated successfully.",
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

  const deleteBar = useMutation({
    mutationFn: barsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bars"] });
      toast({
        title: "Bar deleted",
        description: "The bar has been deleted successfully.",
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

  const updateBarProducts = useMutation({
    mutationFn: ({
      barId,
      productIds,
    }: {
      barId: string;
      productIds: string[];
    }) => barsApi.updateProducts(barId, productIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bars"] });
      toast({
        title: "Bar products updated",
        description: "The bar products have been updated successfully.",
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
    bars: data.data,
    total: data.total,
    pageCount: Math.ceil(data.total / perPage),
    isLoading,
    error,
    createBar,
    updateBar,
    deleteBar,
    updateBarProducts,
  };
}

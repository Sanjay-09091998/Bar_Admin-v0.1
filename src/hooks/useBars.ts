import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { barsApi, type BarWithProducts } from "@/lib/api/bars";
import { toast } from "@/components/ui/use-toast";

export function useBars() {
  const queryClient = useQueryClient();

  const {
    data: bars = [],
    isLoading,
    error,
  } = useQuery<BarWithProducts[]>({
    queryKey: ["bars"],
    queryFn: () => barsApi.getAll(),
  });

  const createBar = useMutation({
    mutationFn: barsApi.create,
    onMutate: async (newBar) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["bars"] });

      // Snapshot the previous value
      const previousBars = queryClient.getQueryData(["bars"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["bars"], (old: BarWithProducts[] = []) => [
        ...old,
        { ...newBar, id: "temp-id-" + Date.now() } as BarWithProducts,
      ]);

      // Return a context object with the snapshotted value
      return { previousBars };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["bars"], (old: BarWithProducts[] = []) => {
        // Remove temp bar and add the real one
        const filtered = old.filter((bar) => !bar.id.startsWith("temp-id-"));
        return [...filtered, data];
      });
      toast({
        title: "Bar created",
        description: "The bar has been created successfully.",
      });
    },
    onError: (error, variables, context) => {
      // Rollback to the previous value if there was an error
      if (context?.previousBars) {
        queryClient.setQueryData(["bars"], context.previousBars);
      }
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
    onSettled: () => {
      // Always refetch after error or success to ensure we have the latest data
      queryClient.invalidateQueries({ queryKey: ["bars"] });
    },
  });

  const updateBar = useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: Parameters<typeof barsApi.update>[1];
    }) => barsApi.update(id, updates),
    onSuccess: (data) => {
      queryClient.setQueryData(["bars"], (old: BarWithProducts[] = []) =>
        old.map((bar) => (bar.id === data.id ? { ...bar, ...data } : bar)),
      );
      toast({
        title: "Bar updated",
        description: "The bar has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteBar = useMutation({
    mutationFn: barsApi.delete,
    onSuccess: (_, id) => {
      queryClient.setQueryData(["bars"], (old: BarWithProducts[] = []) =>
        old.filter((bar) => bar.id !== id),
      );
      toast({
        title: "Bar deleted",
        description: "The bar has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    bars,
    isLoading,
    error,
    createBar,
    updateBar,
    deleteBar,
  };
}

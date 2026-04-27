import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDocument } from "@/utils/CRUD/CRUD.client";
import { getOrdersQueryKey } from "./getOrders";

export async function deleteOrder(id: string): Promise<void> {
  await deleteDocument("orders", id);
}

export function useDeleteOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: getOrdersQueryKey() });
    },
  });
}

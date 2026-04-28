import { deleteDocument } from "@/utils/CRUD/CRUD.client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function deleteOrder(id: string): Promise<void> {
  await deleteDocument("orders", id, {
    subcollections: ["orderTrackingEvent", "order_tracking_event"],
  });
}

export function useDeleteOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

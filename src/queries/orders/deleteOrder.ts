import { deleteDocument } from "@/utils/CRUD/CRUD.client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export async function deleteOrder(id: string): Promise<void> {
  try {
    await deleteDocument("orders", id, {
      subcollections: ["orderTrackingEvent", "order_tracking_event"],
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    throw new Error("Unable to delete this order right now.");
  }
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

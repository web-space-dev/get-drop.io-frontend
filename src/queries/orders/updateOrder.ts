import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDocument } from "@/utils/CRUD/CRUD.client";
import { getOrdersQueryKey } from "./getOrders";
import { type OrderQueryModel, type UpdateOrderInput } from "./types";

type UpdateOrderMutationInput = {
  id: string;
  updates: UpdateOrderInput;
};

export async function updateOrder({
  id,
  updates,
}: UpdateOrderMutationInput): Promise<OrderQueryModel> {
  return updateDocument<OrderQueryModel>("orders", id, updates);
}

export function useUpdateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: getOrdersQueryKey() });
    },
  });
}

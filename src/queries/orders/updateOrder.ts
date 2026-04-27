import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDocument } from "@/utils/CRUD/CRUD.client";
import { getOrdersQueryKey } from "./getOrders";
import { getOrderByIdQueryKey } from "./getOrderById";
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
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: getOrdersQueryKey() });
      void queryClient.invalidateQueries({
        queryKey: getOrderByIdQueryKey(variables.id),
      });
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDocument } from "@/utils/CRUD/CRUD.client";
import { getOrdersQueryKey } from "./getOrders";
import { type CreateOrderInput, type OrderQueryModel } from "./types";

export async function addOrder(
  payload: CreateOrderInput,
): Promise<OrderQueryModel> {
  return createDocument<OrderQueryModel>("orders", payload);
}

export function useAddOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addOrder,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: getOrdersQueryKey() });
    },
  });
}

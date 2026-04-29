import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getDocumentById } from "@/utils/CRUD/CRUD.client";
import { type OrderQueryModel } from "./types";

export const getOrderByIdQueryKey = (id?: string) =>
  ["orders", "by-id", id ?? "missing"] as const;

export async function getOrderById(
  id: string,
): Promise<OrderQueryModel | null> {
  return getDocumentById<OrderQueryModel>("orders", id);
}

export function useGetOrderById(
  id?: string,
): UseQueryResult<OrderQueryModel | null> {
  return useQuery({
    queryKey: getOrderByIdQueryKey(id),
    queryFn: () => getOrderById(id as string),
    enabled: Boolean(id),
  });
}

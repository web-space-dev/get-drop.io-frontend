import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getDocuments, getDocumentsWhere } from "@/utils/CRUD/CRUD.client";
import { type OrderQueryModel } from "./types";

export const getOrdersQueryKey = (sellerId?: string) =>
  ["orders", sellerId ?? "all"] as const;

export async function getOrders(sellerId?: string): Promise<OrderQueryModel[]> {
  if (sellerId) {
    return getDocumentsWhere<OrderQueryModel>(
      "orders",
      "sellerId",
      "==",
      sellerId,
    );
  }

  return getDocuments<OrderQueryModel>("orders", {
    orderBy: [{ field: "createdAt", direction: "desc" }],
  });
}

export function useGetOrders(
  sellerId?: string,
): UseQueryResult<OrderQueryModel[]> {
  return useQuery({
    queryKey: getOrdersQueryKey(sellerId),
    queryFn: () => getOrders(sellerId),
  });
}

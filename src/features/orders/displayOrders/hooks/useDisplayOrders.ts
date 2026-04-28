import * as React from "react";
import { useGetOrders } from "@/queries/orders/getOrders";
import {
  type DisplayOrdersProps,
  type StatusFilter,
} from "@/features/orders/displayOrders/types";
import {
  filterOrders,
  getStatusOptions,
} from "@/features/orders/displayOrders/utils/ordersFiltering";

type UseDisplayOrdersResult = {
  isLoading: boolean;
  isError: boolean;
  statusFilter: StatusFilter;
  searchTerm: string;
  statusOptions: string[];
  filteredOrders: ReturnType<typeof filterOrders>;
  setStatusFilter: (status: StatusFilter) => void;
  setSearchTerm: (value: string) => void;
};

export function useDisplayOrders({
  sellerId,
}: DisplayOrdersProps): UseDisplayOrdersResult {
  const [statusFilter, setStatusFilter] = React.useState<StatusFilter>("all");
  const [searchTerm, setSearchTerm] = React.useState("");

  const { data: orders = [], isLoading, isError } = useGetOrders(sellerId);

  const statusOptions = React.useMemo(() => getStatusOptions(orders), [orders]);

  const filteredOrders = React.useMemo(
    () => filterOrders(orders, statusFilter, searchTerm),
    [orders, searchTerm, statusFilter],
  );

  return {
    isLoading,
    isError,
    statusFilter,
    searchTerm,
    statusOptions,
    filteredOrders,
    setStatusFilter,
    setSearchTerm,
  };
}

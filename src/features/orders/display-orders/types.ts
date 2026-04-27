import { type OrderQueryModel } from "@/queries/orders/types";

export type DisplayOrdersProps = {
  sellerId?: string;
};

export type DisplayOrdersListProps = {
  orders: OrderQueryModel[];
};

export type StatusTone = "default" | "error";

export type StatusFilter = "all" | string;

import { type OrderQueryModel } from "@/queries/orders/types";

export type DisplayOrdersProps = {
  sellerId?: string;
  onAddOrder?: () => void;
};

export type DisplayOrdersListProps = {
  orders: OrderQueryModel[];
};

export type StatusTone = "default" | "error" | "neutral";

export type StatusFilter = "all" | string;

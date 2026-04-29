import {
  type StatusFilter,
  type StatusTone,
} from "@/features/orders/displayOrders/types";
import { ORDERS_FALLBACK_TEXT } from "@/features/orders/utils/formatting";
import { type OrderQueryModel } from "@/queries/orders/types";

export const formatAddress = (order: OrderQueryModel): string => {
  const address = order.deliveryAddress;

  if (!address) {
    return ORDERS_FALLBACK_TEXT;
  }

  const formattedAddress = address.formattedAddress;
  if (formattedAddress && formattedAddress.trim()) {
    return formattedAddress;
  }

  const parts = [
    address.streetAddress ?? address.line1,
    address.line2,
    address.addressLocality ?? address.city,
    address.state,
    address.postalCode,
    address.addressCountry ?? address.country,
  ].filter((part): part is string => Boolean(part && part.trim()));

  return parts.length > 0 ? parts.join(", ") : ORDERS_FALLBACK_TEXT;
};

export const statusToneFromValue = (status: string): StatusTone => {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus.includes("delay")) {
    return "error";
  }

  if (
    normalizedStatus.includes("process") ||
    normalizedStatus.includes("pending")
  ) {
    return "neutral";
  }

  return "default";
};

export const searchMatchesOrder = (
  order: OrderQueryModel,
  searchTerm: string,
): boolean => {
  const normalized = searchTerm.trim().toLowerCase();

  if (!normalized) {
    return true;
  }

  return [
    order.id,
    order.orderName,
    order.buyerName,
    order.buyerEmail,
    order.buyerPhone,
    order.trackingNumber,
    order.trackingUrl,
    order.carrierName,
    order.currentStatus,
    order.publicTrackingToken,
    order.sellerId,
    order.notes,
    formatAddress(order),
  ]
    .join(" ")
    .toLowerCase()
    .includes(normalized);
};

export const getStatusOptions = (): StatusFilter[] => {
  return ["all", "inbound", "outbound", "complete", "archived"];
};

export const filterOrders = (
  orders: OrderQueryModel[],
  statusFilter: StatusFilter,
  searchTerm: string,
): OrderQueryModel[] => {
  return orders.filter((order) => {
    const isArchived = Boolean(order.archivedAt);

    if (statusFilter === "archived") {
      if (!isArchived) {
        return false;
      }

      return searchMatchesOrder(order, searchTerm);
    }

    if (isArchived) {
      return false;
    }

    const statusMatches =
      statusFilter === "all" || order.currentStatus === statusFilter;

    if (!statusMatches) {
      return false;
    }

    return searchMatchesOrder(order, searchTerm);
  });
};

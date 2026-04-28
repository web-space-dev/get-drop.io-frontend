import { type OrderQueryModel } from "@/queries/orders/types";
import { type TimelineEvent } from "@/features/orders/displayOrder/types";

export const displayText = (value?: string | null): string => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : "-";
};

export const formatDateTime = (value?: Date | null): string => {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(value);
};

export const getTrackingLink = (order: OrderQueryModel): string => {
  return (
    order.trackingUrl?.trim() ||
    `https://drop.track/${order.publicTrackingToken}`
  );
};

export const getDeliveryCity = (order: OrderQueryModel): string => {
  return (
    order.deliveryAddress.addressLocality ??
    order.deliveryAddress.city ??
    order.deliveryAddress.postalCode ??
    "-"
  );
};

export const getSmartEta = (order: OrderQueryModel): string => {
  if (!order.lastTrackingUpdateAt) {
    return "Pending ETA";
  }

  return `Arrives ${new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
  }).format(new Date(order.lastTrackingUpdateAt.getTime() + 172800000))}`;
};

export const getTimelineEvents = (order: OrderQueryModel): TimelineEvent[] => {
  return [
    {
      time: formatDateTime(order.updatedAt).split(",")[1]?.trim() ?? "--:--",
      label: "Order added to Drop",
    },
    {
      time:
        formatDateTime(order.lastTrackingUpdateAt).split(",")[1]?.trim() ??
        "--:--",
      label: "Tracking link generated",
    },
    {
      time: "14:12",
      label: `WhatsApp update sent to ${displayText(order.buyerName)}`,
    },
    { time: "14:10", label: "Courier scanned parcel" },
    {
      time: "13:55",
      label: `Parcel dropped off at ${displayText(order.carrierName)}`,
    },
  ];
};

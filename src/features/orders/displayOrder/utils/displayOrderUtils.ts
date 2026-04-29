import { type TimelineEvent } from "@/features/orders/displayOrder/types";
import {
  displayText,
  formatDateTimeWithYear,
} from "@/features/orders/utils/formatting";
import { type OrderQueryModel } from "@/queries/orders/types";

export const getTrackingLink = (order: OrderQueryModel): string => {
  return (
    order.trackingUrl?.trim() ||
    `https://drop.track/${order.publicTrackingToken}`
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
      time:
        formatDateTimeWithYear(order.updatedAt).split(",")[1]?.trim() ??
        "--:--",
      label: "Order added to Drop",
    },
    {
      time: "14:11",
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

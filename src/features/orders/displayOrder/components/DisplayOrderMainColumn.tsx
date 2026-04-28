import Box from "@mui/material/Box";
import { type DisplayOrderMainColumnProps } from "../types";
import { displayText } from "../utils/displayOrderUtils";
import ActivityLogSummary from "./ActivityLogSummary";
import BuyerSummary from "./BuyerSummary";
import OrderSummaryCard, { type OrderSummaryItem } from "./OrderSummaryCard";

export default function DisplayOrderMainColumn({
  city,
  isCopied,
  onCopyTrackingLink,
  onOpenEditBuyer,
  order,
  smartEta,
  timelineEvents,
  trackingLink,
}: DisplayOrderMainColumnProps) {
  const summaryItems: OrderSummaryItem[] = [
    {
      label: "Status",
      value: displayText(order.currentStatus),
      useStatusPill: true,
    },
    {
      label: "Courier",
      value: displayText(order.carrierName),
    },
    {
      label: "Tracking Number",
      value: displayText(order.trackingNumber),
    },
    {
      label: "Smart ETA",
      value: smartEta,
    },
  ];

  return (
    <Box component="section" sx={{ display: "grid", gap: 2 }}>
      <OrderSummaryCard
        orderName={displayText(order.referenceId)}
        items={summaryItems}
        trackingLink={trackingLink}
        isCopied={isCopied}
        onCopyTrackingLink={onCopyTrackingLink}
      />

      <BuyerSummary
        buyerName={order.buyerName}
        buyerEmail={order.buyerEmail}
        buyerPhone={order.buyerPhone}
        city={city}
        onOpenEditBuyer={onOpenEditBuyer}
      />

      <ActivityLogSummary timelineEvents={timelineEvents} />
    </Box>
  );
}

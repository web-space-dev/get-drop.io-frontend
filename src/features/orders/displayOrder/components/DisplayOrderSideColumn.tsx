import Box from "@mui/material/Box";
import { type DisplayOrderSideColumnProps } from "../types";
import AutomatedUpdatesSummary from "./AutomatedUpdatesSummary";
import OrderActionsSummary from "./OrderActionsSummary";

export default function DisplayOrderSideColumn({
  channel,
  onChannelChange,
  onOpenEditOrder,
  onOpenDelete,
  onRuleChange,
  updateRules,
}: DisplayOrderSideColumnProps) {
  return (
    <Box component="aside" sx={{ display: "grid", gap: 2, alignSelf: "start" }}>
      <AutomatedUpdatesSummary
        channel={channel}
        updateRules={updateRules}
        onChannelChange={onChannelChange}
        onRuleChange={onRuleChange}
      />

      <OrderActionsSummary
        onOpenEditOrder={onOpenEditOrder}
        onOpenDelete={onOpenDelete}
      />
    </Box>
  );
}

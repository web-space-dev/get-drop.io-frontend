import { type DisplayOrdersListProps } from "@/features/orders/displayOrders/DisplayOrders";
import OrderArchiveToggleButton from "@/features/orders/displayOrders/components/OrderArchiveToggleButton";
import OrderViewButton from "@/features/orders/displayOrders/components/OrderViewButton";
import {
  getOrderType,
  getSmartEta,
  getStatusChipSx,
} from "@/features/orders/displayOrders/utils/displayOrdersPresentation";
import { statusToneFromValue } from "@/features/orders/displayOrders/utils/ordersFiltering";
import {
  displayText,
  formatDateTime,
} from "@/features/orders/utils/formatting";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

export default function DisplayOrdersMobile({
  orders,
  onArchiveOrder,
  onUnarchiveOrder,
  archivingOrderId,
}: DisplayOrdersListProps) {
  return (
    <Box
      sx={(theme) => ({
        display: "grid",
        gap: theme.spacing(1.25),
        [theme.breakpoints.up("md")]: {
          display: "none",
        },
      })}
    >
      {orders.map((order) => {
        const orderHref = order.id ? `/orders/${order.id}` : null;

        return (
          <Box
            key={order.id}
            component="article"
            sx={(theme) => ({
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: theme.spacing(1.5),
              p: theme.spacing(1.5),
              display: "grid",
              gap: theme.spacing(1),
              backgroundColor: theme.palette.background.paper,
            })}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
              }}
            >
              <Typography variant="subtitle2">
                {displayText(order.orderName)}
              </Typography>
              <Chip
                size="small"
                label={displayText(order.currentStatus)}
                sx={getStatusChipSx(statusToneFromValue(order.currentStatus))}
              />
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "6px 8px",
              }}
            >
              <Box sx={{ display: "grid", gap: 0.25 }}>
                <Typography variant="body2" color="text.secondary">
                  Order Name
                </Typography>
                <Typography variant="body2">
                  {displayText(order.orderName)}
                </Typography>
              </Box>
              <Box sx={{ display: "grid", gap: 0.25 }}>
                <Typography variant="body2" color="text.secondary">
                  Buyer
                </Typography>
                <Typography variant="body2">
                  {displayText(order.buyerName)}
                </Typography>
              </Box>
              <Box sx={{ display: "grid", gap: 0.25 }}>
                <Typography variant="body2" color="text.secondary">
                  Type
                </Typography>
                <Typography variant="body2">
                  {getOrderType(order.currentStatus)}
                </Typography>
              </Box>
              <Box sx={{ display: "grid", gap: 0.25 }}>
                <Typography variant="body2" color="text.secondary">
                  Courier
                </Typography>
                <Typography variant="body2">
                  {displayText(order.carrierName)}
                </Typography>
              </Box>
              <Box sx={{ display: "grid", gap: 0.25 }}>
                <Typography variant="body2" color="text.secondary">
                  Status
                </Typography>
                <Typography variant="body2">
                  {displayText(order.currentStatus)}
                </Typography>
              </Box>
              <Box sx={{ display: "grid", gap: 0.25 }}>
                <Typography variant="body2" color="text.secondary">
                  Last Activity
                </Typography>
                <Typography variant="body2">
                  {formatDateTime(
                    order.lastTrackingUpdateAt ?? order.updatedAt,
                  )}
                </Typography>
              </Box>
              <Box sx={{ display: "grid", gap: 0.25 }}>
                <Typography variant="body2" color="text.secondary">
                  Smart ETA
                </Typography>
                <Typography variant="body2">
                  {getSmartEta(Boolean(order.lastTrackingUpdateAt))}
                </Typography>
              </Box>
              <Box sx={{ display: "grid", gap: 0.25 }}>
                <Typography variant="body2" color="text.secondary">
                  Actions
                </Typography>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <OrderViewButton href={orderHref} compact />

                  <OrderArchiveToggleButton
                    orderId={order.id}
                    isArchived={Boolean(order.archivedAt)}
                    isBusy={archivingOrderId === order.id}
                    onArchiveOrder={onArchiveOrder}
                    onUnarchiveOrder={onUnarchiveOrder}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

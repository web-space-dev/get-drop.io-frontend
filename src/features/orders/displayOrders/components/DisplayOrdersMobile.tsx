import { designSystemColors } from "@/config/theme";
import { type DisplayOrdersListProps } from "@/features/orders/displayOrders/types";
import {
  displayText,
  formatDateTime,
  statusToneFromValue,
} from "@/features/orders/displayOrders/utils/ordersFiltering";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";

const getStatusChipSx = (statusTone: "default" | "error" | "neutral") =>
  ({
    typography: "body2",
    height: 34,
    borderRadius: 1,
    border: "1px solid",
    borderColor:
      statusTone === "error"
        ? "error.main"
        : statusTone === "neutral"
          ? "divider"
          : designSystemColors.neutralBlack,
    backgroundColor:
      statusTone === "error"
        ? "error.main"
        : statusTone === "neutral"
          ? "transparent"
          : designSystemColors.neutralBlack,
    color:
      statusTone === "error" || statusTone === "default"
        ? "common.white"
        : designSystemColors.neutralBlack,
    "& .MuiChip-label": {
      px: 1.25,
    },
  }) as const;

const getOrderType = (status: string): string => {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus === "inbound" || normalizedStatus === "outbound") {
    return normalizedStatus.charAt(0).toUpperCase() + normalizedStatus.slice(1);
  }

  return "Outbound";
};

const getSmartEta = (hasTrackingUpdate: boolean): string => {
  return hasTrackingUpdate ? "Tracking Updated" : "Pending ETA";
};

export default function DisplayOrdersMobile({
  orders,
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
      {orders.map((order) => (
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
                {formatDateTime(order.lastTrackingUpdateAt ?? order.updatedAt)}
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
              <Link
                component={NextLink}
                href={`/orders/${order.id}`}
                underline="hover"
              >
                <Typography variant="body2">View</Typography>
              </Link>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

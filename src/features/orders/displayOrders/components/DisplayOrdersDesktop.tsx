import { designSystemColors } from "@/config/theme";
import { type DisplayOrdersListProps } from "@/features/orders/displayOrders/DisplayOrders";
import OrderArchiveToggleButton from "@/features/orders/displayOrders/components/OrderArchiveToggleButton";
import OrderViewButton from "@/features/orders/displayOrders/components/OrderViewButton";
import {
  displayText,
  statusToneFromValue,
} from "@/features/orders/displayOrders/utils/ordersFiltering";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

type StatusTone = "default" | "error" | "neutral";

const cellSx = {
  typography: "body2",
  color: designSystemColors.neutralBlack,
  borderBottom: `1px solid ${designSystemColors.white}`,
  whiteSpace: "nowrap",
  px: 1.75,
  py: 1.5,
  maxWidth: 260,
  overflow: "hidden",
  textOverflow: "ellipsis",
} as const;

const chipBaseSx = {
  typography: "body2",
  height: 34,
  borderRadius: 1,
  border: "1px solid",
  "& .MuiChip-label": {
    px: 1.25,
  },
} as const;

const statusToneChipSx: Record<
  StatusTone,
  {
    borderColor: string;
    backgroundColor: string;
    color: string;
  }
> = {
  default: {
    borderColor: designSystemColors.neutralBlack,
    backgroundColor: designSystemColors.neutralBlack,
    color: "common.white",
  },
  error: {
    borderColor: "error.main",
    backgroundColor: "error.main",
    color: "common.white",
  },
  neutral: {
    borderColor: "divider",
    backgroundColor: "transparent",
    color: designSystemColors.neutralBlack,
  },
};

const getStatusChipSx = (statusTone: StatusTone) =>
  ({
    ...chipBaseSx,
    ...statusToneChipSx[statusTone],
  }) as const;

const typeChipSx = {
  ...chipBaseSx,
  borderColor: "divider",
  backgroundColor: "transparent",
  color: designSystemColors.neutralBlack,
} as const;

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
});

const getOrderType = (status: string): string => {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus === "inbound" || normalizedStatus === "outbound") {
    return normalizedStatus.charAt(0).toUpperCase() + normalizedStatus.slice(1);
  }

  return "Outbound";
};

const getSmartEta = (hasTrackingUpdate: boolean): string => {
  if (!hasTrackingUpdate) {
    return "Pending ETA";
  }

  return "Tracking Updated";
};

const getDisplayStatus = (
  orderStatus: string,
  hasTrackingUpdate: boolean,
): string => {
  const normalizedStatus = orderStatus.trim().toLowerCase();

  if (normalizedStatus === "inbound" || normalizedStatus === "outbound") {
    return hasTrackingUpdate ? "In Transit" : "Processing";
  }

  return displayText(orderStatus)
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
};

const getLastActivity = (
  lastTrackingUpdateAt: Date | null,
  updatedAt: Date,
): string => {
  const baseDate = lastTrackingUpdateAt ?? updatedAt;
  const time = timeFormatter.format(baseDate);

  return `Updated ${time}`;
};

export default function DisplayOrdersDesktop({
  orders,
  onArchiveOrder,
  onUnarchiveOrder,
  archivingOrderId,
}: DisplayOrdersListProps) {
  return (
    <Box
      sx={{
        display: "none",
        "@media (min-width: 900px)": { display: "block" },
      }}
    >
      <Paper
        sx={(theme) => ({
          borderRadius: theme.spacing(1.5),
          border: `1px solid ${designSystemColors.white}`,
          overflow: "hidden",
        })}
      >
        <TableContainer
          sx={(theme) => ({
            maxWidth: "100%",
            overflowX: "auto",
            "&::-webkit-scrollbar": {
              height: 8,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.action.disabled,
              borderRadius: 999,
            },
          })}
        >
          <Table sx={{ minWidth: 1100 }}>
            <TableHead
              sx={(theme) => ({
                "& .MuiTableCell-root": {
                  ...theme.typography.subtitle2,
                  color: designSystemColors.neutralBlack,
                  backgroundColor: designSystemColors.white,
                  borderBottom: `1px solid ${designSystemColors.white}`,
                  px: 1.75,
                  py: 1.75,
                },
              })}
            >
              <TableRow>
                <TableCell sx={cellSx}>Order Name</TableCell>
                <TableCell sx={cellSx}>Buyer</TableCell>
                <TableCell sx={cellSx}>Type</TableCell>
                <TableCell sx={cellSx}>Courier</TableCell>
                <TableCell sx={cellSx}>Status</TableCell>
                <TableCell sx={cellSx}>Last Activity</TableCell>
                <TableCell sx={cellSx}>Smart ETA</TableCell>
                <TableCell sx={cellSx}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                const hasTrackingUpdate = Boolean(order.lastTrackingUpdateAt);
                const statusLabel = getDisplayStatus(
                  order.currentStatus,
                  hasTrackingUpdate,
                );
                const orderHref = order.id ? `/orders/${order.id}` : null;

                return (
                  <TableRow key={order.id}>
                    <TableCell sx={cellSx}>
                      {displayText(order.orderName)}
                    </TableCell>
                    <TableCell sx={cellSx}>
                      <Typography variant="body2" color="text.secondary">
                        {displayText(order.buyerName)}
                      </Typography>
                    </TableCell>
                    <TableCell sx={cellSx}>
                      <Chip
                        size="small"
                        label={getOrderType(order.currentStatus)}
                        sx={typeChipSx}
                      />
                    </TableCell>
                    <TableCell sx={cellSx}>
                      <Typography variant="body2" color="text.secondary">
                        {displayText(order.carrierName)}
                      </Typography>
                    </TableCell>
                    <TableCell sx={cellSx}>
                      <Chip
                        size="small"
                        label={statusLabel}
                        sx={getStatusChipSx(statusToneFromValue(statusLabel))}
                      />
                    </TableCell>
                    <TableCell sx={cellSx}>
                      <Typography variant="body2" color="text.secondary">
                        {getLastActivity(
                          order.lastTrackingUpdateAt,
                          order.updatedAt,
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell sx={cellSx}>
                      {getSmartEta(hasTrackingUpdate)}
                    </TableCell>
                    <TableCell sx={cellSx}>
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 0.75,
                        }}
                      >
                        <OrderViewButton href={orderHref} />

                        <OrderArchiveToggleButton
                          orderId={order.id}
                          isArchived={Boolean(order.archivedAt)}
                          isBusy={archivingOrderId === order.id}
                          onArchiveOrder={onArchiveOrder}
                          onUnarchiveOrder={onUnarchiveOrder}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

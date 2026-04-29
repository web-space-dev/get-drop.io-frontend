import { designSystemColors } from "@/config/theme";
import { type DisplayOrdersListProps } from "@/features/orders/displayOrders/DisplayOrders";
import OrderArchiveToggleButton from "@/features/orders/displayOrders/components/OrderArchiveToggleButton";
import OrderViewButton from "@/features/orders/displayOrders/components/OrderViewButton";
import {
  getDisplayStatus,
  getLastActivity,
  getOrderType,
  getSmartEta,
  getStatusChipSx,
  typeChipSx,
} from "@/features/orders/displayOrders/utils/displayOrdersPresentation";
import { statusToneFromValue } from "@/features/orders/displayOrders/utils/ordersFiltering";
import { displayText } from "@/features/orders/utils/formatting";
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

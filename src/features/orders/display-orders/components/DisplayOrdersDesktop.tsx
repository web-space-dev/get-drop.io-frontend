import TableBody from "@mui/material/TableBody";
import Link from "@mui/material/Link";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import {
  displayText,
  formatDateTime,
  statusToneFromValue,
} from "../utils/ordersFiltering";
import {
  DesktopOnly,
  OrdersCell,
  OrdersPaper,
  OrdersTable,
  OrdersTableContainer,
  OrdersTableHead,
  StatusChip,
} from "../styles";
import { type DisplayOrdersListProps } from "../types";

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

export default function DisplayOrdersDesktop({
  orders,
}: DisplayOrdersListProps) {
  return (
    <DesktopOnly>
      <OrdersPaper>
        <OrdersTableContainer>
          <OrdersTable>
            <OrdersTableHead>
              <TableRow>
                <OrdersCell>Order Name</OrdersCell>
                <OrdersCell>Buyer</OrdersCell>
                <OrdersCell>Type</OrdersCell>
                <OrdersCell>Courier</OrdersCell>
                <OrdersCell>Status</OrdersCell>
                <OrdersCell>Last Activity</OrdersCell>
                <OrdersCell>Smart ETA</OrdersCell>
                <OrdersCell>Actions</OrdersCell>
              </TableRow>
            </OrdersTableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <OrdersCell>{displayText(order.referenceId)}</OrdersCell>
                  <OrdersCell>{displayText(order.buyerName)}</OrdersCell>
                  <OrdersCell>{getOrderType(order.currentStatus)}</OrdersCell>
                  <OrdersCell>{displayText(order.carrierName)}</OrdersCell>
                  <OrdersCell>
                    <StatusChip
                      size="small"
                      statusTone={statusToneFromValue(order.currentStatus)}
                      label={displayText(order.currentStatus)}
                    />
                  </OrdersCell>
                  <OrdersCell>
                    {formatDateTime(
                      order.lastTrackingUpdateAt ?? order.updatedAt,
                    )}
                  </OrdersCell>
                  <OrdersCell>
                    {getSmartEta(Boolean(order.lastTrackingUpdateAt))}
                  </OrdersCell>
                  <OrdersCell>
                    <Link
                      component={NextLink}
                      href={`/orders/${order.id}`}
                      underline="hover"
                    >
                      <Typography variant="body2">View</Typography>
                    </Link>
                  </OrdersCell>
                </TableRow>
              ))}
            </TableBody>
          </OrdersTable>
        </OrdersTableContainer>
      </OrdersPaper>
    </DesktopOnly>
  );
}

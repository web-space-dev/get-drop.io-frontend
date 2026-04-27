import TableBody from "@mui/material/TableBody";
import Link from "@mui/material/Link";
import TableRow from "@mui/material/TableRow";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import NextLink from "next/link";
import { displayText, statusToneFromValue } from "../utils/ordersFiltering";
import {
  DesktopOnly,
  MutedCellText,
  OrdersCell,
  OrdersPaper,
  OrdersTable,
  OrdersTableContainer,
  OrdersTableHead,
  StatusChip,
  TypeChip,
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
  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(baseDate);

  return `Updated ${time}`;
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
              {orders.map((order) => {
                const hasTrackingUpdate = Boolean(order.lastTrackingUpdateAt);
                const statusLabel = getDisplayStatus(
                  order.currentStatus,
                  hasTrackingUpdate,
                );

                return (
                  <TableRow key={order.id}>
                    <OrdersCell>{displayText(order.referenceId)}</OrdersCell>
                    <OrdersCell>
                      <MutedCellText>
                        {displayText(order.buyerName)}
                      </MutedCellText>
                    </OrdersCell>
                    <OrdersCell>
                      <TypeChip
                        size="small"
                        label={getOrderType(order.currentStatus)}
                      />
                    </OrdersCell>
                    <OrdersCell>
                      <MutedCellText>
                        {displayText(order.carrierName)}
                      </MutedCellText>
                    </OrdersCell>
                    <OrdersCell>
                      <StatusChip
                        size="small"
                        statusTone={statusToneFromValue(statusLabel)}
                        label={statusLabel}
                      />
                    </OrdersCell>
                    <OrdersCell>
                      <MutedCellText>
                        {getLastActivity(
                          order.lastTrackingUpdateAt,
                          order.updatedAt,
                        )}
                      </MutedCellText>
                    </OrdersCell>
                    <OrdersCell>{getSmartEta(hasTrackingUpdate)}</OrdersCell>
                    <OrdersCell>
                      <Link
                        component={NextLink}
                        href={`/orders/${order.id}`}
                        underline="none"
                        sx={(theme) => ({
                          ...theme.typography.body2,
                          color: "inherit",
                          fontWeight: 600,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: theme.spacing(0.5),
                          textDecoration: "none",
                          "&:hover": {
                            textDecoration: "none",
                          },
                        })}
                      >
                        View
                        <ArrowForwardRoundedIcon fontSize="small" />
                      </Link>
                    </OrdersCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </OrdersTable>
        </OrdersTableContainer>
      </OrdersPaper>
    </DesktopOnly>
  );
}

import Typography from "@mui/material/Typography";
import {
  displayText,
  formatDateTime,
  statusToneFromValue,
} from "../utils/ordersFiltering";
import {
  MobileCard,
  MobileCardTop,
  MobileList,
  MobileMeta,
  MobileMetaRow,
  MutedCellText,
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

export default function DisplayOrdersMobile({
  orders,
}: DisplayOrdersListProps) {
  return (
    <MobileList>
      {orders.map((order) => (
        <MobileCard key={order.id}>
          <MobileCardTop>
            <Typography variant="subtitle2">
              {displayText(order.referenceId)}
            </Typography>
            <StatusChip
              size="small"
              statusTone={statusToneFromValue(order.currentStatus)}
              label={displayText(order.currentStatus)}
            />
          </MobileCardTop>

          <MobileMeta>
            <MobileMetaRow>
              <MutedCellText>Order Name</MutedCellText>
              <Typography variant="body2">
                {displayText(order.referenceId)}
              </Typography>
            </MobileMetaRow>
            <MobileMetaRow>
              <MutedCellText>Buyer</MutedCellText>
              <Typography variant="body2">
                {displayText(order.buyerName)}
              </Typography>
            </MobileMetaRow>
            <MobileMetaRow>
              <MutedCellText>Type</MutedCellText>
              <Typography variant="body2">
                {getOrderType(order.currentStatus)}
              </Typography>
            </MobileMetaRow>
            <MobileMetaRow>
              <MutedCellText>Courier</MutedCellText>
              <Typography variant="body2">
                {displayText(order.carrierName)}
              </Typography>
            </MobileMetaRow>
            <MobileMetaRow>
              <MutedCellText>Status</MutedCellText>
              <Typography variant="body2">
                {displayText(order.currentStatus)}
              </Typography>
            </MobileMetaRow>
            <MobileMetaRow>
              <MutedCellText>Last Activity</MutedCellText>
              <Typography variant="body2">
                {formatDateTime(order.lastTrackingUpdateAt ?? order.updatedAt)}
              </Typography>
            </MobileMetaRow>
            <MobileMetaRow>
              <MutedCellText>Smart ETA</MutedCellText>
              <Typography variant="body2">
                {getSmartEta(Boolean(order.lastTrackingUpdateAt))}
              </Typography>
            </MobileMetaRow>
            <MobileMetaRow>
              <MutedCellText>Actions</MutedCellText>
              <Typography variant="body2">View</Typography>
            </MobileMetaRow>
          </MobileMeta>
        </MobileCard>
      ))}
    </MobileList>
  );
}

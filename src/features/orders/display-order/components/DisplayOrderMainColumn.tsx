import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import {
  ActionButton,
  BuyerIconWrap,
  BuyerLine,
  BuyerLineContent,
  BuyerLineLabel,
  BuyerLineValue,
  Card,
  CardHeader,
  CardTitle,
  DividerLine,
  MainColumn,
  MutedLabel,
  OrderName,
  SummaryGrid,
  SummaryInlineItem,
  SummaryInlineItemBreak,
  SummaryInlineLabel,
  SummaryInlineValue,
  StatusPill,
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineLine,
  TimelineMarker,
  TimelineTime,
  TrackingActionButton,
  TrackingActions,
  TrackingLinkBox,
  TrackingRow,
  Value,
} from "../styles";
import { type DisplayOrderMainColumnProps } from "../types";
import { displayText } from "../utils/displayOrderUtils";

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
  const canOpenTrackingLink = trackingLink.trim() !== "-";

  const handleOpenTrackingLink = () => {
    if (!canOpenTrackingLink) {
      return;
    }

    window.open(trackingLink, "_blank", "noopener,noreferrer");
  };

  return (
    <MainColumn>
      <Card elevation={0}>
        <OrderName>{displayText(order.referenceId)}</OrderName>

        <SummaryGrid>
          <SummaryInlineItem>
            <SummaryInlineLabel>Status:</SummaryInlineLabel>
            <StatusPill>{displayText(order.currentStatus)}</StatusPill>
          </SummaryInlineItem>
          <SummaryInlineItem>
            <SummaryInlineLabel>Courier:</SummaryInlineLabel>
            <SummaryInlineValue>
              {displayText(order.carrierName)}
            </SummaryInlineValue>
          </SummaryInlineItem>
          <SummaryInlineItem>
            <SummaryInlineLabel>Tracking Number:</SummaryInlineLabel>
            <SummaryInlineValue>
              {displayText(order.trackingNumber)}
            </SummaryInlineValue>
          </SummaryInlineItem>
          <SummaryInlineItemBreak>
            <SummaryInlineLabel>Smart ETA:</SummaryInlineLabel>
            <SummaryInlineValue>{smartEta}</SummaryInlineValue>
          </SummaryInlineItemBreak>
        </SummaryGrid>

        <DividerLine />

        <TrackingRow>
          <MutedLabel>Tracking Link</MutedLabel>
          <TrackingLinkBox>{trackingLink}</TrackingLinkBox>
          <TrackingActions>
            <TrackingActionButton
              variant="outlined"
              startIcon={<ContentCopyRoundedIcon fontSize="small" />}
              onClick={onCopyTrackingLink}
            >
              {isCopied ? "Copied" : "Copy Tracking Link"}
            </TrackingActionButton>
            <TrackingActionButton
              variant="outlined"
              startIcon={<OpenInNewRoundedIcon fontSize="small" />}
              onClick={handleOpenTrackingLink}
              disabled={!canOpenTrackingLink}
            >
              Open Tracking Link
            </TrackingActionButton>
          </TrackingActions>
        </TrackingRow>
      </Card>

      <Card elevation={0}>
        <CardHeader>
          <CardTitle>Buyer Information</CardTitle>
          <ActionButton
            variant="outlined"
            startIcon={<EditOutlinedIcon fontSize="small" />}
            onClick={onOpenEditBuyer}
          >
            Edit Buyer Info
          </ActionButton>
        </CardHeader>

        <BuyerLine>
          <BuyerIconWrap>
            <EditOutlinedIcon fontSize="inherit" />
          </BuyerIconWrap>
          <BuyerLineContent>
            <BuyerLineLabel>Buyer Name</BuyerLineLabel>
            <BuyerLineValue>{displayText(order.buyerName)}</BuyerLineValue>
          </BuyerLineContent>
        </BuyerLine>
        <BuyerLine>
          <BuyerIconWrap>
            <MailOutlineRoundedIcon fontSize="inherit" />
          </BuyerIconWrap>
          <BuyerLineContent>
            <BuyerLineLabel>Buyer Email</BuyerLineLabel>
            <BuyerLineValue>{displayText(order.buyerEmail)}</BuyerLineValue>
          </BuyerLineContent>
        </BuyerLine>
        <BuyerLine>
          <BuyerIconWrap>
            <LocalPhoneOutlinedIcon fontSize="inherit" />
          </BuyerIconWrap>
          <BuyerLineContent>
            <BuyerLineLabel>Buyer Phone</BuyerLineLabel>
            <BuyerLineValue>{displayText(order.buyerPhone)}</BuyerLineValue>
          </BuyerLineContent>
        </BuyerLine>
        <BuyerLine>
          <BuyerIconWrap>
            <LocationOnOutlinedIcon fontSize="inherit" />
          </BuyerIconWrap>
          <BuyerLineContent>
            <BuyerLineLabel>Delivery City</BuyerLineLabel>
            <BuyerLineValue>{displayText(city)}</BuyerLineValue>
          </BuyerLineContent>
        </BuyerLine>
      </Card>

      <Card elevation={0}>
        <CardTitle>Activity Log</CardTitle>
        <Timeline>
          {timelineEvents.map((event, index) => (
            <TimelineItem key={`${event.time}-${event.label}`}>
              <TimelineMarker>
                <TimelineDot active={index === 0} />
                {index < timelineEvents.length - 1 ? <TimelineLine /> : null}
              </TimelineMarker>
              <TimelineTime>{event.time}</TimelineTime>
              <Value>{event.label}</Value>
            </TimelineItem>
          ))}
        </Timeline>
      </Card>
    </MainColumn>
  );
}

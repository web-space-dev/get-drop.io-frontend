import { type TimelineEvent } from "@/features/orders/displayOrder/types";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import Typography from "@mui/material/Typography";
import { SummaryCard } from "./SummaryCard";
import { SummaryCardTitle } from "./SummaryCardTitle";

type ActivityLogSummaryProps = {
  timelineEvents: TimelineEvent[];
};

export default function ActivityLogSummary({
  timelineEvents,
}: ActivityLogSummaryProps) {
  return (
    <SummaryCard elevation={0}>
      <SummaryCardTitle>Activity Log</SummaryCardTitle>
      <Timeline
        position="right"
        sx={{
          m: 0,
          p: 0,
          width: "fit-content",
          maxWidth: "100%",
          mr: "auto",
          [`& .MuiTimelineItem-root:before`]: {
            display: "none",
          },
          [`& .MuiTimelineOppositeContent-root`]: {
            flex: 0,
          },
        }}
      >
        {timelineEvents.map((event, index) => (
          <TimelineItem key={`${event.time}-${event.label}`}>
            <TimelineOppositeContent variant="caption">
              {event.time}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color={index === 0 ? "primary" : "grey"} />
              {index < timelineEvents.length - 1 ? <TimelineConnector /> : null}
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="body2">{event.label}</Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </SummaryCard>
  );
}

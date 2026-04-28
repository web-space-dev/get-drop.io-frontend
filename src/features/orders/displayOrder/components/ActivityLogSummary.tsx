import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { designSystemColors } from "@/config/theme";
import { type TimelineEvent } from "../types";
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
      <Box
        sx={(theme) => ({
          display: "grid",
          gap: theme.spacing(1.1),
        })}
      >
        {timelineEvents.map((event, index) => (
          <Box
            key={`${event.time}-${event.label}`}
            sx={(theme) => ({
              display: "grid",
              gridTemplateColumns: "16px 50px minmax(0, 1fr)",
              alignItems: "start",
              gap: theme.spacing(1),
            })}
          >
            <Box
              sx={{
                display: "grid",
                justifyItems: "center",
                alignItems: "start",
              }}
            >
              <Box
                sx={(theme) => ({
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  mt: 0.5,
                  backgroundColor:
                    index === 0
                      ? designSystemColors.neutralBlack
                      : theme.palette.action.disabled,
                })}
              />
              {index < timelineEvents.length - 1 ? (
                <Box
                  sx={(theme) => ({
                    width: 1,
                    minHeight: theme.spacing(2.5),
                    mt: theme.spacing(0.35),
                    backgroundColor: alpha(theme.palette.text.secondary, 0.25),
                  })}
                />
              ) : null}
            </Box>
            <Typography
              variant="caption"
              sx={{ color: designSystemColors.neutralBlack }}
            >
              {event.time}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: designSystemColors.neutralBlack }}
            >
              {event.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </SummaryCard>
  );
}

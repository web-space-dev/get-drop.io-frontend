import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@/components/ui/Button";
import { alpha } from "@mui/material/styles";
import { designSystemColors } from "@/config/theme";
import { SummaryCard } from "./SummaryCard";
import { SummaryCardTitle } from "./SummaryCardTitle";

export type OrderSummaryItem = {
  label: string;
  value: string;
  useStatusPill?: boolean;
};

type OrderSummaryCardProps = {
  orderName: string;
  items: OrderSummaryItem[];
  trackingLink: string;
  isCopied: boolean;
  onCopyTrackingLink: () => void;
};

function SummaryGridRow({ label, useStatusPill, value }: OrderSummaryItem) {
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        alignItems: "baseline",
        flexWrap: "nowrap",
        gap: theme.spacing(1),
        minWidth: 0,
        whiteSpace: "nowrap",
      })}
    >
      <Typography
        variant="body2"
        sx={{ color: designSystemColors.neutralMeta, fontWeight: 400 }}
      >
        {label}:
      </Typography>
      {useStatusPill ? (
        <Box
          sx={(theme) => ({
            ...theme.typography.body2,
            width: "fit-content",
            backgroundColor: "transparent",
            color: designSystemColors.neutralMeta,
            border: `1px solid ${alpha(designSystemColors.neutralMeta, 0.35)}`,
            padding: theme.spacing(0.2, 1),
            borderRadius: theme.spacing(1),
          })}
        >
          {value}
        </Box>
      ) : (
        <Typography
          variant="body2"
          sx={{ color: designSystemColors.neutralBlack, fontWeight: 400 }}
        >
          {value}
        </Typography>
      )}
    </Box>
  );
}

export default function OrderSummaryCard({
  orderName,
  items,
  trackingLink,
  isCopied,
  onCopyTrackingLink,
}: OrderSummaryCardProps) {
  const canOpenTrackingLink = trackingLink.trim() !== "-";

  const handleOpenTrackingLink = () => {
    if (!canOpenTrackingLink) {
      return;
    }

    window.open(trackingLink, "_blank", "noopener,noreferrer");
  };

  return (
    <SummaryCard elevation={0}>
      <SummaryCardTitle>{orderName}</SummaryCardTitle>

      <Box
        sx={(theme) => ({
          display: "flex",
          flexWrap: "wrap",
          gap: theme.spacing(1.5, 3),
        })}
      >
        {items.map((item) => (
          <SummaryGridRow
            key={item.label}
            label={item.label}
            value={item.value}
            useStatusPill={item.useStatusPill}
          />
        ))}
      </Box>

      <Box
        sx={(theme) => ({
          borderTop: `1px solid ${alpha(theme.palette.text.secondary, 0.15)}`,
        })}
      />

      <Box
        sx={(theme) => ({
          display: "grid",
          gap: theme.spacing(1),
        })}
      >
        <Typography variant="caption" color="text.secondary">
          Tracking Link
        </Typography>
        <Box
          sx={(theme) => ({
            ...theme.typography.body2,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            color: designSystemColors.neutralBlack,
            border: `1px solid ${alpha(theme.palette.text.secondary, 0.2)}`,
            borderRadius: theme.spacing(1),
            padding: theme.spacing(1, 1.25),
            backgroundColor: theme.palette.action.hover,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          })}
        >
          {trackingLink}
        </Box>
        <Box
          sx={(theme) => ({
            display: "grid",
            gap: theme.spacing(1),
            gridTemplateColumns: "1fr",
            [theme.breakpoints.up("sm")]: {
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            },
          })}
        >
          <Button
            variant="outlined"
            startIcon={<ContentCopyRoundedIcon fontSize="small" />}
            onClick={onCopyTrackingLink}
            sx={(theme) => ({
              minHeight: theme.spacing(4.5),
              backgroundColor: "transparent",
              color: designSystemColors.neutralBlack,
              border: `1px solid ${alpha(theme.palette.text.secondary, 0.25)}`,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            })}
          >
            {isCopied ? "Copied" : "Copy Tracking Link"}
          </Button>
          <Button
            variant="outlined"
            startIcon={<OpenInNewRoundedIcon fontSize="small" />}
            onClick={handleOpenTrackingLink}
            disabled={!canOpenTrackingLink}
            sx={(theme) => ({
              minHeight: theme.spacing(4.5),
              backgroundColor: "transparent",
              color: designSystemColors.neutralBlack,
              border: `1px solid ${alpha(theme.palette.text.secondary, 0.25)}`,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            })}
          >
            Open Tracking Link
          </Button>
        </Box>
      </Box>
    </SummaryCard>
  );
}

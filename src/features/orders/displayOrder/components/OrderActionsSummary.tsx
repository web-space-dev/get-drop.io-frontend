import Button from "@/shared/components/Button";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
import { alpha } from "@mui/material/styles";
import { SummaryCard } from "./SummaryCard";
import { SummaryCardTitle } from "./SummaryCardTitle";

type OrderActionsSummaryProps = {
  onOpenEditOrder: () => void;
  onOpenDelete: () => void;
  onMarkAsCompleted: () => void;
  onToggleArchive: () => void;
  isMarkingAsCompleted?: boolean;
  isArchiving?: boolean;
  isCompleted?: boolean;
  isArchived?: boolean;
};

export default function OrderActionsSummary({
  onOpenEditOrder,
  onOpenDelete,
  onMarkAsCompleted,
  onToggleArchive,
  isMarkingAsCompleted = false,
  isArchiving = false,
  isCompleted = false,
  isArchived = false,
}: OrderActionsSummaryProps) {
  return (
    <SummaryCard elevation={0}>
      <SummaryCardTitle>Order Actions</SummaryCardTitle>
      <Button
        variant="outlined"
        startIcon={<EditOutlinedIcon fontSize="small" />}
        onClick={onOpenEditOrder}
        sx={(theme) => ({
          minHeight: theme.spacing(4.5),
          justifyContent: "flex-start",
          paddingLeft: theme.spacing(1.5),
          backgroundColor: "transparent",
          color: theme.palette.text.primary,
          border: `1px solid ${alpha(theme.palette.text.secondary, 0.25)}`,
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        })}
      >
        Edit Order
      </Button>
      <Button
        variant="outlined"
        startIcon={<CheckRoundedIcon fontSize="small" />}
        onClick={onMarkAsCompleted}
        disabled={isMarkingAsCompleted || isCompleted}
        sx={(theme) => ({
          minHeight: theme.spacing(4.5),
          justifyContent: "flex-start",
          paddingLeft: theme.spacing(1.5),
          backgroundColor: "transparent",
          color: theme.palette.text.primary,
          border: `1px solid ${alpha(theme.palette.text.secondary, 0.25)}`,
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
          "&.Mui-disabled": {
            color: theme.palette.text.secondary,
            border: `1px solid ${alpha(theme.palette.text.secondary, 0.2)}`,
            backgroundColor: alpha(theme.palette.action.disabled, 0.15),
            cursor: "not-allowed",
            pointerEvents: "none",
          },
        })}
      >
        {isMarkingAsCompleted
          ? "Updating..."
          : isCompleted
            ? "Completed"
            : "Mark as Completed"}
      </Button>
      <Button
        variant="outlined"
        startIcon={
          isArchived ? (
            <UnarchiveOutlinedIcon fontSize="small" />
          ) : (
            <ArchiveOutlinedIcon fontSize="small" />
          )
        }
        onClick={onToggleArchive}
        disabled={isArchiving}
        sx={(theme) => ({
          minHeight: theme.spacing(4.5),
          justifyContent: "flex-start",
          paddingLeft: theme.spacing(1.5),
          backgroundColor: "transparent",
          color: theme.palette.text.primary,
          border: `1px solid ${alpha(theme.palette.text.secondary, 0.25)}`,
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        })}
      >
        {isArchiving ? "Updating..." : isArchived ? "Unarchive" : "Archive"}
      </Button>
      <Button
        onClick={onOpenDelete}
        sx={(theme) => ({
          minHeight: theme.spacing(4.5),
          backgroundColor: theme.palette.error.main,
          color: theme.palette.common.white,
          "&:hover": {
            backgroundColor: theme.palette.error.main,
          },
        })}
      >
        Delete Order
      </Button>
    </SummaryCard>
  );
}

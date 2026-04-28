import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { alpha } from "@mui/material/styles";
import Button from "@/shared/components/Button";
import { SummaryCard } from "./SummaryCard";
import { SummaryCardTitle } from "./SummaryCardTitle";

type OrderActionsSummaryProps = {
  onOpenEditOrder: () => void;
  onOpenDelete: () => void;
};

export default function OrderActionsSummary({
  onOpenEditOrder,
  onOpenDelete,
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
        Mark as Completed
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

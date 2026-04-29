import { designSystemColors } from "@/config/theme";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

type OrderArchiveToggleButtonProps = {
  orderId: string;
  isArchived: boolean;
  isBusy?: boolean;
  onArchiveOrder?: (orderId: string) => void;
  onUnarchiveOrder?: (orderId: string) => void;
};

export default function OrderArchiveToggleButton({
  orderId,
  isArchived,
  isBusy = false,
  onArchiveOrder,
  onUnarchiveOrder,
}: OrderArchiveToggleButtonProps) {
  return (
    <Tooltip title={isArchived ? "Unarchive order" : "Archive order"}>
      <span>
        <IconButton
          size="small"
          sx={{ color: designSystemColors.neutralBlack }}
          aria-label={isArchived ? "Unarchive order" : "Archive order"}
          onClick={() => {
            if (isArchived) {
              onUnarchiveOrder?.(orderId);
              return;
            }

            onArchiveOrder?.(orderId);
          }}
          disabled={isBusy}
        >
          {isArchived ? (
            <UnarchiveOutlinedIcon fontSize="small" />
          ) : (
            <ArchiveOutlinedIcon fontSize="small" />
          )}
        </IconButton>
      </span>
    </Tooltip>
  );
}

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { alpha } from "@mui/material/styles";
import Button from "@/shared/components/Button";
import { type DeleteOrderDialogProps } from "@/features/orders/displayOrder/types";

export default function DeleteOrderDialog({
  deleteError,
  isDeleting,
  onClose,
  onConfirmDelete,
  open,
  orderName,
}: DeleteOrderDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: "100%",
            maxWidth: 560,
            borderRadius: 1.5,
          },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Typography variant="h6" sx={{ m: 0, px: 2.5, pt: 2.5, pb: 1 }}>
          Delete Order
        </Typography>
        <IconButton
          size="small"
          onClick={onClose}
          aria-label="Close"
          sx={{ marginRight: 2, marginTop: 2 }}
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent
        sx={{
          display: "grid",
          gap: 1.5,
          px: 2.5,
          py: 2,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "32px minmax(0, 1fr)",
            gap: 1.5,
            alignItems: "start",
            py: 0.5,
          }}
        >
          <Box
            sx={(theme) => ({
              width: 28,
              height: 28,
              borderRadius: "50%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: alpha(theme.palette.error.main, 0.12),
              color: theme.palette.error.main,
            })}
          >
            <WarningAmberRoundedIcon fontSize="small" />
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.primary">
              Delete this order?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This will permanently remove the order and its tracking history.
              This action cannot be undone.
            </Typography>
            <Typography variant="caption" color="text.primary" sx={{ mt: 0.5 }}>
              Order: {orderName}
            </Typography>
          </Box>
        </Box>

        {deleteError ? <Alert severity="error">{deleteError}</Alert> : null}
      </DialogContent>

      <DialogActions
        sx={{
          px: 2.5,
          pt: 1.5,
          pb: 2,
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={isDeleting}
          sx={(theme) => ({
            minHeight: theme.spacing(4.5),
            backgroundColor: "transparent",
            color: theme.palette.text.primary,
            border: `1px solid ${theme.palette.text.secondary}40`,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          })}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirmDelete}
          disabled={isDeleting}
          sx={(theme) => ({
            minHeight: theme.spacing(4.5),
            backgroundColor: theme.palette.error.main,
            color: theme.palette.common.white,
            "&:hover": {
              backgroundColor: theme.palette.error.main,
            },
          })}
        >
          {isDeleting ? "Deleting..." : "Delete Order"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import {
  DeleteDialog,
  DeleteDialogActions,
  DeleteDialogBody,
  DeleteIconWrap,
  DeleteOrderName,
  DeleteText,
  DeleteTitle,
  EditDialogContent,
  EditDialogTitleRow,
  EditTitle,
  GhostButton,
  DangerButton,
} from "../styles";
import { type DeleteOrderDialogProps } from "../types";

export default function DeleteOrderDialog({
  deleteError,
  isDeleting,
  onClose,
  onConfirmDelete,
  open,
  orderName,
}: DeleteOrderDialogProps) {
  return (
    <DeleteDialog open={open} onClose={onClose}>
      <EditDialogTitleRow>
        <EditTitle>Delete Order</EditTitle>
        <IconButton
          size="small"
          onClick={onClose}
          aria-label="Close"
          sx={{ marginRight: 2, marginTop: 2 }}
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </EditDialogTitleRow>

      <EditDialogContent>
        <DeleteDialogBody>
          <DeleteIconWrap>
            <WarningAmberRoundedIcon fontSize="small" />
          </DeleteIconWrap>

          <div>
            <DeleteTitle>Delete this order?</DeleteTitle>
            <DeleteText>
              This will permanently remove the order and its tracking history.
              This action cannot be undone.
            </DeleteText>
            <DeleteOrderName>Order: {orderName}</DeleteOrderName>
          </div>
        </DeleteDialogBody>

        {deleteError ? <Alert severity="error">{deleteError}</Alert> : null}
      </EditDialogContent>

      <DeleteDialogActions>
        <GhostButton variant="outlined" onClick={onClose} disabled={isDeleting}>
          Cancel
        </GhostButton>
        <DangerButton onClick={onConfirmDelete} disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "Delete Order"}
        </DangerButton>
      </DeleteDialogActions>
    </DeleteDialog>
  );
}

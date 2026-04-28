import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Button from "@/shared/components/Button";
import InputField from "@/shared/components/InputField";
import { designSystemColors } from "@/config/theme";
import {
  type BuyerForm,
  type EditBuyerDialogProps,
} from "@/features/orders/displayOrder/types";

const handleFieldChange = (
  field: keyof BuyerForm,
  value: string,
  onBuyerFieldChange: (field: keyof BuyerForm, value: string) => void,
) => {
  onBuyerFieldChange(field, value);
};

export default function EditBuyerDialog({
  isSaving,
  open,
  buyerForm,
  onBuyerFieldChange,
  onSaveBuyerChanges,
  saveError,
  onClose,
}: EditBuyerDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={isSaving ? undefined : onClose}
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
          Edit Buyer Information
        </Typography>
        <IconButton
          size="small"
          onClick={onClose}
          disabled={isSaving}
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
        <InputField
          label="Buyer Name"
          value={buyerForm.buyerName}
          disabled={isSaving}
          onChange={(event) =>
            handleFieldChange(
              "buyerName",
              event.target.value,
              onBuyerFieldChange,
            )
          }
        />
        <InputField
          label="Buyer Email"
          value={buyerForm.buyerEmail}
          disabled={isSaving}
          onChange={(event) =>
            handleFieldChange(
              "buyerEmail",
              event.target.value,
              onBuyerFieldChange,
            )
          }
        />
        <InputField
          label="Buyer Phone Number"
          value={buyerForm.buyerPhone}
          disabled={isSaving}
          onChange={(event) =>
            handleFieldChange(
              "buyerPhone",
              event.target.value,
              onBuyerFieldChange,
            )
          }
        />

        <Typography variant="caption" color="text.secondary">
          These details are stored only for message delivery. You may delete
          them at any time.
        </Typography>

        {saveError ? <Alert severity="error">{saveError}</Alert> : null}
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
          disabled={isSaving}
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
          onClick={onSaveBuyerChanges}
          disabled={isSaving}
          sx={{
            minHeight: 4.5,
            backgroundColor: designSystemColors.neutralBlack,
            color: "common.white",
            "&:hover": {
              backgroundColor: designSystemColors.neutralBlack,
            },
          }}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import InputField from "@/components/ui/InputField";
import {
  EditDialog,
  EditDialogActions,
  EditDialogContent,
  EditDialogTitleRow,
  EditSubText,
  EditTitle,
  GhostButton,
  PrimaryButton,
} from "../styles";
import { type BuyerForm, type EditBuyerDialogProps } from "../types";

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
    <EditDialog open={open} onClose={isSaving ? undefined : onClose}>
      <EditDialogTitleRow>
        <EditTitle>Edit Buyer Information</EditTitle>
        <IconButton
          size="small"
          onClick={onClose}
          disabled={isSaving}
          aria-label="Close"
          sx={{ marginRight: 2, marginTop: 2 }}
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </EditDialogTitleRow>

      <EditDialogContent>
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

        <EditSubText>
          These details are stored only for message delivery. You may delete
          them at any time.
        </EditSubText>

        {saveError ? <Alert severity="error">{saveError}</Alert> : null}
      </EditDialogContent>

      <EditDialogActions>
        <GhostButton variant="outlined" onClick={onClose} disabled={isSaving}>
          Cancel
        </GhostButton>
        <PrimaryButton onClick={onSaveBuyerChanges} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </PrimaryButton>
      </EditDialogActions>
    </EditDialog>
  );
}

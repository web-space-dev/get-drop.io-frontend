import { designSystemColors } from "@/config/theme";
import {
  INVALID_EMAIL_MESSAGE,
  isValidEmail,
} from "@/features/auth/utils/helpers";
import { type BuyerForm } from "@/features/orders/displayOrder/types";
import Button from "@/shared/components/Button";
import InputField from "@/shared/components/InputField";
import { useFieldKeyboardNavigation } from "@/shared/hooks/useFieldKeyboardNavigation";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

type EditBuyerDialogProps = {
  open: boolean;
  buyerForm: BuyerForm;
  onClose: () => void;
  onBuyerFieldChange: (field: keyof BuyerForm, value: string) => void;
  onSaveBuyerChanges: () => void;
  isSaving: boolean;
  saveError: string | null;
};

type NavigableField =
  | "buyerName"
  | "buyerEmail"
  | "buyerPhone"
  | "streetAddress"
  | "addressLocality"
  | "postalCode"
  | "addressCountry";

const FIELD_ORDER: NavigableField[] = [
  "buyerName",
  "buyerEmail",
  "buyerPhone",
  "streetAddress",
  "addressLocality",
  "postalCode",
  "addressCountry",
];

const FIELD_IDS: Record<NavigableField, string> = {
  buyerName: "edit-buyer-name",
  buyerEmail: "edit-buyer-email",
  buyerPhone: "edit-buyer-phone",
  streetAddress: "edit-buyer-street-address",
  addressLocality: "edit-buyer-address-locality",
  postalCode: "edit-buyer-postal-code",
  addressCountry: "edit-buyer-address-country",
};

function sanitizeBuyerPhoneInput(value: string): string {
  const cleanedValue = value.replace(/[^\d+]/g, "");

  if (!cleanedValue.includes("+")) {
    return cleanedValue;
  }

  const digitsOnly = cleanedValue.replace(/\+/g, "");
  return `+${digitsOnly}`;
}

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
  const normalizedBuyerEmail = buyerForm.buyerEmail.trim();
  const hasInvalidBuyerEmail =
    normalizedBuyerEmail.length > 0 && !isValidEmail(normalizedBuyerEmail);

  const { getFieldKeyDownHandler } = useFieldKeyboardNavigation<NavigableField>(
    {
      fieldOrder: FIELD_ORDER,
      fieldIds: FIELD_IDS,
    },
  );

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
          id={FIELD_IDS.buyerName}
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
          onKeyDown={getFieldKeyDownHandler("buyerName")}
        />
        <InputField
          id={FIELD_IDS.buyerEmail}
          label="Buyer Email"
          type="email"
          value={buyerForm.buyerEmail}
          error={hasInvalidBuyerEmail}
          helperText={hasInvalidBuyerEmail ? INVALID_EMAIL_MESSAGE : " "}
          disabled={isSaving}
          onChange={(event) =>
            handleFieldChange(
              "buyerEmail",
              event.target.value,
              onBuyerFieldChange,
            )
          }
          onKeyDown={getFieldKeyDownHandler("buyerEmail")}
        />
        <InputField
          id={FIELD_IDS.buyerPhone}
          label="Buyer Phone Number"
          type="tel"
          value={buyerForm.buyerPhone}
          disabled={isSaving}
          onChange={(event) =>
            handleFieldChange(
              "buyerPhone",
              sanitizeBuyerPhoneInput(event.target.value),
              onBuyerFieldChange,
            )
          }
          onKeyDown={getFieldKeyDownHandler("buyerPhone")}
        />

        <InputField
          id={FIELD_IDS.streetAddress}
          label="Street Address"
          value={buyerForm.streetAddress}
          disabled={isSaving}
          onChange={(event) =>
            handleFieldChange(
              "streetAddress",
              event.target.value,
              onBuyerFieldChange,
            )
          }
          onKeyDown={getFieldKeyDownHandler("streetAddress")}
        />
        <InputField
          id={FIELD_IDS.addressLocality}
          label="Locality"
          value={buyerForm.addressLocality}
          disabled={isSaving}
          onChange={(event) =>
            handleFieldChange(
              "addressLocality",
              event.target.value,
              onBuyerFieldChange,
            )
          }
          onKeyDown={getFieldKeyDownHandler("addressLocality")}
        />
        <InputField
          id={FIELD_IDS.postalCode}
          label="Postal Code"
          value={buyerForm.postalCode}
          disabled={isSaving}
          onChange={(event) =>
            handleFieldChange(
              "postalCode",
              event.target.value,
              onBuyerFieldChange,
            )
          }
          onKeyDown={getFieldKeyDownHandler("postalCode")}
        />
        <InputField
          id={FIELD_IDS.addressCountry}
          label="Country"
          value={buyerForm.addressCountry}
          disabled={isSaving}
          onChange={(event) =>
            handleFieldChange(
              "addressCountry",
              event.target.value,
              onBuyerFieldChange,
            )
          }
          onKeyDown={getFieldKeyDownHandler("addressCountry")}
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
          disabled={isSaving || hasInvalidBuyerEmail}
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

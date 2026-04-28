import { designSystemColors } from "@/config/theme";
import {
  type FormState,
  type OnFieldChange,
  type StepOneFieldErrors,
} from "@/features/orders/addOrder/types";
import InputField from "@/shared/components/InputField";
import InputTitle from "@/shared/components/InputTitle";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { type KeyboardEvent } from "react";
import OrderTypeToggle from "./OrderTypeToggle";

type AddOrderStepOneProps = {
  form: FormState;
  fieldErrors: StepOneFieldErrors;
  onFieldChange: OnFieldChange;
};

type NavigableField =
  | "orderName"
  | "courier"
  | "trackingNumber"
  | "buyerName"
  | "buyerEmail"
  | "buyerPhone";

const FIELD_ORDER: NavigableField[] = [
  "orderName",
  "courier",
  "trackingNumber",
  "buyerName",
  "buyerEmail",
  "buyerPhone",
];

const FIELD_IDS: Record<NavigableField, string> = {
  orderName: "add-order-order-name",
  courier: "add-order-courier",
  trackingNumber: "add-order-tracking-number",
  buyerName: "add-order-buyer-name",
  buyerEmail: "add-order-buyer-email",
  buyerPhone: "add-order-buyer-phone",
};

const FieldWrapper = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(1),
}));

const courierOptions = ["Royal Mail", "Evri", "DPD", "Yodel"] as const;

function focusField(field: NavigableField): void {
  const target = document.getElementById(FIELD_IDS[field]);
  if (target instanceof HTMLElement) {
    target.focus();
  }
}

function handleFieldKeyDown(
  field: NavigableField,
): (event: KeyboardEvent<HTMLDivElement>) => void {
  return (event) => {
    const currentIndex = FIELD_ORDER.indexOf(field);
    if (currentIndex < 0) {
      return;
    }

    // Let courier select keep native arrow behavior; Enter advances to next field.
    if (field === "courier" && event.key !== "Enter") {
      return;
    }

    if (event.key === "Enter" || event.key === "ArrowDown") {
      const nextField = FIELD_ORDER[currentIndex + 1];
      if (!nextField) {
        return;
      }

      event.preventDefault();
      focusField(nextField);
      return;
    }

    if (event.key === "ArrowUp") {
      const previousField = FIELD_ORDER[currentIndex - 1];
      if (!previousField) {
        return;
      }

      event.preventDefault();
      focusField(previousField);
    }
  };
}

export default function AddOrderStepOne({
  form,
  fieldErrors,
  onFieldChange,
}: AddOrderStepOneProps) {
  return (
    <Box component="section" sx={{ display: "grid", gap: 2.25 }}>
      <FieldWrapper>
        <InputTitle>Order Name</InputTitle>
        <InputField
          id={FIELD_IDS.orderName}
          placeholder="Nike Dunk Panda - Sarah Kennedy"
          value={form.orderName}
          error={Boolean(fieldErrors.orderName)}
          helperText={fieldErrors.orderName ?? " "}
          onChange={(event) => onFieldChange("orderName", event.target.value)}
          onKeyDown={handleFieldKeyDown("orderName")}
        />
      </FieldWrapper>

      <FieldWrapper>
        <InputTitle>Order Type</InputTitle>
        <OrderTypeToggle
          value={form.direction}
          onChange={(value) => onFieldChange("direction", value)}
        />
      </FieldWrapper>

      <FieldWrapper>
        <InputTitle>Courier</InputTitle>
        <InputField
          id={FIELD_IDS.courier}
          select
          value={form.courier}
          error={Boolean(fieldErrors.courier)}
          helperText={fieldErrors.courier ?? " "}
          onChange={(event) => onFieldChange("courier", event.target.value)}
          onKeyDown={handleFieldKeyDown("courier")}
        >
          <MenuItem value="" disabled>
            Select courier
          </MenuItem>
          {courierOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </InputField>
      </FieldWrapper>

      <FieldWrapper>
        <InputField
          id={FIELD_IDS.trackingNumber}
          placeholder="AB123456789IE"
          value={form.trackingNumber}
          error={Boolean(fieldErrors.trackingNumber)}
          helperText={fieldErrors.trackingNumber ?? " "}
          onChange={(event) =>
            onFieldChange("trackingNumber", event.target.value)
          }
          onKeyDown={handleFieldKeyDown("trackingNumber")}
        />
      </FieldWrapper>

      <Box
        component="section"
        sx={(theme) => ({
          display: "grid",
          gap: 2,
          mt: 1,
          pt: 3,
          borderTop: `1px solid ${theme.palette.divider}`,
        })}
      >
        <Box>
          <InputTitle>Buyer Details (Optional)</InputTitle>
          <Typography
            variant="body1"
            sx={{ color: designSystemColors.neutralMeta }}
          >
            Phone number optional - only required if you want to send SMS or
            WhatsApp updates.
          </Typography>
        </Box>

        <FieldWrapper>
          <InputTitle>Buyer Name</InputTitle>
          <InputField
            id={FIELD_IDS.buyerName}
            placeholder="Optional"
            value={form.buyerName}
            onChange={(event) => onFieldChange("buyerName", event.target.value)}
            onKeyDown={handleFieldKeyDown("buyerName")}
          />
        </FieldWrapper>

        <FieldWrapper>
          <InputTitle>Buyer Email</InputTitle>
          <InputField
            id={FIELD_IDS.buyerEmail}
            type="email"
            placeholder="Optional"
            value={form.buyerEmail}
            onChange={(event) =>
              onFieldChange("buyerEmail", event.target.value)
            }
            onKeyDown={handleFieldKeyDown("buyerEmail")}
          />
        </FieldWrapper>

        <FieldWrapper>
          <InputTitle>Buyer Phone Number</InputTitle>
          <InputField
            id={FIELD_IDS.buyerPhone}
            placeholder="Optional"
            value={form.buyerPhone}
            onChange={(event) =>
              onFieldChange("buyerPhone", event.target.value)
            }
            onKeyDown={handleFieldKeyDown("buyerPhone")}
          />
        </FieldWrapper>
      </Box>
    </Box>
  );
}

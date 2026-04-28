import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { designSystemColors } from "@/config/theme";
import {
  type FormState,
  type OnFieldChange,
  type StepOneFieldErrors,
} from "@/features/orders/addOrder/types";
import InputField from "@/shared/components/InputField";
import InputTitle from "@/shared/components/InputTitle";
import OrderTypeToggle from "./OrderTypeToggle";

type AddOrderStepOneProps = {
  form: FormState;
  fieldErrors: StepOneFieldErrors;
  onFieldChange: OnFieldChange;
};

const FieldWrapper = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(1),
}));

const courierOptions = ["Royal Mail", "Evri", "DPD", "Yodel"] as const;

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
          placeholder="Nike Dunk Panda - Sarah Kennedy"
          value={form.orderName}
          error={Boolean(fieldErrors.orderName)}
          helperText={fieldErrors.orderName ?? " "}
          onChange={(event) => onFieldChange("orderName", event.target.value)}
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
          select
          value={form.courier}
          error={Boolean(fieldErrors.courier)}
          helperText={fieldErrors.courier ?? " "}
          onChange={(event) => onFieldChange("courier", event.target.value)}
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
        <InputTitle>Tracking Number</InputTitle>
        <InputField
          placeholder="AB123456789IE"
          value={form.trackingNumber}
          error={Boolean(fieldErrors.trackingNumber)}
          helperText={fieldErrors.trackingNumber ?? " "}
          onChange={(event) =>
            onFieldChange("trackingNumber", event.target.value)
          }
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
            placeholder="Optional"
            value={form.buyerName}
            onChange={(event) => onFieldChange("buyerName", event.target.value)}
          />
        </FieldWrapper>

        <FieldWrapper>
          <InputTitle>Buyer Email</InputTitle>
          <InputField
            type="email"
            placeholder="Optional"
            value={form.buyerEmail}
            onChange={(event) =>
              onFieldChange("buyerEmail", event.target.value)
            }
          />
        </FieldWrapper>

        <FieldWrapper>
          <InputTitle>Buyer Phone Number</InputTitle>
          <InputField
            placeholder="Optional"
            value={form.buyerPhone}
            onChange={(event) =>
              onFieldChange("buyerPhone", event.target.value)
            }
          />
        </FieldWrapper>
      </Box>
    </Box>
  );
}

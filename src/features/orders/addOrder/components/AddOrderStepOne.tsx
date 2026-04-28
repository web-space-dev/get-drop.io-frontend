import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import { designSystemColors } from "@/config/theme";
import { courierOptions } from "@/features/orders/addOrder/utils/constants";
import OrderTypeToggle from "./OrderTypeToggle";
import {
  type FormState,
  type OnFieldChange,
} from "@/features/orders/addOrder/types";
import InputField from "@/shared/components/InputField";
const fieldInputSx = {
  "& .MuiInputBase-root": {
    backgroundColor: "action.hover",
    borderRadius: 1.5,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "text.secondary",
    borderWidth: 1,
  },
  "& .MuiInputBase-input::placeholder": {
    color: "text.secondary",
    opacity: 1,
  },
} as const;

type AddOrderStepOneProps = {
  form: FormState;
  onFieldChange: OnFieldChange;
};

export default function AddOrderStepOne({
  form,
  onFieldChange,
}: AddOrderStepOneProps) {
  return (
    <Box component="section" sx={{ display: "grid", gap: 2.25 }}>
      <Box sx={{ display: "grid", gap: 1 }}>
        <Typography
          variant="subtitle2"
          sx={{ color: designSystemColors.neutralBlack }}
        >
          Order Name
        </Typography>
        <InputField
          placeholder="Nike Dunk Panda - Sarah Kennedy"
          value={form.orderName}
          onChange={(event) => onFieldChange("orderName", event.target.value)}
          sx={fieldInputSx}
        />
      </Box>

      <Box sx={{ display: "grid", gap: 1 }}>
        <Typography
          variant="subtitle2"
          sx={{ color: designSystemColors.neutralBlack }}
        >
          Order Type
        </Typography>
        <OrderTypeToggle
          value={form.direction}
          onChange={(value) => onFieldChange("direction", value)}
        />
      </Box>

      <Box sx={{ display: "grid", gap: 1 }}>
        <Typography
          variant="subtitle2"
          sx={{ color: designSystemColors.neutralBlack }}
        >
          Courier
        </Typography>
        <InputField
          select
          value={form.courier}
          onChange={(event) => onFieldChange("courier", event.target.value)}
          sx={fieldInputSx}
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
      </Box>

      <Box sx={{ display: "grid", gap: 1 }}>
        <Typography
          variant="subtitle2"
          sx={{ color: designSystemColors.neutralBlack }}
        >
          Tracking Number
        </Typography>
        <InputField
          placeholder="AB123456789IE"
          value={form.trackingNumber}
          onChange={(event) =>
            onFieldChange("trackingNumber", event.target.value)
          }
          sx={fieldInputSx}
        />
      </Box>

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
          <Typography
            variant="subtitle2"
            sx={{ color: designSystemColors.neutralBlack }}
          >
            Buyer Details (Optional)
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Phone number optional - only required if you want to send SMS or
            WhatsApp updates.
          </Typography>
        </Box>

        <Box sx={{ display: "grid", gap: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{ color: designSystemColors.neutralBlack }}
          >
            Buyer Name
          </Typography>
          <InputField
            placeholder="Optional"
            value={form.buyerName}
            onChange={(event) => onFieldChange("buyerName", event.target.value)}
            sx={fieldInputSx}
          />
        </Box>

        <Box sx={{ display: "grid", gap: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{ color: designSystemColors.neutralBlack }}
          >
            Buyer Email
          </Typography>
          <InputField
            type="email"
            placeholder="Optional"
            value={form.buyerEmail}
            onChange={(event) =>
              onFieldChange("buyerEmail", event.target.value)
            }
            sx={fieldInputSx}
          />
        </Box>

        <Box sx={{ display: "grid", gap: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{ color: designSystemColors.neutralBlack }}
          >
            Buyer Phone Number
          </Typography>
          <InputField
            placeholder="Optional"
            value={form.buyerPhone}
            onChange={(event) =>
              onFieldChange("buyerPhone", event.target.value)
            }
            sx={fieldInputSx}
          />
        </Box>
      </Box>
    </Box>
  );
}

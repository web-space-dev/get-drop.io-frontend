import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { courierOptions } from "../utils/constants";
import OrderTypeToggle from "./OrderTypeToggle";
import { type FormState, type OnFieldChange } from "../types";
import {
  ContentLayout,
  FieldBlock,
  FieldInput,
  FieldLabel,
  OptionalDescription,
  OptionalSection,
} from "../styles";

type AddOrderStepOneProps = {
  form: FormState;
  onFieldChange: OnFieldChange;
};

export default function AddOrderStepOne({
  form,
  onFieldChange,
}: AddOrderStepOneProps) {
  return (
    <ContentLayout>
      <FieldBlock>
        <FieldLabel>Order Name</FieldLabel>
        <FieldInput
          placeholder="Nike Dunk Panda - Sarah Kennedy"
          value={form.orderName}
          onChange={(event) => onFieldChange("orderName", event.target.value)}
        />
      </FieldBlock>

      <FieldBlock>
        <FieldLabel>Order Type</FieldLabel>
        <OrderTypeToggle
          value={form.direction}
          onChange={(value) => onFieldChange("direction", value)}
        />
      </FieldBlock>

      <FieldBlock>
        <FieldLabel>Courier</FieldLabel>
        <FieldInput
          select
          value={form.courier}
          onChange={(event) => onFieldChange("courier", event.target.value)}
          SelectProps={{
            displayEmpty: true,
            renderValue: (value) => (value ? String(value) : "Select courier"),
          }}
        >
          <MenuItem value="" disabled>
            Select courier
          </MenuItem>
          {courierOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </FieldInput>
      </FieldBlock>

      <FieldBlock>
        <FieldLabel>Tracking Number</FieldLabel>
        <FieldInput
          placeholder="AB123456789IE"
          value={form.trackingNumber}
          onChange={(event) =>
            onFieldChange("trackingNumber", event.target.value)
          }
        />
      </FieldBlock>

      <OptionalSection>
        <Box>
          <FieldLabel>Buyer Details (Optional)</FieldLabel>
          <OptionalDescription>
            Phone number optional - only required if you want to send SMS or
            WhatsApp updates.
          </OptionalDescription>
        </Box>

        <FieldBlock>
          <FieldLabel>Buyer Name</FieldLabel>
          <FieldInput
            placeholder="Optional"
            value={form.buyerName}
            onChange={(event) => onFieldChange("buyerName", event.target.value)}
          />
        </FieldBlock>

        <FieldBlock>
          <FieldLabel>Buyer Email</FieldLabel>
          <FieldInput
            type="email"
            placeholder="Optional"
            value={form.buyerEmail}
            onChange={(event) =>
              onFieldChange("buyerEmail", event.target.value)
            }
          />
        </FieldBlock>

        <FieldBlock>
          <FieldLabel>Buyer Phone Number</FieldLabel>
          <FieldInput
            placeholder="Optional"
            value={form.buyerPhone}
            onChange={(event) =>
              onFieldChange("buyerPhone", event.target.value)
            }
          />
        </FieldBlock>
      </OptionalSection>
    </ContentLayout>
  );
}

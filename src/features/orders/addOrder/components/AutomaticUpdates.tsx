import { designSystemColors } from "@/config/theme";
import { type FormState } from "@/features/orders/addOrder/types";
import InputTitle from "@/shared/components/InputTitle";
import IOSSwitch from "@/shared/components/IOSSwitch";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

type AutomaticUpdatesProps = {
  form: FormState;
  errorMessage?: string;
  onAutomaticUpdateChange: (
    key: keyof FormState["automaticUpdates"],
    value: boolean,
  ) => void;
};

const AutomaticUpdateCard = styled(Box)(() => ({
  border: `1px solid ${designSystemColors.neutralBlackAlpha10}`,
  borderRadius: 2,
  padding: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 2,
}));

export default function AutomaticUpdates({
  form,
  errorMessage,
  onAutomaticUpdateChange,
}: AutomaticUpdatesProps) {
  return (
    <>
      <Divider sx={{ borderColor: designSystemColors.neutralBlackAlpha10 }} />
      <InputTitle>Automatic Updates</InputTitle>
      <Stack spacing={1.5}>
        <AutomaticUpdateCard>
          <Box sx={{ display: "grid", gap: 0.25 }}>
            <InputTitle>Order Sent</InputTitle>
            <Typography
              variant="body1"
              sx={{ color: designSystemColors.neutralMeta }}
            >
              Will send via selected channel
            </Typography>
          </Box>

          <IOSSwitch
            checked={form.automaticUpdates.orderSent}
            onChange={(event) =>
              onAutomaticUpdateChange("orderSent", event.target.checked)
            }
          />
        </AutomaticUpdateCard>

        <AutomaticUpdateCard sx={{ borderRadius: 1.5 }}>
          <Box sx={{ display: "grid", gap: 0.25 }}>
            <InputTitle>ETA: 3 Days Remaining</InputTitle>
            <Typography
              variant="body1"
              sx={{ color: designSystemColors.neutralMeta }}
            >
              Will send via selected channel
            </Typography>
          </Box>

          <IOSSwitch
            checked={form.automaticUpdates.eta}
            onChange={(event) =>
              onAutomaticUpdateChange("eta", event.target.checked)
            }
          />
        </AutomaticUpdateCard>
      </Stack>
      {errorMessage ? (
        <Typography variant="body2" color="error">
          {errorMessage}
        </Typography>
      ) : null}
    </>
  );
}

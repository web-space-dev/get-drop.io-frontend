import { designSystemColors } from "@/config/theme";
import AutomaticUpdates from "@/features/orders/addOrder/components/AutomaticUpdates";
import NotificationChannelSection from "@/features/orders/addOrder/components/NotificationChannel";
import {
  type FormState,
  type NotificationChannel,
  type StepTwoSectionErrors,
} from "@/features/orders/addOrder/types";
import InputTitle from "@/shared/components/InputTitle";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type AddOrderStepTwoProps = {
  form: FormState;
  sectionErrors: StepTwoSectionErrors;
  onToggleChannel: (channel: NotificationChannel) => void;
  onAutomaticUpdateChange: (
    key: keyof FormState["automaticUpdates"],
    value: boolean,
  ) => void;
};

export default function AddOrderStepTwo({
  form,
  sectionErrors,
  onToggleChannel,
  onAutomaticUpdateChange,
}: AddOrderStepTwoProps) {
  return (
    <Box component="section" sx={{ display: "grid", gap: 2.25 }}>
      <Typography
        variant="body1"
        sx={{ color: designSystemColors.neutralMeta }}
      >
        Select how you want Drop to notify your buyer. All fields are optional.
        You can skip updates entirely.
      </Typography>

      <InputTitle>Notification Channel</InputTitle>

      <NotificationChannelSection
        channels={form.channels}
        onToggleChannel={onToggleChannel}
      />
      {sectionErrors.channels ? (
        <Typography variant="body2" color="error">
          {sectionErrors.channels}
        </Typography>
      ) : null}

      <AutomaticUpdates
        form={form}
        errorMessage={sectionErrors.automaticUpdates}
        onAutomaticUpdateChange={onAutomaticUpdateChange}
      />
    </Box>
  );
}

import { designSystemColors } from "@/config/theme";
import {
  type FormState,
  type NotificationChannel,
  type StepTwoSectionErrors,
} from "@/features/orders/addOrder/types";
import InputTitle from "@/shared/components/InputTitle";
import IOSSwitch from "@/shared/components/IOSSwitch";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { type ElementType } from "react";

type AddOrderStepTwoProps = {
  form: FormState;
  sectionErrors: StepTwoSectionErrors;
  onToggleChannel: (channel: NotificationChannel) => void;
  onAutomaticUpdateChange: (
    key: keyof FormState["automaticUpdates"],
    value: boolean,
  ) => void;
};

const channelOptions: Array<{
  value: NotificationChannel;
  label: string;
  icon: ElementType;
  usesCredits: boolean;
}> = [
  {
    value: "email",
    label: "Email",
    icon: EmailOutlinedIcon,
    usesCredits: false,
  },
  {
    value: "whatsapp",
    label: "WhatsApp",
    icon: WhatsAppIcon,
    usesCredits: true,
  },
  {
    value: "sms",
    label: "SMS",
    icon: MessageOutlinedIcon,
    usesCredits: true,
  },
];

export default function AddOrderStepTwo({
  form,
  sectionErrors,
  onToggleChannel,
  onAutomaticUpdateChange,
}: AddOrderStepTwoProps) {
  const creditChipSx = {
    backgroundColor: "rgba(255, 127, 0, 0.16)",
    color: "rgb(217, 95, 2)",
    fontWeight: 600,
  };

  const freeChipSx = {
    backgroundColor: "rgba(0, 168, 84, 0.16)",
    color: "rgb(0, 128, 64)",
    fontWeight: 600,
  };

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

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 2 }}>
        {channelOptions.map((channel) => {
          const Icon = channel.icon;
          const isSelected = form.channels.includes(channel.value);
          const description = channel.usesCredits
            ? "1 credit per update"
            : "Included for all users";

          return (
            <Box
              key={channel.value}
              component="button"
              type="button"
              onClick={() => onToggleChannel(channel.value)}
              sx={(theme) => ({
                border: `2px solid ${isSelected ? designSystemColors.neutralBlack : designSystemColors.neutralBlackAlpha10}`,
                backgroundColor: theme.palette.background.paper,
                borderRadius: 2,
                cursor: "pointer",
                color: theme.palette.text.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                textAlign: "left",
                p: 2,
                transition:
                  "border-color 150ms ease, background-color 150ms ease",
              })}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  minWidth: 0,
                }}
              >
                <Box
                  sx={(theme) => ({
                    width: theme.spacing(5.5),
                    height: theme.spacing(5.5),
                    borderRadius: 1,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: isSelected
                      ? designSystemColors.neutralBlack
                      : theme.palette.action.hover,
                    color: isSelected
                      ? theme.palette.common.white
                      : theme.palette.text.primary,
                    flexShrink: 0,
                  })}
                >
                  <Icon fontSize="small" />
                </Box>

                <Box sx={{ display: "grid", gap: 0.25 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography variant="h5">{channel.label}</Typography>
                    {channel.usesCredits ? (
                      <Chip
                        label="Uses credits"
                        size="small"
                        sx={creditChipSx}
                      />
                    ) : (
                      <Chip label="Free" size="small" sx={freeChipSx} />
                    )}
                  </Box>

                  <Typography variant="body1" color="text.secondary">
                    {description}
                  </Typography>
                </Box>
              </Box>

              <Box
                component="span"
                sx={(theme) => ({
                  width: theme.spacing(3),
                  height: theme.spacing(3),
                  borderRadius: "50%",
                  border: `2px solid ${designSystemColors.neutralBlack}`,
                  backgroundColor: isSelected
                    ? designSystemColors.neutralBlack
                    : theme.palette.background.paper,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "&::after": {
                    content: '""',
                    width: theme.spacing(1),
                    height: theme.spacing(1),
                    borderRadius: "50%",
                    backgroundColor: theme.palette.common.white,
                    opacity: isSelected ? 1 : 0,
                  },
                })}
              />
            </Box>
          );
        })}
      </Box>
      {sectionErrors.channels ? (
        <Typography variant="body2" color="error">
          {sectionErrors.channels}
        </Typography>
      ) : null}
      <Divider sx={{ borderColor: designSystemColors.neutralBlackAlpha10 }} />
      <InputTitle>Automatic Updates</InputTitle>

      <Stack spacing={1.5}>
        <Box
          sx={() => ({
            border: `1px solid ${designSystemColors.neutralBlackAlpha10}`,
            borderRadius: 2,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          })}
        >
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
        </Box>

        <Box
          sx={() => ({
            border: `1px solid ${designSystemColors.neutralBlackAlpha10}`,
            borderRadius: 1.5,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          })}
        >
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
        </Box>
      </Stack>
      {sectionErrors.automaticUpdates ? (
        <Typography variant="body2" color="error">
          {sectionErrors.automaticUpdates}
        </Typography>
      ) : null}
    </Box>
  );
}

import { designSystemColors } from "@/config/theme";
import { type NotificationChannel as NotificationChannelType } from "@/features/orders/addOrder/types";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { type ElementType } from "react";

type NotificationChannelProps = {
  channels: NotificationChannelType[];
  onToggleChannel: (channel: NotificationChannelType) => void;
};

const channelOptions: Array<{
  value: NotificationChannelType;
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

const ChannelCard = styled("button", {
  shouldForwardProp: (prop) => prop !== "isSelected",
})<{ isSelected: boolean }>(({ theme, isSelected }) => ({
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
  padding: theme.spacing(2),
  transition: "border-color 150ms ease, background-color 150ms ease",
}));

export default function NotificationChannel({
  channels,
  onToggleChannel,
}: NotificationChannelProps) {
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
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 2 }}>
      {channelOptions.map((channel) => {
        const Icon = channel.icon;
        const isSelected = channels.includes(channel.value);
        const description = channel.usesCredits
          ? "1 credit per update"
          : "Included for all users";

        return (
          <ChannelCard
            key={channel.value}
            type="button"
            isSelected={isSelected}
            onClick={() => onToggleChannel(channel.value)}
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
                    <Chip label="Uses credits" size="small" sx={creditChipSx} />
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
          </ChannelCard>
        );
      })}
    </Box>
  );
}

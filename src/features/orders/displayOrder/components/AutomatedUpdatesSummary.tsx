import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@/shared/components/Button";
import IOSSwitch from "@/shared/components/IOSSwitch";
import InputField from "@/shared/components/InputField";
import { alpha } from "@mui/material/styles";
import { designSystemColors } from "@/config/theme";
import {
  type ChannelOption,
  type UpdateRules,
} from "@/features/orders/displayOrder/types";
import { SummaryCard } from "./SummaryCard";
import { SummaryCardTitle } from "./SummaryCardTitle";

type AutomatedUpdatesSummaryProps = {
  channel: ChannelOption;
  updateRules: UpdateRules;
  onChannelChange: (value: string) => void;
  onRuleChange: (key: keyof UpdateRules, checked: boolean) => void;
};

const updateRuleItems: Array<{ key: keyof UpdateRules; label: string }> = [
  { key: "etaThreeDays", label: "ETA is 3 days" },
  { key: "etaOneDay", label: "ETA is 1 day" },
  { key: "outForDelivery", label: "Out for delivery" },
  { key: "delivered", label: "Delivered" },
];

const channelOptions: Array<{ value: ChannelOption; label: string }> = [
  { value: "whatsapp", label: "WhatsApp (uses credits)" },
  { value: "sms", label: "SMS (uses credits)" },
  { value: "email", label: "Email" },
];

export default function AutomatedUpdatesSummary({
  channel,
  updateRules,
  onChannelChange,
  onRuleChange,
}: AutomatedUpdatesSummaryProps) {
  const sendChannelLabel = channel === "email" ? "Email" : "WhatsApp";

  return (
    <SummaryCard elevation={0}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <SummaryCardTitle>Automated Updates</SummaryCardTitle>
        <IconButton size="small" aria-label="Automated update options">
          <MoreVertRoundedIcon fontSize="small" />
        </IconButton>
      </Box>
      <Typography variant="caption" color="text.secondary">
        Channel
      </Typography>
      <InputField
        select
        value={channel}
        onChange={(event) => onChannelChange(event.target.value)}
        size="small"
      >
        {channelOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </InputField>
      <Typography variant="caption" color="text.secondary">
        Each automated update uses 1 credit.
      </Typography>

      {updateRuleItems.map((item) => (
        <Box
          key={item.key}
          sx={(theme) => ({
            border: `1px solid ${alpha(theme.palette.text.secondary, 0.2)}`,
            borderRadius: 1,
            px: 1,
            py: 0.75,
            display: "flex",
            alignItems: "center",
            gap: 1,
          })}
        >
          <IOSSwitch
            checked={updateRules[item.key]}
            onChange={(event) => onRuleChange(item.key, event.target.checked)}
          />
          <Typography variant="body2" color="text.primary">
            {item.label}
          </Typography>
        </Box>
      ))}

      <Button
        startIcon={<SendRoundedIcon fontSize="small" />}
        sx={{
          minHeight: 4.5,
          backgroundColor: designSystemColors.neutralBlack,
          color: "common.white",
          "&:hover": {
            backgroundColor: designSystemColors.neutralBlack,
          },
        }}
      >
        Send Update Now
      </Button>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ textAlign: "center" }}
      >
        Sends via {sendChannelLabel}.
      </Typography>
    </SummaryCard>
  );
}

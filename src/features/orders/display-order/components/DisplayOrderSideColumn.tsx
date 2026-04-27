import * as React from "react";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import InputField from "@/components/ui/InputField";
import {
  ActionButton,
  AutomatedHint,
  Card,
  CardHeader,
  CardTitle,
  CenteredHint,
  DangerButton,
  MutedLabel,
  PrimaryButton,
  SideColumn,
  UpdateOption,
  UpdateOptionText,
  UpdateSwitch,
} from "../styles";
import { type DisplayOrderSideColumnProps } from "../types";

export default function DisplayOrderSideColumn({
  channel,
  onChannelChange,
  onOpenEditOrder,
  onOpenDelete,
  onRuleChange,
  updateRules,
}: DisplayOrderSideColumnProps) {
  return (
    <SideColumn>
      <Card elevation={0}>
        <CardHeader>
          <CardTitle>Automated Updates</CardTitle>
          <IconButton size="small" aria-label="Automated update options">
            <MoreVertRoundedIcon fontSize="small" />
          </IconButton>
        </CardHeader>
        <MutedLabel>Channel</MutedLabel>
        <InputField
          select
          value={channel}
          onChange={(event) => onChannelChange(event.target.value)}
          size="small"
        >
          <MenuItem value="whatsapp">WhatsApp (uses credits)</MenuItem>
          <MenuItem value="sms">SMS (uses credits)</MenuItem>
          <MenuItem value="email">Email</MenuItem>
        </InputField>
        <AutomatedHint>Each automated update uses 1 credit.</AutomatedHint>

        <UpdateOption>
          <UpdateSwitch
            checked={updateRules.etaThreeDays}
            onChange={(event) =>
              onRuleChange("etaThreeDays", event.target.checked)
            }
          />
          <UpdateOptionText>ETA is 3 days</UpdateOptionText>
        </UpdateOption>
        <UpdateOption>
          <UpdateSwitch
            checked={updateRules.etaOneDay}
            onChange={(event) =>
              onRuleChange("etaOneDay", event.target.checked)
            }
          />
          <UpdateOptionText>ETA is 1 day</UpdateOptionText>
        </UpdateOption>
        <UpdateOption>
          <UpdateSwitch
            checked={updateRules.outForDelivery}
            onChange={(event) =>
              onRuleChange("outForDelivery", event.target.checked)
            }
          />
          <UpdateOptionText>Out for delivery</UpdateOptionText>
        </UpdateOption>
        <UpdateOption>
          <UpdateSwitch
            checked={updateRules.delivered}
            onChange={(event) =>
              onRuleChange("delivered", event.target.checked)
            }
          />
          <UpdateOptionText>Delivered</UpdateOptionText>
        </UpdateOption>

        <PrimaryButton startIcon={<SendRoundedIcon fontSize="small" />}>
          Send Update Now
        </PrimaryButton>
        <CenteredHint>
          Sends via {channel === "email" ? "Email" : "WhatsApp"}.
        </CenteredHint>
      </Card>

      <Card elevation={0}>
        <CardTitle>Order Actions</CardTitle>
        <ActionButton
          variant="outlined"
          startIcon={<EditOutlinedIcon fontSize="small" />}
          onClick={onOpenEditOrder}
        >
          Edit Order
        </ActionButton>
        <ActionButton
          variant="outlined"
          startIcon={<CheckRoundedIcon fontSize="small" />}
        >
          Mark as Completed
        </ActionButton>
        <DangerButton onClick={onOpenDelete}>Delete Order</DangerButton>
      </Card>
    </SideColumn>
  );
}

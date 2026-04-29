import { designSystemColors } from "@/config/theme";
import { type StatusTone } from "@/features/orders/displayOrders/types";
import { displayText } from "@/features/orders/utils/formatting";

const chipBaseSx = {
  typography: "body2",
  height: 34,
  borderRadius: 1,
  border: "1px solid",
  "& .MuiChip-label": {
    px: 1.25,
  },
} as const;

const statusToneChipSx: Record<
  StatusTone,
  {
    borderColor: string;
    backgroundColor: string;
    color: string;
  }
> = {
  default: {
    borderColor: designSystemColors.neutralBlack,
    backgroundColor: designSystemColors.neutralBlack,
    color: "common.white",
  },
  error: {
    borderColor: "error.main",
    backgroundColor: "error.main",
    color: "common.white",
  },
  neutral: {
    borderColor: "divider",
    backgroundColor: "transparent",
    color: designSystemColors.neutralBlack,
  },
};

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
});

export const getStatusChipSx = (statusTone: StatusTone) =>
  ({
    ...chipBaseSx,
    ...statusToneChipSx[statusTone],
  }) as const;

export const typeChipSx = {
  ...chipBaseSx,
  borderColor: "divider",
  backgroundColor: "transparent",
  color: designSystemColors.neutralBlack,
} as const;

export const getOrderType = (status: string): string => {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus === "inbound" || normalizedStatus === "outbound") {
    return normalizedStatus.charAt(0).toUpperCase() + normalizedStatus.slice(1);
  }

  return "Outbound";
};

export const getSmartEta = (hasTrackingUpdate: boolean): string => {
  if (!hasTrackingUpdate) {
    return "Pending ETA";
  }

  return "Tracking Updated";
};

export const getDisplayStatus = (
  orderStatus: string,
  hasTrackingUpdate: boolean,
): string => {
  const normalizedStatus = orderStatus.trim().toLowerCase();

  if (normalizedStatus === "inbound" || normalizedStatus === "outbound") {
    return hasTrackingUpdate ? "In Transit" : "Processing";
  }

  return displayText(orderStatus)
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
};

export const getLastActivity = (
  lastTrackingUpdateAt: Date | null,
  updatedAt: Date,
): string => {
  const baseDate = lastTrackingUpdateAt ?? updatedAt;
  const time = timeFormatter.format(baseDate);

  return `Updated ${time}`;
};

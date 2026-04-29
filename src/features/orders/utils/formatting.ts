export const ORDERS_FALLBACK_TEXT = "-";

export const displayText = (value?: string | null): string => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : ORDERS_FALLBACK_TEXT;
};

export const formatDateTime = (value?: Date | null): string => {
  if (!value) {
    return ORDERS_FALLBACK_TEXT;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(value);
};

export const formatDateTimeWithYear = (value?: Date | null): string => {
  if (!value) {
    return ORDERS_FALLBACK_TEXT;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(value);
};

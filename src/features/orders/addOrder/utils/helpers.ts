import {
  type OrderQueryModel,
  type UpdateOrderInput,
} from "@/queries/orders/types";
import {
  type FormState,
  type NotificationChannel,
  type OrderCreateInput,
} from "@/types/Order";

const validChannels: NotificationChannel[] = ["email", "whatsapp", "sms"];
const defaultChannels: NotificationChannel[] = ["email"];
const defaultAutomaticUpdates: FormState["automaticUpdates"] = {
  orderSent: true,
  eta: true,
};

function buildDeliveryAddressFromForm(form: FormState) {
  const streetAddress = form.streetAddress.trim();
  const addressLocality = form.addressLocality.trim();
  const postalCode = form.postalCode.trim();
  const addressCountry = form.addressCountry.trim();
  const formattedAddress = [
    streetAddress,
    addressLocality,
    postalCode,
    addressCountry,
  ]
    .filter((part) => part.length > 0)
    .join(", ");

  return {
    ...(formattedAddress ? { formattedAddress } : {}),
    ...(streetAddress ? { streetAddress } : {}),
    ...(addressLocality ? { addressLocality } : {}),
    ...(postalCode ? { postalCode } : {}),
    ...(addressCountry ? { addressCountry } : {}),
  };
}

function buildNotesFromForm(form: FormState): string {
  const channelsSummary = form.channels.join(", ") || "none";
  const updatesSummary = `orderSent:${form.automaticUpdates.orderSent ? "yes" : "no"}, eta:${form.automaticUpdates.eta ? "yes" : "no"}`;

  return `channels:${channelsSummary}; updates:${updatesSummary}`;
}

function parseChannelsFromNotes(notes: string): NotificationChannel[] {
  const channelsMatch = notes.match(/channels:\s*([^;]+)/i);
  if (!channelsMatch) {
    return defaultChannels;
  }

  const channels = channelsMatch[1]
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter((item): item is NotificationChannel =>
      validChannels.includes(item as NotificationChannel),
    );

  return channels.length > 0 ? channels : defaultChannels;
}

function parseAutomaticUpdatesFromNotes(
  notes: string,
): FormState["automaticUpdates"] {
  const updatesMatch = notes.match(/updates:\s*([^;]+)/i);
  if (!updatesMatch) {
    return defaultAutomaticUpdates;
  }

  const parsed = updatesMatch[1]
    .split(",")
    .map((item) => item.trim())
    .reduce<Record<string, string>>((accumulator, entry) => {
      const [key, value] = entry.split(":").map((part) => part.trim());
      if (key && value) {
        accumulator[key] = value;
      }
      return accumulator;
    }, {});

  return {
    orderSent: parsed.orderSent
      ? parsed.orderSent.toLowerCase() === "yes"
      : defaultAutomaticUpdates.orderSent,
    eta: parsed.eta
      ? parsed.eta.toLowerCase() === "yes"
      : defaultAutomaticUpdates.eta,
  };
}

export function buildOrderPayload(
  form: FormState,
  sellerId: string,
): OrderCreateInput {
  const randomToken =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  return {
    referenceId: "",
    orderName: form.orderName.trim(),
    buyerName: form.buyerName.trim(),
    buyerEmail: form.buyerEmail.trim(),
    buyerPhone: form.buyerPhone.trim(),
    deliveryAddress: buildDeliveryAddressFromForm(form),
    trackingNumber: form.trackingNumber.trim(),
    trackingUrl: "",
    carrierName: form.courier.trim(),
    currentStatus: form.direction,
    publicTrackingToken: randomToken,
    sellerId,
    notes: buildNotesFromForm(form),
    lastTrackingUpdateAt: null,
    archivedAt: null,
  };
}

export function buildOrderUpdatePayload(form: FormState): UpdateOrderInput {
  return {
    referenceId: "",
    orderName: form.orderName.trim(),
    buyerName: form.buyerName.trim(),
    buyerEmail: form.buyerEmail.trim(),
    buyerPhone: form.buyerPhone.trim(),
    deliveryAddress: buildDeliveryAddressFromForm(form),
    trackingNumber: form.trackingNumber.trim(),
    carrierName: form.courier.trim(),
    currentStatus: form.direction,
    notes: buildNotesFromForm(form),
  };
}

export function buildInitialFormFromOrder(order: OrderQueryModel): FormState {
  return {
    orderName: order.orderName ?? order.referenceId ?? "",
    courier: order.carrierName ?? "",
    trackingNumber: order.trackingNumber ?? "",
    direction: order.currentStatus === "inbound" ? "inbound" : "outbound",
    buyerName: order.buyerName ?? "",
    buyerEmail: order.buyerEmail ?? "",
    buyerPhone: order.buyerPhone ?? "",
    streetAddress: order.deliveryAddress?.streetAddress ?? "",
    addressLocality: order.deliveryAddress?.addressLocality ?? "",
    postalCode: order.deliveryAddress?.postalCode ?? "",
    addressCountry: order.deliveryAddress?.addressCountry ?? "",
    channels: parseChannelsFromNotes(order.notes ?? ""),
    automaticUpdates: parseAutomaticUpdatesFromNotes(order.notes ?? ""),
  };
}

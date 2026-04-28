import {
  type OrderQueryModel,
  type UpdateOrderInput,
} from "@/queries/orders/types";
import {
  type FormState,
  type NotificationChannel,
  type OrderCreateInput,
} from "../types";
import { dummyDeliveryAddress, initialState } from "./constants";

const validChannels: NotificationChannel[] = ["email", "whatsapp", "sms"];

function buildNotesFromForm(form: FormState): string {
  const channelsSummary = form.channels.join(", ") || "none";
  const updatesSummary = `orderSent:${form.automaticUpdates.orderSent ? "yes" : "no"}, eta:${form.automaticUpdates.eta ? "yes" : "no"}`;

  return `channels:${channelsSummary}; updates:${updatesSummary}`;
}

function parseChannelsFromNotes(notes: string): NotificationChannel[] {
  const channelsMatch = notes.match(/channels:\s*([^;]+)/i);
  if (!channelsMatch) {
    return initialState.channels;
  }

  const channels = channelsMatch[1]
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter((item): item is NotificationChannel =>
      validChannels.includes(item as NotificationChannel),
    );

  return channels.length > 0 ? channels : initialState.channels;
}

function parseAutomaticUpdatesFromNotes(
  notes: string,
): FormState["automaticUpdates"] {
  const updatesMatch = notes.match(/updates:\s*([^;]+)/i);
  if (!updatesMatch) {
    return initialState.automaticUpdates;
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
      : initialState.automaticUpdates.orderSent,
    eta: parsed.eta
      ? parsed.eta.toLowerCase() === "yes"
      : initialState.automaticUpdates.eta,
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
    referenceId: form.orderName.trim(),
    buyerName: form.buyerName.trim(),
    buyerEmail: form.buyerEmail.trim(),
    buyerPhone: form.buyerPhone.trim(),
    deliveryAddress: { ...dummyDeliveryAddress },
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
    referenceId: form.orderName.trim(),
    buyerName: form.buyerName.trim(),
    buyerEmail: form.buyerEmail.trim(),
    buyerPhone: form.buyerPhone.trim(),
    trackingNumber: form.trackingNumber.trim(),
    carrierName: form.courier.trim(),
    currentStatus: form.direction,
    notes: buildNotesFromForm(form),
  };
}

export function buildInitialFormFromOrder(order: OrderQueryModel): FormState {
  return {
    orderName: order.referenceId ?? "",
    courier: order.carrierName ?? "",
    trackingNumber: order.trackingNumber ?? "",
    direction: order.currentStatus === "inbound" ? "inbound" : "outbound",
    buyerName: order.buyerName ?? "",
    buyerEmail: order.buyerEmail ?? "",
    buyerPhone: order.buyerPhone ?? "",
    channels: parseChannelsFromNotes(order.notes ?? ""),
    automaticUpdates: parseAutomaticUpdatesFromNotes(order.notes ?? ""),
  };
}

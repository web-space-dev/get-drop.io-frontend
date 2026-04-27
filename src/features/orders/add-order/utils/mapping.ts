import { type FormState, type OrderCreateInput } from "../types";
import { dummyDeliveryAddress } from "./constants";

export function buildOrderPayload(
  form: FormState,
  sellerId: string,
): OrderCreateInput {
  const randomToken =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  const channelsSummary = form.channels.join(", ") || "none";
  const updatesSummary = `orderSent:${form.automaticUpdates.orderSent ? "yes" : "no"}, eta:${form.automaticUpdates.eta ? "yes" : "no"}`;

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
    notes: `channels:${channelsSummary}; updates:${updatesSummary}`,
    lastTrackingUpdateAt: null,
    archivedAt: null,
  };
}

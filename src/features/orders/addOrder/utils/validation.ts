import {
  type FormState,
  type TrackingEventCreateInput,
} from "@/features/orders/addOrder/types";

export function validateStepOne(form: FormState): string | null {
  if (!form.orderName.trim()) {
    return "Order Name is required.";
  }

  if (!form.courier.trim()) {
    return "Courier is required.";
  }

  if (!form.trackingNumber.trim()) {
    return "Tracking Number is required.";
  }

  return null;
}

export function validateTrackingEvent(
  event: TrackingEventCreateInput,
): string | null {
  if (!event.type.trim()) {
    return "Tracking event type is required.";
  }

  if (!event.status.trim()) {
    return "Tracking event status is required.";
  }

  if (!event.description.trim()) {
    return "Tracking event description is required.";
  }

  if (!event.source.trim()) {
    return "Tracking event source is required.";
  }

  return null;
}

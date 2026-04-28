import { type FormState } from "../types";

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

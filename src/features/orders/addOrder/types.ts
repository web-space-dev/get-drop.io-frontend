import { type Order } from "@/types";

export type AddOrderModalMode = "create" | "edit";

export type AddOrderModalProps = {
  open: boolean;
  onClose: () => void;
  mode?: AddOrderModalMode;
  orderId?: string;
  initialForm?: FormState;
  onCreated?: () => void;
  onUpdated?: () => void;
};

export type Step = 1 | 2;
export type Direction = "outbound" | "inbound";
export type NotificationChannel = "email" | "whatsapp" | "sms";

export type FormState = {
  orderName: string;
  courier: string;
  trackingNumber: string;
  direction: Direction;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  channels: NotificationChannel[];
  automaticUpdates: {
    orderSent: boolean;
    eta: boolean;
  };
};

export type StepOneRequiredFieldKey =
  | "orderName"
  | "courier"
  | "trackingNumber";

export type StepOneFieldErrors = Partial<
  Record<StepOneRequiredFieldKey, string>
>;

export type StepTwoSectionErrorKey = "channels" | "automaticUpdates";

export type StepTwoSectionErrors = Partial<
  Record<StepTwoSectionErrorKey, string>
>;

export type OrderCreateInput = Omit<Order, "id" | "createdAt" | "updatedAt">;

export type OnFieldChange = <K extends keyof FormState>(
  key: K,
  value: FormState[K],
) => void;

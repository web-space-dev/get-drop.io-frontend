import { type Timestamp } from "firebase/firestore";
import { type BaseFirestoreDocument } from "./baseFirestoreDocument";

export type OrderDeliveryAddress = {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  [key: string]: string | undefined;
};

export type Order = BaseFirestoreDocument<Timestamp> & {
  referenceId: string;
  orderName: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  deliveryAddress: OrderDeliveryAddress;
  trackingNumber: string;
  trackingUrl: string;
  carrierName: string;
  currentStatus: string;
  publicTrackingToken: string;
  sellerId: string;
  notes: string;
  lastTrackingUpdateAt: Timestamp | null;
  archivedAt: Timestamp | null;
};

export type OrderTrackingEvent = BaseFirestoreDocument<Timestamp> & {
  type: string;
  status: string;
  description: string;
  source: string;
  eventTimestamp: Timestamp;
};

export type CreateOrderTrackingEventInput = Omit<
  OrderTrackingEvent,
  "id" | "createdAt" | "updatedAt" | "eventTimestamp"
>;

export type AddOrderModalMode = "create" | "edit";

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

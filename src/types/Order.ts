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

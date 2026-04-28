import { type BaseFirestoreDocument, type OrderDeliveryAddress } from "@/types";

export type OrderQueryModel = BaseFirestoreDocument<Date> & {
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
  lastTrackingUpdateAt: Date | null;
  archivedAt: Date | null;
};

export type CreateOrderInput = Omit<
  OrderQueryModel,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateOrderInput = Partial<
  Omit<OrderQueryModel, "id" | "createdAt" | "updatedAt">
>;

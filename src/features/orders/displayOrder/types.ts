export type ChannelOption = "whatsapp" | "sms" | "email";

export type UpdateRules = {
  etaThreeDays: boolean;
  etaOneDay: boolean;
  outForDelivery: boolean;
  delivered: boolean;
};

export type BuyerForm = {
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
};

export type TimelineEvent = {
  time: string;
  label: string;
};

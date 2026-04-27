import { type OrderQueryModel } from "@/queries/orders/types";

export type DisplayOrderProps = {
  id: string;
};

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

export type DisplayOrderMainColumnProps = {
  order: OrderQueryModel;
  city: string;
  smartEta: string;
  trackingLink: string;
  isCopied: boolean;
  timelineEvents: TimelineEvent[];
  onCopyTrackingLink: () => void;
  onOpenEditBuyer: () => void;
};

export type DisplayOrderSideColumnProps = {
  channel: ChannelOption;
  updateRules: UpdateRules;
  onChannelChange: (value: string) => void;
  onRuleChange: (key: keyof UpdateRules, checked: boolean) => void;
  onOpenEditOrder: () => void;
  onOpenDelete: () => void;
};

export type EditBuyerDialogProps = {
  open: boolean;
  buyerForm: BuyerForm;
  onClose: () => void;
  onBuyerFieldChange: (field: keyof BuyerForm, value: string) => void;
  onSaveBuyerChanges: () => void;
  isSaving: boolean;
  saveError: string | null;
};

export type DeleteOrderDialogProps = {
  open: boolean;
  orderName: string;
  isDeleting: boolean;
  deleteError: string | null;
  onClose: () => void;
  onConfirmDelete: () => void;
};

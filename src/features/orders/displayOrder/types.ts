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

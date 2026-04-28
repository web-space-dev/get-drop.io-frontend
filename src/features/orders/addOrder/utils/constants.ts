import {
  type ChannelCardOption,
  type FormState,
  type TrackingEventCreateInput,
} from "@/features/orders/addOrder/types";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export const courierOptions = ["Royal Mail", "Evri", "DPD", "Yodel"] as const;

export const channelOptions: ChannelCardOption[] = [
  {
    value: "email",
    label: "Email",
    icon: EmailOutlinedIcon,
    usesCredits: false,
  },
  {
    value: "whatsapp",
    label: "WhatsApp",
    icon: WhatsAppIcon,
    usesCredits: true,
  },
  {
    value: "sms",
    label: "SMS",
    icon: MessageOutlinedIcon,
    usesCredits: true,
  },
];

export const dummyDeliveryAddress = {
  formattedAddress: "221B Baker Street, London NW1 6XE, United Kingdom",
  streetAddress: "221B Baker Street",
  addressLocality: "London",
  postalCode: "NW1 6XE",
  addressCountry: "United Kingdom",
} as const;

export const buildDefaultTrackingEvent = (): TrackingEventCreateInput => ({
  type: "status_update",
  status: "created",
  description: "Order created and awaiting first courier event.",
  source: "system",
});

export const initialState: FormState = {
  orderName: "",
  courier: "",
  trackingNumber: "",
  direction: "outbound",
  buyerName: "",
  buyerEmail: "",
  buyerPhone: "",
  channels: ["email"],
  automaticUpdates: {
    orderSent: true,
    eta: true,
  },
};

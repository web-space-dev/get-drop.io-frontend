import { type User } from "firebase/auth";
import { type Timestamp } from "firebase/firestore";

export type SellerUserContext = {
  id: string;
  businessName: string;
  email: string;
  status: string;
  logoUrl: string;
  primaryColour: string;
  messagesUsedThisMonth: number;
  topupBalance: number;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
};

export type UserContextValue = {
  authUser: User | null;
  seller: SellerUserContext | null;
  isLoading: boolean;
};

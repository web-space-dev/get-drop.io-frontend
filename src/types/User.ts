import { type User } from "firebase/auth";
import { type Timestamp } from "firebase/firestore";
import { type BaseFirestoreDocument } from "./baseFirestoreDocument";

export type SellerUserContext = BaseFirestoreDocument<Timestamp> & {
  businessName: string;
  email: string;
  status: string;
  logoUrl: string;
  primaryColour: string;
  messagesUsedThisMonth: number;
  topupBalance: number;
};

export type UserContextValue = {
  authUser: User | null;
  seller: SellerUserContext | null;
  isLoading: boolean;
};

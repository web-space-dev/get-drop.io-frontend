import * as React from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, onSnapshot, type Timestamp } from "firebase/firestore";
import { auth, db } from "@/utils/firebaseServer/firebaseClient";
import { type SellerUserContext, type UserContextValue } from "@/types/User";

const UserContext = React.createContext<UserContextValue | undefined>(
  undefined,
);

type UserProviderProps = {
  children: React.ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const [authUser, setAuthUser] = React.useState<User | null>(null);
  const [seller, setSeller] = React.useState<SellerUserContext | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    let unsubscribeSeller: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);

      if (unsubscribeSeller) {
        unsubscribeSeller();
        unsubscribeSeller = null;
      }

      if (!user) {
        setSeller(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      const sellerRef = doc(db, "sellers", user.uid);
      unsubscribeSeller = onSnapshot(
        sellerRef,
        (snapshot) => {
          if (!snapshot.exists()) {
            setSeller(null);
            setIsLoading(false);
            return;
          }

          const data = snapshot.data();
          setSeller({
            id: data.id,
            businessName: data.businessName,
            email: data.email,
            status: data.status,
            logoUrl: data.logoUrl,
            primaryColour: data.primaryColour,
            messagesUsedThisMonth: data.messagesUsedThisMonth,
            topupBalance: data.topupBalance,
            createdAt: (data.createdAt as Timestamp | undefined) ?? null,
            updatedAt: (data.updatedAt as Timestamp | undefined) ?? null,
          });
          setIsLoading(false);
        },
        () => {
          setSeller(null);
          setIsLoading(false);
        },
      );
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSeller) {
        unsubscribeSeller();
      }
    };
  }, []);

  const value = React.useMemo(
    () => ({ authUser, seller, isLoading }),
    [authUser, seller, isLoading],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextValue {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}

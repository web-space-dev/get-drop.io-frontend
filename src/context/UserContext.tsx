import { useGetAuthState } from "@/queries/user/getAuthState";
import { useGetSellerById } from "@/queries/user/getSellerById";
import { type SellerContextValue, type SellerUserContext } from "@/types/User";
import * as React from "react";

const UserContext = React.createContext<SellerContextValue | undefined>(
  undefined,
);

type UserProviderProps = {
  children: React.ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const authStateQuery = useGetAuthState();
  const authUser = authStateQuery.data ?? null;

  const sellerQuery = useGetSellerById(authUser?.uid);
  const seller: SellerUserContext | null = sellerQuery.data ?? null;

  const isLoading =
    authStateQuery.isLoading || (Boolean(authUser) && sellerQuery.isLoading);

  const value = React.useMemo(
    () => ({ authUser, seller, isLoading }),
    [authUser, seller, isLoading],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): SellerContextValue {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}

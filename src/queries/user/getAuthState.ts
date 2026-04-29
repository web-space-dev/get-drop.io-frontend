import { auth } from "@/utils/firebaseServer/firebaseClient";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { onAuthStateChanged, type User } from "firebase/auth";
import * as React from "react";

export const getAuthStateQueryKey = () => ["auth", "current-user"] as const;

type AuthStateResult = {
  authUser: User | null;
  isResolved: boolean;
};

export function useGetAuthState(): AuthStateResult {
  const queryClient = useQueryClient();
  const [isResolved, setIsResolved] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      queryClient.setQueryData(getAuthStateQueryKey(), user);
      setIsResolved(true);
    });

    return unsubscribe;
  }, [queryClient]);

  const query = useQuery({
    queryKey: getAuthStateQueryKey(),
    queryFn: async () => null,
    initialData: null,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return {
    authUser: query.data ?? null,
    isResolved,
  };
}

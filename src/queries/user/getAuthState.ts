import { auth } from "@/utils/firebaseServer/firebaseClient";
import {
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from "@tanstack/react-query";
import { onAuthStateChanged, type User } from "firebase/auth";
import * as React from "react";

export const getAuthStateQueryKey = () => ["auth", "current-user"] as const;

export function useGetAuthState(): UseQueryResult<User | null> {
  const queryClient = useQueryClient();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      queryClient.setQueryData(getAuthStateQueryKey(), user);
    });

    return unsubscribe;
  }, [queryClient]);

  return useQuery({
    queryKey: getAuthStateQueryKey(),
    queryFn: async () => auth.currentUser,
    initialData: auth.currentUser,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

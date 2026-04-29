import { type SellerUserContext } from "@/types/User";
import { db } from "@/utils/firebaseServer/firebaseClient";
import {
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from "@tanstack/react-query";
import {
  doc,
  getDoc,
  onSnapshot,
  Timestamp,
  type DocumentData,
  type DocumentSnapshot,
} from "firebase/firestore";
import * as React from "react";

export const getSellerByIdQueryKey = (sellerId?: string) =>
  ["seller", sellerId ?? "missing"] as const;

function toTimestamp(value: unknown): Timestamp {
  return value instanceof Timestamp ? value : Timestamp.now();
}

function toSellerUserContext(
  snapshot: DocumentSnapshot<DocumentData>,
): SellerUserContext {
  const data = snapshot.data() ?? {};

  return {
    id:
      typeof data.id === "string" && data.id.trim().length > 0
        ? data.id
        : snapshot.id,
    businessName:
      typeof data.businessName === "string" ? data.businessName : "",
    email: typeof data.email === "string" ? data.email : "",
    status: typeof data.status === "string" ? data.status : "pending",
    logoUrl: typeof data.logoUrl === "string" ? data.logoUrl : "",
    primaryColour:
      typeof data.primaryColour === "string" ? data.primaryColour : "",
    messagesUsedThisMonth:
      typeof data.messagesUsedThisMonth === "number"
        ? data.messagesUsedThisMonth
        : 0,
    topupBalance: typeof data.topupBalance === "number" ? data.topupBalance : 0,
    createdAt: toTimestamp(data.createdAt),
    updatedAt: toTimestamp(data.updatedAt),
  };
}

export function useGetSellerById(
  sellerId?: string,
): UseQueryResult<SellerUserContext | null> {
  const queryClient = useQueryClient();

  React.useEffect(() => {
    if (!sellerId) {
      return;
    }

    const sellerRef = doc(db, "sellers", sellerId);
    const unsubscribe = onSnapshot(
      sellerRef,
      (snapshot) => {
        queryClient.setQueryData(
          getSellerByIdQueryKey(sellerId),
          snapshot.exists() ? toSellerUserContext(snapshot) : null,
        );
      },
      () => {
        queryClient.setQueryData(getSellerByIdQueryKey(sellerId), null);
      },
    );

    return unsubscribe;
  }, [queryClient, sellerId]);

  return useQuery({
    queryKey: getSellerByIdQueryKey(sellerId),
    enabled: Boolean(sellerId),
    queryFn: async () => {
      if (!sellerId) {
        return null;
      }

      const sellerRef = doc(db, "sellers", sellerId);
      const snapshot = await getDoc(sellerRef);

      return snapshot.exists() ? toSellerUserContext(snapshot) : null;
    },
    initialData: null,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

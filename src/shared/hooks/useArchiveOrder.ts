import { useUpdateOrder } from "@/queries/orders/updateOrder";
import * as React from "react";

export type ArchiveOrderResult = "archived" | "unarchived" | "error";

export function useArchiveOrder() {
  const updateOrderMutation = useUpdateOrder();
  const [archivingOrderId, setArchivingOrderId] = React.useState<string | null>(
    null,
  );

  const archiveOrder = React.useCallback(
    async (orderId: string): Promise<ArchiveOrderResult> => {
      setArchivingOrderId(orderId);

      try {
        await updateOrderMutation.mutateAsync({
          id: orderId,
          updates: { archivedAt: new Date() },
        });
        return "archived";
      } catch {
        return "error";
      } finally {
        setArchivingOrderId(null);
      }
    },
    [updateOrderMutation],
  );

  const unarchiveOrder = React.useCallback(
    async (orderId: string): Promise<ArchiveOrderResult> => {
      setArchivingOrderId(orderId);

      try {
        await updateOrderMutation.mutateAsync({
          id: orderId,
          updates: { archivedAt: null },
        });
        return "unarchived";
      } catch {
        return "error";
      } finally {
        setArchivingOrderId(null);
      }
    },
    [updateOrderMutation],
  );

  const toggleArchiveOrder = React.useCallback(
    async (
      orderId: string,
      isArchived: boolean,
    ): Promise<ArchiveOrderResult> => {
      if (isArchived) {
        return unarchiveOrder(orderId);
      }

      return archiveOrder(orderId);
    },
    [archiveOrder, unarchiveOrder],
  );

  return {
    archivingOrderId,
    isArchiving: updateOrderMutation.isPending,
    archiveOrder,
    unarchiveOrder,
    toggleArchiveOrder,
  };
}

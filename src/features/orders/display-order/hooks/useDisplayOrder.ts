import * as React from "react";
import { useRouter } from "next/router";
import { useGetOrderById } from "@/queries/orders/getOrderById";
import { useDeleteOrder } from "@/queries/orders/deleteOrder";
import { useUpdateOrder } from "@/queries/orders/updateOrder";
import {
  getDeliveryCity,
  getSmartEta,
  getTimelineEvents,
  getTrackingLink,
} from "../utils/displayOrderUtils";
import { type BuyerForm, type ChannelOption, type UpdateRules } from "../types";

const validChannels: ChannelOption[] = ["whatsapp", "sms", "email"];

const initialUpdateRules: UpdateRules = {
  etaThreeDays: true,
  etaOneDay: false,
  outForDelivery: false,
  delivered: false,
};

const initialBuyerForm: BuyerForm = {
  buyerName: "",
  buyerEmail: "",
  buyerPhone: "",
};

export function useDisplayOrder(id: string) {
  const router = useRouter();
  const deleteOrderMutation = useDeleteOrder();
  const updateOrderMutation = useUpdateOrder();
  const { data: order, isLoading, isError } = useGetOrderById(id);

  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [isEditOrderOpen, setIsEditOrderOpen] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [deleteError, setDeleteError] = React.useState<string | null>(null);
  const [saveBuyerError, setSaveBuyerError] = React.useState<string | null>(
    null,
  );
  const [channel, setChannel] = React.useState<ChannelOption>("whatsapp");
  const [isCopied, setIsCopied] = React.useState(false);
  const [updateRules, setUpdateRules] =
    React.useState<UpdateRules>(initialUpdateRules);
  const [buyerForm, setBuyerForm] = React.useState<BuyerForm>(initialBuyerForm);

  const trackingLink = React.useMemo(
    () => (order ? getTrackingLink(order) : "-"),
    [order],
  );

  const city = React.useMemo(
    () => (order ? getDeliveryCity(order) : "-"),
    [order],
  );

  const smartEta = React.useMemo(
    () => (order ? getSmartEta(order) : "Pending ETA"),
    [order],
  );

  const timelineEvents = React.useMemo(
    () => (order ? getTimelineEvents(order) : []),
    [order],
  );

  const handleCopyTrackingLink = () => {
    if (trackingLink === "-") {
      return;
    }

    void (async () => {
      try {
        await navigator.clipboard.writeText(trackingLink);
        setIsCopied(true);
        window.setTimeout(() => setIsCopied(false), 1600);
      } catch {
        setIsCopied(false);
      }
    })();
  };

  const handleOpenEditBuyer = () => {
    if (!order) {
      return;
    }

    setSaveBuyerError(null);
    setBuyerForm({
      buyerName: order.buyerName ?? "",
      buyerEmail: order.buyerEmail ?? "",
      buyerPhone: order.buyerPhone ?? "",
    });
    setIsEditOpen(true);
  };

  const handleSaveBuyerChanges = () => {
    if (!order) {
      return;
    }

    void (async () => {
      setSaveBuyerError(null);

      try {
        await updateOrderMutation.mutateAsync({
          id: order.id,
          updates: {
            buyerName: buyerForm.buyerName.trim(),
            buyerEmail: buyerForm.buyerEmail.trim(),
            buyerPhone: buyerForm.buyerPhone.trim(),
          },
        });
        setIsEditOpen(false);
      } catch {
        setSaveBuyerError("Unable to save buyer information right now.");
      }
    })();
  };

  const handleOpenDelete = () => {
    setDeleteError(null);
    setIsDeleteOpen(true);
  };

  const handleOpenEditOrder = () => {
    setIsEditOrderOpen(true);
  };

  const handleCloseEditOrder = () => {
    setIsEditOrderOpen(false);
  };

  const handleDeleteCurrentOrder = () => {
    if (!order) {
      return;
    }

    void (async () => {
      setDeleteError(null);

      try {
        await deleteOrderMutation.mutateAsync(order.id);
        setIsDeleteOpen(false);
        await router.push("/orders");
      } catch {
        setDeleteError("Unable to delete this order right now.");
      }
    })();
  };

  const handleBuyerFieldChange = (field: keyof BuyerForm, value: string) => {
    setBuyerForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleRuleChange = (key: keyof UpdateRules, checked: boolean) => {
    setUpdateRules((current) => ({
      ...current,
      [key]: checked,
    }));
  };

  const handleChannelChange = (value: string) => {
    if (validChannels.includes(value as ChannelOption)) {
      setChannel(value as ChannelOption);
    }
  };

  return {
    order,
    isLoading,
    isError,
    channel,
    updateRules,
    buyerForm,
    isCopied,
    isEditOpen,
    isEditOrderOpen,
    isDeleteOpen,
    deleteError,
    saveBuyerError,
    isDeleting: deleteOrderMutation.isPending,
    isSavingBuyer: updateOrderMutation.isPending,
    city,
    smartEta,
    trackingLink,
    timelineEvents,
    setIsEditOpen,
    setIsEditOrderOpen,
    setIsDeleteOpen,
    handleCopyTrackingLink,
    handleOpenEditBuyer,
    handleOpenEditOrder,
    handleCloseEditOrder,
    handleSaveBuyerChanges,
    handleOpenDelete,
    handleDeleteCurrentOrder,
    handleBuyerFieldChange,
    handleRuleChange,
    handleChannelChange,
  };
}

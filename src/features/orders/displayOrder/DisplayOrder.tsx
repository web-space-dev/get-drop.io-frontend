import { designSystemColors } from "@/config/theme";
import { buildInitialFormFromOrder } from "@/features/orders/addOrder/utils/helpers";
import { displayText } from "@/features/orders/utils/formatting";
import Button from "@/shared/components/Button";
import { useSnackbar } from "@/shared/hooks/useSnackbar";
import DashboardLayout from "@/shared/layouts/DashboardLayout";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import NextLink from "next/link";
import * as React from "react";
import AddOrderModal from "../addOrder/AddOrderModal";
import ActivityLogSummary from "./components/ActivityLogSummary";
import AutomatedUpdatesSummary from "./components/AutomatedUpdatesSummary";
import BuyerSummary from "./components/BuyerSummary";
import DeleteOrderDialog from "./components/DeleteOrderDialog";
import EditBuyerDialog from "./components/EditBuyerDialog";
import OrderActionsSummary from "./components/OrderActionsSummary";
import OrderSummaryCard, {
  type OrderSummaryItem,
} from "./components/OrderSummaryCard";
import { useDisplayOrder } from "./hooks/useDisplayOrder";

type DisplayOrderProps = {
  id: string;
};

export default function DisplayOrder({ id }: DisplayOrderProps) {
  const { showSnackbar, SnackbarComponent } = useSnackbar();

  const {
    buyerForm,
    channel,
    handleBuyerFieldChange,
    handleChannelChange,
    handleCopyTrackingLink,
    handleOpenEditBuyer,
    handleOpenEditOrder,
    handleCloseEditOrder,
    handleSaveBuyerChanges: handleSaveBuyerChangesAction,
    handleOpenDelete,
    handleRuleChange,
    handleDeleteCurrentOrder,
    handleMarkAsCompleted: handleMarkAsCompletedAction,
    handleToggleArchive: handleToggleArchiveAction,
    isCopied,
    isDeleteOpen,
    isEditOrderOpen,
    isDeleting,
    isUpdatingOrder,
    isArchiving,
    deleteError,
    saveBuyerError,
    isOrderCompleted,
    isOrderArchived,
    isSavingBuyer,
    isEditOpen,
    isError,
    isLoading,
    order,
    setIsEditOpen,
    setIsDeleteOpen,
    smartEta,
    timelineEvents,
    trackingLink,
    updateRules,
  } = useDisplayOrder(id);

  const handleMarkAsCompleted = React.useCallback(() => {
    void (async () => {
      const result = await handleMarkAsCompletedAction();

      if (result === "success") {
        showSnackbar("Order marked as complete successfully.", "success");
      }

      if (result === "error") {
        showSnackbar("We couldn't mark this as complete.", "error");
      }
    })();
  }, [handleMarkAsCompletedAction, showSnackbar]);

  const handleToggleArchive = React.useCallback(() => {
    void (async () => {
      const result = await handleToggleArchiveAction();

      if (result === "archived") {
        showSnackbar("Order archived successfully.", "success");
      }

      if (result === "unarchived") {
        showSnackbar("Order unarchived successfully.", "success");
      }

      if (result === "error") {
        showSnackbar("Unable to update archive status right now.", "error");
      }
    })();
  }, [handleToggleArchiveAction, showSnackbar]);

  const handleOrderUpdated = React.useCallback(() => {
    showSnackbar("Order edited successfully.", "success");
  }, [showSnackbar]);

  const handleOrderUpdateFailed = React.useCallback(() => {
    showSnackbar("Failed to edit order. Please try again.", "error");
  }, [showSnackbar]);

  const handleSaveBuyerChanges = React.useCallback(() => {
    void (async () => {
      const result = await handleSaveBuyerChangesAction();

      if (result === "success") {
        showSnackbar("Buyer information updated successfully.", "success");
      }

      if (result === "error") {
        showSnackbar("Failed to update buyer information.", "error");
      }
    })();
  }, [handleSaveBuyerChangesAction, showSnackbar]);

  const summaryItems: OrderSummaryItem[] = [
    {
      label: "Status",
      value: displayText(order?.currentStatus),
      useStatusPill: true,
    },
    {
      label: "Courier",
      value: displayText(order?.carrierName),
    },
    {
      label: "Tracking Number",
      value: displayText(order?.trackingNumber),
    },
    {
      label: "Smart ETA",
      value: smartEta,
    },
  ];

  if (isLoading) {
    return (
      <DashboardLayout>
        <CircularProgress size={28} />
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <Alert severity="error">Unable to load this order right now.</Alert>
      </DashboardLayout>
    );
  }

  if (!order) {
    return (
      <DashboardLayout>
        <Alert severity="warning">Order not found.</Alert>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Box
        component="nav"
        aria-label="Order navigation"
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          flexWrap: "wrap",
          marginBottom: theme.spacing(2),
        })}
      >
        <Button
          variant="outlined"
          startIcon={<ArrowBackRoundedIcon fontSize="small" />}
          component={NextLink}
          href="/orders"
          sx={(theme) => ({
            minHeight: theme.spacing(4.5),
            backgroundColor: "transparent",
            color: designSystemColors.neutralBlack,
            borderColor: designSystemColors.neutralBlack,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
              borderColor: designSystemColors.neutralBlack,
            },
            mt: 2,
          })}
        >
          Back
        </Button>
      </Box>
      <Box
        component="section"
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: "1fr",
          "@media (min-width: 900px)": {
            gridTemplateColumns: "minmax(0, 2fr) minmax(280px, 1fr)",
          },
        }}
      >
        <Box component="section" sx={{ display: "grid", gap: 2 }}>
          <OrderSummaryCard
            orderName={displayText(order.orderName)}
            items={summaryItems}
            trackingLink={trackingLink}
            isCopied={isCopied}
            onCopyTrackingLink={handleCopyTrackingLink}
          />

          <BuyerSummary
            buyerName={order.buyerName}
            buyerEmail={order.buyerEmail}
            buyerPhone={order.buyerPhone}
            formattedAddress={order.deliveryAddress?.formattedAddress}
            onOpenEditBuyer={handleOpenEditBuyer}
          />

          <ActivityLogSummary timelineEvents={timelineEvents} />
        </Box>

        <Box
          component="aside"
          sx={{ display: "grid", gap: 2, alignSelf: "start" }}
        >
          <AutomatedUpdatesSummary
            channel={channel}
            updateRules={updateRules}
            onChannelChange={handleChannelChange}
            onRuleChange={handleRuleChange}
          />

          <OrderActionsSummary
            onOpenEditOrder={handleOpenEditOrder}
            onOpenDelete={handleOpenDelete}
            onMarkAsCompleted={handleMarkAsCompleted}
            onToggleArchive={handleToggleArchive}
            isMarkingAsCompleted={isUpdatingOrder}
            isArchiving={isArchiving}
            isCompleted={isOrderCompleted}
            isArchived={isOrderArchived}
          />
        </Box>
      </Box>

      <AddOrderModal
        mode="edit"
        orderId={order.id}
        initialForm={buildInitialFormFromOrder(order)}
        open={isEditOrderOpen}
        onClose={handleCloseEditOrder}
        onUpdated={handleOrderUpdated}
        onUpdateFailed={handleOrderUpdateFailed}
      />

      <EditBuyerDialog
        open={isEditOpen}
        buyerForm={buyerForm}
        onClose={() => setIsEditOpen(false)}
        onBuyerFieldChange={handleBuyerFieldChange}
        onSaveBuyerChanges={handleSaveBuyerChanges}
        isSaving={isSavingBuyer}
        saveError={saveBuyerError}
      />

      <DeleteOrderDialog
        open={isDeleteOpen}
        orderName={displayText(order.orderName)}
        isDeleting={isDeleting}
        deleteError={deleteError}
        onClose={() => setIsDeleteOpen(false)}
        onConfirmDelete={handleDeleteCurrentOrder}
      />

      <SnackbarComponent />
    </DashboardLayout>
  );
}

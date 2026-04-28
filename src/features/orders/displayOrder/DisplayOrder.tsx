import { buildInitialFormFromOrder } from "@/features/orders/addOrder/utils/helpers";
import DashboardLayout from "@/shared/layouts/DashboardLayout";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
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
import { displayText } from "./utils/displayOrderUtils";

type DisplayOrderProps = {
  id: string;
};

export default function DisplayOrder({ id }: DisplayOrderProps) {
  const {
    buyerForm,
    channel,
    city,
    handleBuyerFieldChange,
    handleChannelChange,
    handleCopyTrackingLink,
    handleOpenEditBuyer,
    handleOpenEditOrder,
    handleCloseEditOrder,
    handleSaveBuyerChanges,
    handleOpenDelete,
    handleRuleChange,
    handleDeleteCurrentOrder,
    isCopied,
    isDeleteOpen,
    isEditOrderOpen,
    isDeleting,
    deleteError,
    saveBuyerError,
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
            city={city}
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
          />
        </Box>
      </Box>

      <AddOrderModal
        mode="edit"
        orderId={order.id}
        initialForm={buildInitialFormFromOrder(order)}
        open={isEditOrderOpen}
        onClose={handleCloseEditOrder}
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
    </DashboardLayout>
  );
}

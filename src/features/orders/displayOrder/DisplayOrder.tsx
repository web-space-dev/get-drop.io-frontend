import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import AddOrderModal from "@/features/orders/addOrder/AddOrderModal";
import { buildInitialFormFromOrder } from "@/features/orders/addOrder/utils/mapping";
import DisplayOrderMainColumn from "./components/DisplayOrderMainColumn";
import DisplayOrderSideColumn from "./components/DisplayOrderSideColumn";
import EditBuyerDialog from "./components/EditBuyerDialog";
import DeleteOrderDialog from "./components/DeleteOrderDialog";
import { useDisplayOrder } from "./hooks/useDisplayOrder";
import { type DisplayOrderProps } from "./types";
import { displayText } from "./utils/displayOrderUtils";
import DashboardLayout from "@/components/layouts/DashboardLayout";

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
        <DisplayOrderMainColumn
          order={order}
          city={city}
          smartEta={smartEta}
          trackingLink={trackingLink}
          isCopied={isCopied}
          timelineEvents={timelineEvents}
          onCopyTrackingLink={handleCopyTrackingLink}
          onOpenEditBuyer={handleOpenEditBuyer}
        />

        <DisplayOrderSideColumn
          channel={channel}
          updateRules={updateRules}
          onChannelChange={handleChannelChange}
          onRuleChange={handleRuleChange}
          onOpenEditOrder={handleOpenEditOrder}
          onOpenDelete={handleOpenDelete}
        />
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
        orderName={displayText(order.referenceId)}
        isDeleting={isDeleting}
        deleteError={deleteError}
        onClose={() => setIsDeleteOpen(false)}
        onConfirmDelete={handleDeleteCurrentOrder}
      />
    </DashboardLayout>
  );
}

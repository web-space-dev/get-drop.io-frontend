import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import AddOrderModal from "@/features/orders/add-order/AddOrderModal";
import { buildInitialFormFromOrder } from "@/features/orders/add-order/utils/mapping";
import { Grid, Page } from "./styles";
import DisplayOrderMainColumn from "./components/DisplayOrderMainColumn";
import DisplayOrderSideColumn from "./components/DisplayOrderSideColumn";
import EditBuyerDialog from "./components/EditBuyerDialog";
import DeleteOrderDialog from "./components/DeleteOrderDialog";
import { useDisplayOrder } from "./hooks/useDisplayOrder";
import { type DisplayOrderProps } from "./types";
import { displayText } from "./utils/displayOrderUtils";

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
      <Page>
        <CircularProgress size={28} />
      </Page>
    );
  }

  if (isError) {
    return (
      <Page>
        <Alert severity="error">Unable to load this order right now.</Alert>
      </Page>
    );
  }

  if (!order) {
    return (
      <Page>
        <Alert severity="warning">Order not found.</Alert>
      </Page>
    );
  }

  return (
    <Page>
      <Grid>
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
      </Grid>

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
    </Page>
  );
}

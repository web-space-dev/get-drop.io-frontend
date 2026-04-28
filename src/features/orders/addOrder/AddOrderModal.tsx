import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  collection,
  doc,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { useUser } from "@/context/UserContext";
import { useUpdateOrder } from "@/queries/orders/updateOrder";
import { db } from "@/utils/firebaseServer/firebaseClient";
import AddOrderFooter from "./components/AddOrderFooter";
import AddOrderHeader from "./components/AddOrderHeader";
import AddOrderStepOne from "./components/AddOrderStepOne";
import AddOrderStepTwo from "./components/AddOrderStepTwo";
import { buildOrderPayload, buildOrderUpdatePayload } from "./utils/mapping";
import { buildDefaultTrackingEvent, initialState } from "./utils/constants";
import { type AddOrderModalProps } from "./types";
import { useAddOrderModal } from "./hooks/useAddOrderModal";
import { validateStepOne } from "./utils/validation";

export default function AddOrderModal({
  mode = "create",
  orderId,
  initialForm = initialState,
  open,
  onClose,
  onCreated,
  onUpdated,
}: AddOrderModalProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { authUser } = useUser();
  const updateOrderMutation = useUpdateOrder();

  const {
    step,
    form,
    submitError,
    isSubmitting,
    setSubmitError,
    setIsSubmitting,
    updateField,
    handleClose,
    handleNext,
    handleBack,
    handleToggleChannel,
    handleAutomaticUpdateChange,
  } = useAddOrderModal({
    open,
    onClose,
    initialForm,
  });

  const handleSubmitOrder = () => {
    void (async () => {
      const error = validateStepOne(form);
      if (error) {
        setSubmitError(error);
        return;
      }

      if (mode === "edit" && !orderId) {
        setSubmitError("Unable to update this order right now.");
        return;
      }

      if (mode === "create" && !authUser) {
        setSubmitError("You must be signed in to create an order.");
        return;
      }

      setSubmitError(null);
      setIsSubmitting(true);

      try {
        if (mode === "edit") {
          await updateOrderMutation.mutateAsync({
            id: orderId as string,
            updates: buildOrderUpdatePayload(form),
          });
          onUpdated?.();
        } else {
          const payload = buildOrderPayload(form, authUser!.uid);
          const batch = writeBatch(db);
          const orderRef = doc(collection(db, "orders"));
          const trackingEventRef = doc(
            collection(orderRef, "order_tracking_event"),
          );

          batch.set(orderRef, {
            ...payload,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });

          batch.set(trackingEventRef, {
            ...buildDefaultTrackingEvent(),
            eventTimestamp: serverTimestamp(),
            createdAt: serverTimestamp(),
          });

          await batch.commit();
          onCreated?.();
        }

        handleClose();
      } catch {
        setSubmitError(
          mode === "edit"
            ? "Unable to update order right now. Please try again."
            : "Unable to create order right now. Please try again.",
        );
      } finally {
        setIsSubmitting(false);
      }
    })();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
      slotProps={{
        paper: {
          sx: {
            width: "100%",
            maxWidth: 760,
            borderRadius: 2.5,
            overflow: "hidden",
          },
        },
      }}
    >
      <AddOrderHeader step={step} mode={mode} onClose={handleClose} />

      <DialogContent sx={{ px: 3, py: 2.5 }}>
        <Stack spacing={2}>
          {step === 1 ? (
            <AddOrderStepOne form={form} onFieldChange={updateField} />
          ) : (
            <AddOrderStepTwo
              form={form}
              onToggleChannel={handleToggleChannel}
              onAutomaticUpdateChange={handleAutomaticUpdateChange}
            />
          )}

          {submitError ? (
            <Typography variant="body2" color="error">
              {submitError}
            </Typography>
          ) : null}
        </Stack>
      </DialogContent>

      <AddOrderFooter
        mode={mode}
        step={step}
        isSubmitting={isSubmitting}
        onClose={handleClose}
        onBack={handleBack}
        onNext={handleNext}
        onSubmitOrder={handleSubmitOrder}
      />
    </Dialog>
  );
}

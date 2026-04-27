import * as React from "react";
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
import { db } from "@/utils/firebaseServer/firebaseClient";
import AddOrderFooter from "./components/AddOrderFooter";
import AddOrderHeader from "./components/AddOrderHeader";
import AddOrderStepOne from "./components/AddOrderStepOne";
import AddOrderStepTwo from "./components/AddOrderStepTwo";
import { buildOrderPayload } from "./utils/mapping";
import { buildDefaultTrackingEvent } from "./utils/constants";
import { Content, StyledDialog } from "./styles";
import { type AddOrderModalProps } from "./types";
import { useAddOrderModal } from "./hooks/useAddOrderModal";
import { validateStepOne } from "./utils/validation";

export default function AddOrderModal({
  open,
  onClose,
  onCreated,
}: AddOrderModalProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { authUser } = useUser();

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
  } = useAddOrderModal({ onClose });

  const handleCreateOrder = () => {
    void (async () => {
      const error = validateStepOne(form);
      if (error) {
        setSubmitError(error);
        return;
      }

      if (!authUser) {
        setSubmitError("You must be signed in to create an order.");
        return;
      }

      setSubmitError(null);
      setIsSubmitting(true);

      try {
        const payload = buildOrderPayload(form, authUser.uid);
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
        handleClose();
      } catch {
        setSubmitError("Unable to create order right now. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    })();
  };

  return (
    <StyledDialog open={open} onClose={handleClose} fullScreen={fullScreen}>
      <AddOrderHeader step={step} onClose={handleClose} />

      <Content>
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
      </Content>

      <AddOrderFooter
        step={step}
        isSubmitting={isSubmitting}
        onClose={handleClose}
        onBack={handleBack}
        onNext={handleNext}
        onCreateOrder={handleCreateOrder}
      />
    </StyledDialog>
  );
}

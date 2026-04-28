import { designSystemColors } from "@/config/theme";
import { useUser } from "@/context/UserContext";
import { useUpdateOrder } from "@/queries/orders/updateOrder";
import Button from "@/shared/components/Button";
import { db } from "@/utils/firebaseServer/firebaseClient";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  collection,
  doc,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import AddOrderStepOne from "./components/AddOrderStepOne";
import AddOrderStepTwo from "./components/AddOrderStepTwo";
import { useAddOrderModal } from "./hooks/useAddOrderModal";
import { type AddOrderModalProps } from "./types";
import { buildDefaultTrackingEvent, initialState } from "./utils/constants";
import { buildOrderPayload, buildOrderUpdatePayload } from "./utils/mapping";
import { validateStepOne, validateTrackingEvent } from "./utils/validation";

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

  const titlePrefix = mode === "edit" ? "Edit Order" : "Add Order";
  const submitLabel =
    mode === "edit"
      ? isSubmitting
        ? "Saving..."
        : "Save Changes"
      : isSubmitting
        ? "Creating..."
        : "Create Order";

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
          const trackingEvent = buildDefaultTrackingEvent();
          const trackingEventError = validateTrackingEvent(trackingEvent);

          if (trackingEventError) {
            setSubmitError(trackingEventError);
            return;
          }

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
            ...trackingEvent,
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
      <Box
        component="header"
        sx={(theme) => ({
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
          px: 3,
          pt: 2.5,
          pb: 1.5,
          borderBottom: `1px solid ${theme.palette.divider}`,
        })}
      >
        <Typography
          variant="h5"
          sx={{
            m: 0,
            color: designSystemColors.neutralBlack,
          }}
        >
          {titlePrefix} - Step {step} of 2
          {step === 1 ? " (Order Details)" : " (Buyer Updates)"}
        </Typography>
        <IconButton aria-label="Close" onClick={handleClose} size="small">
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </Box>

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

      <DialogActions
        sx={(theme) => ({
          px: 3,
          py: 2.25,
          borderTop: `1px solid ${theme.palette.divider}`,
          justifyContent: "space-between",
        })}
      >
        <Button
          variant="text"
          onClick={handleClose}
          disabled={isSubmitting}
          sx={(theme) => ({
            color: designSystemColors.neutralBlack,
            backgroundColor: "transparent",
            minWidth: 96,
            minHeight: theme.spacing(4.5),
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          })}
        >
          Cancel
        </Button>

        {step === 1 ? (
          <Button
            onClick={handleNext}
            sx={(theme) => ({
              backgroundColor: designSystemColors.neutralBlack,
              color: theme.palette.common.white,
              minWidth: 220,
              minHeight: theme.spacing(4.5),
              "&:hover": {
                backgroundColor: designSystemColors.neutralBlack,
              },
            })}
          >
            Next: Buyer Updates
          </Button>
        ) : (
          <>
            <Button
              variant="outlined"
              onClick={handleBack}
              disabled={isSubmitting}
              sx={(theme) => ({
                color: designSystemColors.neutralBlack,
                borderColor: designSystemColors.neutralBlack,
                minHeight: theme.spacing(4.5),
                "&:hover": {
                  borderColor: designSystemColors.neutralBlack,
                  backgroundColor: theme.palette.action.hover,
                },
              })}
            >
              Back
            </Button>
            <Button
              onClick={handleSubmitOrder}
              disabled={isSubmitting}
              sx={(theme) => ({
                backgroundColor: designSystemColors.neutralBlack,
                color: theme.palette.common.white,
                minWidth: 220,
                minHeight: theme.spacing(4.5),
                "&:hover": {
                  backgroundColor: designSystemColors.neutralBlack,
                },
              })}
            >
              {submitLabel}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

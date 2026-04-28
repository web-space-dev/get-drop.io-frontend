import * as React from "react";
import DialogActions from "@mui/material/DialogActions";
import Button from "@/components/ui/Button";
import { designSystemColors } from "@/config/theme";
import { type AddOrderModalMode, type Step } from "../types";

type AddOrderFooterProps = {
  mode: AddOrderModalMode;
  step: Step;
  isSubmitting: boolean;
  onClose: () => void;
  onBack: () => void;
  onNext: () => void;
  onSubmitOrder: () => void;
};

export default function AddOrderFooter({
  mode,
  step,
  isSubmitting,
  onClose,
  onBack,
  onNext,
  onSubmitOrder,
}: AddOrderFooterProps) {
  const submitLabel =
    mode === "edit"
      ? isSubmitting
        ? "Saving..."
        : "Save Changes"
      : isSubmitting
        ? "Creating..."
        : "Create Order";

  return (
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
        onClick={onClose}
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
          onClick={onNext}
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
            onClick={onBack}
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
            onClick={onSubmitOrder}
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
  );
}

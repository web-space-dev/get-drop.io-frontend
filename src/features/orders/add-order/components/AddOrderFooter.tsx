import * as React from "react";
import { type AddOrderModalMode, type Step } from "../types";
import {
  Footer,
  FooterCancelButton,
  FooterOutlinedButton,
  FooterPrimaryButton,
} from "../styles";

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
    <Footer>
      <FooterCancelButton
        variant="text"
        onClick={onClose}
        disabled={isSubmitting}
      >
        Cancel
      </FooterCancelButton>

      {step === 1 ? (
        <FooterPrimaryButton onClick={onNext}>
          Next: Buyer Updates
        </FooterPrimaryButton>
      ) : (
        <>
          <FooterOutlinedButton
            variant="outlined"
            onClick={onBack}
            disabled={isSubmitting}
          >
            Back
          </FooterOutlinedButton>
          <FooterPrimaryButton onClick={onSubmitOrder} disabled={isSubmitting}>
            {submitLabel}
          </FooterPrimaryButton>
        </>
      )}
    </Footer>
  );
}

import * as React from "react";
import { type Step } from "../types";
import {
  Footer,
  FooterCancelButton,
  FooterOutlinedButton,
  FooterPrimaryButton,
} from "../styles";

type AddOrderFooterProps = {
  step: Step;
  isSubmitting: boolean;
  onClose: () => void;
  onBack: () => void;
  onNext: () => void;
  onCreateOrder: () => void;
};

export default function AddOrderFooter({
  step,
  isSubmitting,
  onClose,
  onBack,
  onNext,
  onCreateOrder,
}: AddOrderFooterProps) {
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
          <FooterPrimaryButton onClick={onCreateOrder} disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Order"}
          </FooterPrimaryButton>
        </>
      )}
    </Footer>
  );
}

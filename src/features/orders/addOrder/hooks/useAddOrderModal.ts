import * as React from "react";
import {
  type FormState,
  type NotificationChannel,
  type Step,
} from "@/features/orders/addOrder/types";
import { validateStepOne } from "@/features/orders/addOrder/utils/validation";

type UseAddOrderModalParams = {
  open: boolean;
  onClose: () => void;
  initialForm: FormState;
};

export function useAddOrderModal({
  open,
  onClose,
  initialForm,
}: UseAddOrderModalParams) {
  const [step, setStep] = React.useState<Step>(1);
  const [form, setForm] = React.useState<FormState>(initialForm);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const wasOpenRef = React.useRef(false);

  const resetState = React.useCallback(() => {
    setStep(1);
    setForm(initialForm);
    setSubmitError(null);
    setIsSubmitting(false);
  }, [initialForm]);

  React.useEffect(() => {
    if (open && !wasOpenRef.current) {
      resetState();
    }

    wasOpenRef.current = open;
  }, [open, resetState]);

  const updateField = <K extends keyof FormState>(
    key: K,
    value: FormState[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleClose = () => {
    if (isSubmitting) {
      return;
    }

    onClose();
    resetState();
  };

  const handleNext = () => {
    const error = validateStepOne(form);
    if (error) {
      setSubmitError(error);
      return;
    }

    setSubmitError(null);
    setStep(2);
  };

  const handleBack = () => {
    setSubmitError(null);
    setStep(1);
  };

  const handleToggleChannel = (channel: NotificationChannel) => {
    setForm((current) => {
      const exists = current.channels.includes(channel);
      return {
        ...current,
        channels: exists
          ? current.channels.filter((item) => item !== channel)
          : [...current.channels, channel],
      };
    });
  };

  const handleAutomaticUpdateChange = (
    key: keyof FormState["automaticUpdates"],
    value: boolean,
  ) => {
    setForm((current) => ({
      ...current,
      automaticUpdates: {
        ...current.automaticUpdates,
        [key]: value,
      },
    }));
  };

  return {
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
  };
}

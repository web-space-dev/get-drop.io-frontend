import {
  type FormState,
  type NotificationChannel,
  type Step,
  type StepOneFieldErrors,
  type StepOneRequiredFieldKey,
  type StepTwoSectionErrors,
} from "@/types/Order";
import * as React from "react";

const stepOneFieldKeys: StepOneRequiredFieldKey[] = ["orderName"];

function isStepOneRequiredField(
  key: keyof FormState,
): key is StepOneRequiredFieldKey {
  return stepOneFieldKeys.includes(key as StepOneRequiredFieldKey);
}

type UseAddOrderModalParams = {
  open: boolean;
  onClose: () => void;
  initialForm: FormState;
};

function validateStepOne(form: FormState): StepOneFieldErrors {
  const errors: StepOneFieldErrors = {};

  if (!form.orderName.trim()) {
    errors.orderName = "Order Name is required.";
  }

  return errors;
}

function validateStepTwo(form: FormState): StepTwoSectionErrors {
  const errors: StepTwoSectionErrors = {};

  if (form.channels.length === 0) {
    errors.channels = "Select at least one notification channel.";
  }

  if (!Object.values(form.automaticUpdates).some(Boolean)) {
    errors.automaticUpdates = "Enable at least one automatic update.";
  }

  return errors;
}

export function useAddOrderModal({
  open,
  onClose,
  initialForm,
}: UseAddOrderModalParams) {
  const [step, setStep] = React.useState<Step>(1);
  const [form, setForm] = React.useState<FormState>(initialForm);
  const [stepOneFieldErrors, setStepOneFieldErrors] =
    React.useState<StepOneFieldErrors>({});
  const [stepTwoSectionErrors, setStepTwoSectionErrors] =
    React.useState<StepTwoSectionErrors>({});
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const wasOpenRef = React.useRef(false);

  const resetState = React.useCallback(() => {
    setStep(1);
    setForm(initialForm);
    setStepOneFieldErrors({});
    setStepTwoSectionErrors({});
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

    if (isStepOneRequiredField(key)) {
      setStepOneFieldErrors((current) => {
        if (!current[key]) {
          return current;
        }

        const updated = { ...current };
        delete updated[key];
        return updated;
      });
    }
  };

  const handleClose = () => {
    if (isSubmitting) {
      return;
    }

    onClose();
    resetState();
  };

  const handleNext = () => {
    const errors = validateStepOne(form);

    if (Object.keys(errors).length > 0) {
      setStepOneFieldErrors(errors);
      setSubmitError(null);
      return;
    }

    setStepOneFieldErrors({});
    setSubmitError(null);
    setStep(2);
  };

  const validateBeforeSubmit = () => {
    const stepOneErrors = validateStepOne(form);
    const stepTwoErrors = validateStepTwo(form);
    const hasStepOneErrors = Object.keys(stepOneErrors).length > 0;
    const hasStepTwoErrors = Object.keys(stepTwoErrors).length > 0;

    if (hasStepOneErrors || hasStepTwoErrors) {
      setStepOneFieldErrors(stepOneErrors);
      setStepTwoSectionErrors(stepTwoErrors);
      setSubmitError(null);
      return false;
    }

    setStepOneFieldErrors({});
    setStepTwoSectionErrors({});
    return true;
  };

  const handleBack = () => {
    setStepTwoSectionErrors({});
    setSubmitError(null);
    setStep(1);
  };

  const handleToggleChannel = (channel: NotificationChannel) => {
    setForm((current) => {
      const exists = current.channels.includes(channel);
      const next = {
        ...current,
        channels: exists
          ? current.channels.filter((item) => item !== channel)
          : [...current.channels, channel],
      };

      setStepTwoSectionErrors((errors) => {
        if (!errors.channels) {
          return errors;
        }

        if (next.channels.length > 0) {
          const updated = { ...errors };
          delete updated.channels;
          return updated;
        }

        return errors;
      });

      return next;
    });
  };

  const handleAutomaticUpdateChange = (
    key: keyof FormState["automaticUpdates"],
    value: boolean,
  ) => {
    setForm((current) => {
      const next = {
        ...current,
        automaticUpdates: {
          ...current.automaticUpdates,
          [key]: value,
        },
      };

      setStepTwoSectionErrors((errors) => {
        if (!errors.automaticUpdates) {
          return errors;
        }

        if (Object.values(next.automaticUpdates).some(Boolean)) {
          const updated = { ...errors };
          delete updated.automaticUpdates;
          return updated;
        }

        return errors;
      });

      return next;
    });
  };

  return {
    step,
    form,
    stepOneFieldErrors,
    stepTwoSectionErrors,
    submitError,
    isSubmitting,
    setStepOneFieldErrors,
    setStepTwoSectionErrors,
    setSubmitError,
    setIsSubmitting,
    validateBeforeSubmit,
    updateField,
    handleClose,
    handleNext,
    handleBack,
    handleToggleChannel,
    handleAutomaticUpdateChange,
  };
}

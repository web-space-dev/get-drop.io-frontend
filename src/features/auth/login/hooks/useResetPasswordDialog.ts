import * as React from "react";
import { resetPassword } from "@/utils/firebaseServer/firebaseAuth";
import { getFriendlyResetPasswordErrorMessage } from "@/utils/firebaseServer/firebaseErrors";

export function useResetPasswordDialog(initialEmail: string) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const open = () => {
    setEmail(initialEmail);
    setError(null);
    setSuccessMessage(null);
    setIsOpen(true);
  };

  const close = () => {
    if (isSubmitting) {
      return;
    }

    setIsOpen(false);
  };

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEmail(event.target.value);
  };

  const submit = () => {
    void (async () => {
      const normalizedEmail = email.trim();
      if (!normalizedEmail) {
        setError("Email is required");
        return;
      }

      setError(null);
      setSuccessMessage(null);
      setIsSubmitting(true);

      try {
        await resetPassword(normalizedEmail);
        setSuccessMessage(
          "If an account exists for this email, a password reset link has been sent.",
        );
      } catch (submissionError) {
        setError(getFriendlyResetPasswordErrorMessage(submissionError));
      } finally {
        setIsSubmitting(false);
      }
    })();
  };

  return {
    isOpen,
    email,
    error,
    successMessage,
    isSubmitting,
    open,
    close,
    handleEmailChange,
    submit,
  };
}

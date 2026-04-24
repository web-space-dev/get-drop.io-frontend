import * as React from "react";
import PasswordField from "@/features/auth/inputs/PasswordField";

type PasswordsMatchProps = {
  password: string;
  confirmPassword: string;
  confirmTouched: boolean;
  onConfirmPasswordChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onConfirmBlur: () => void;
};

export default function PasswordsMatch({
  password,
  confirmPassword,
  confirmTouched,
  onConfirmPasswordChange,
  onConfirmBlur,
}: PasswordsMatchProps) {
  const passwordsMatch = password === confirmPassword;
  const showPasswordMismatch =
    confirmTouched && confirmPassword.length > 0 && !passwordsMatch;

  return (
    <PasswordField
      required
      id="confirmPassword"
      name="confirmPassword"
      label="Confirm password"
      autoComplete="new-password"
      value={confirmPassword}
      onChange={onConfirmPasswordChange}
      onBlur={onConfirmBlur}
      error={showPasswordMismatch}
      helperText={showPasswordMismatch ? "Passwords do not match" : undefined}
    />
  );
}

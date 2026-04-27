import * as React from "react";
import AuthLinkButton from "@/features/auth/components/AuthLinkButton";
import EmailField from "@/features/auth/inputs/EmailField";
import PasswordField from "@/features/auth/inputs/PasswordField";
import AuthSwitchLink from "@/features/auth/components/AuthSwitchLink";
import LoginButton from "@/features/auth/components/LoginButton";
import ForgotPasswordDialog from "./ForgotPasswordDialog";
import FormContainer from "../layout/FormContainer";
import FormErrorText from "../components/FormErrorText";
import FormHeading from "../components/FormHeading";
import { useLoginForm } from "./hooks/useLoginForm";
import { useResetPasswordDialog } from "./hooks/useResetPasswordDialog";

type LoginFormProps = React.ComponentPropsWithoutRef<"form">;

export default function LoginForm(props: LoginFormProps) {
  const { onSubmit, ...formProps } = props;
  const {
    authUser,
    isLoading,
    email,
    password,
    submitError,
    isSubmitting,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  } = useLoginForm({ onSubmit });

  const {
    isOpen: isResetDialogOpen,
    email: resetEmail,
    error: resetError,
    successMessage: resetSuccessMessage,
    isSubmitting: isResetSubmitting,
    open: openResetDialog,
    close: closeResetDialog,
    handleEmailChange: handleResetEmailChange,
    submit: submitResetPassword,
  } = useResetPasswordDialog(email);

  if (!isLoading && authUser) {
    return null;
  }

  return (
    <FormContainer {...formProps} onSubmit={handleSubmit}>
      <FormHeading>Welcome back</FormHeading>
      <EmailField required value={email} onChange={handleEmailChange} />
      <PasswordField
        required
        autoComplete="current-password"
        value={password}
        onChange={handlePasswordChange}
      />
      <AuthLinkButton onClick={openResetDialog}>
        Forgot your password?
      </AuthLinkButton>
      {submitError ? <FormErrorText>{submitError}</FormErrorText> : null}
      <LoginButton disabled={isSubmitting} />
      <AuthSwitchLink
        promptText="Don't have an account?"
        actionText="Sign up here"
        href="/auth/register"
      />

      <ForgotPasswordDialog
        open={isResetDialogOpen}
        email={resetEmail}
        error={resetError}
        successMessage={resetSuccessMessage}
        isSubmitting={isResetSubmitting}
        onClose={closeResetDialog}
        onEmailChange={handleResetEmailChange}
        onSubmit={submitResetPassword}
      />
    </FormContainer>
  );
}

import * as React from "react";
import EmailField from "@/features/auth/inputs/EmailField";
import PasswordField from "@/features/auth/inputs/PasswordField";
import AuthSwitchLink from "@/features/auth/components/AuthSwitchLink";
import RegisterButton from "@/features/auth/components/RegisterButton";
import PasswordsMatch from "../components/PasswordsMatch";
import FormContainer from "../layout/FormContainer";
import FormErrorText from "../components/FormErrorText";
import FormHeading from "../components/FormHeading";
import { useRegisterForm } from "./useRegisterForm";

type RegisterFormProps = React.ComponentPropsWithoutRef<"form">;

export default function RegisterForm(props: RegisterFormProps) {
  const { onSubmit, ...formProps } = props;
  const {
    authUser,
    isLoading,
    email,
    password,
    confirmPassword,
    confirmTouched,
    submitError,
    isSubmitting,
    passwordsMatch,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleConfirmBlur,
    handleSubmit,
  } = useRegisterForm({ onSubmit });

  if (!isLoading && authUser) {
    return null;
  }

  return (
    <FormContainer {...formProps} onSubmit={handleSubmit}>
      <FormHeading>Create an account</FormHeading>
      <EmailField required value={email} onChange={handleEmailChange} />
      <PasswordField
        required
        value={password}
        onChange={handlePasswordChange}
      />
      <PasswordsMatch
        password={password}
        confirmPassword={confirmPassword}
        confirmTouched={confirmTouched}
        onConfirmPasswordChange={handleConfirmPasswordChange}
        onConfirmBlur={handleConfirmBlur}
      />
      {submitError ? <FormErrorText>{submitError}</FormErrorText> : null}
      <RegisterButton
        disabled={
          isSubmitting || (confirmPassword.length > 0 && !passwordsMatch)
        }
      />
      <AuthSwitchLink
        promptText="Already have an account?"
        actionText="Sign in"
        href="/auth/login"
      />
    </FormContainer>
  );
}

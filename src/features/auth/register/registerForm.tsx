import * as React from "react";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import EmailField from "@/features/auth/inputs/EmailField";
import PasswordField from "@/features/auth/inputs/PasswordField";
import RegisterButton from "@/features/auth/register/RegisterButton";
import PasswordsMatch from "./PasswordsMatch";
import FormContainer from "../layout/FormContainer";
import { signUp } from "@/utils/firebaseServer/firebaseAuth";

type RegisterFormProps = React.ComponentPropsWithoutRef<"form">;

const FormHeading = styled("h1")(({ theme }) => ({
  ...theme.typography.h4,
  textAlign: "center",
  margin: 0,
}));

const FormErrorText = styled("p")(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.error.main,
  margin: 0,
  textAlign: "center",
}));

export default function RegisterForm(props: RegisterFormProps) {
  const { onSubmit, ...formProps } = props;
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [confirmTouched, setConfirmTouched] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const passwordsMatch = password === confirmPassword;

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleConfirmBlur = () => {
    setConfirmTouched(true);
  };

  const handleSubmit: NonNullable<RegisterFormProps["onSubmit"]> = (event) => {
    event.preventDefault();
    void (async () => {
      if (!passwordsMatch) {
        setConfirmTouched(true);
        return;
      }

      if (!email) {
        setSubmitError("Email is required");
        return;
      }

      setSubmitError(null);
      setIsSubmitting(true);

      try {
        await signUp(email, password);
        onSubmit?.(event);
        await router.push("/seller/dashboard");
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to create account";
        setSubmitError(message);
      } finally {
        setIsSubmitting(false);
      }
    })();
  };

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
    </FormContainer>
  );
}

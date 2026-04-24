import * as React from "react";
import { styled } from "@mui/material/styles";
import EmailField from "@/features/auth/inputs/EmailField";
import PasswordField from "@/features/auth/inputs/PasswordField";
import RegisterButton from "@/features/auth/register/RegisterButton";
import FormContainer from "@/features/auth/layout/formContainer";

type RegisterFormProps = React.ComponentPropsWithoutRef<"form">;

const FormHeading = styled("h1")(({ theme }) => ({
  ...theme.typography.h4,
  textAlign: "center",
  margin: 0,
}));

export default function RegisterForm(props: RegisterFormProps) {
  return (
    <FormContainer {...props}>
      <FormHeading>Create an account</FormHeading>
      <EmailField required />
      <PasswordField required />
      <PasswordField
        required
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm password"
        autoComplete="new-password"
      />
      <RegisterButton />
    </FormContainer>
  );
}

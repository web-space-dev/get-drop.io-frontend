import * as React from "react";
import { styled } from "@mui/material/styles";
import EmailField from "@/features/auth/inputs/EmailField";
import PasswordField from "@/features/auth/inputs/PasswordField";
import LoginButton from "@/features/auth/login/LoginButton";
import FormContainer from "../layout/FormContainer";

type LoginFormProps = React.ComponentPropsWithoutRef<"form">;

const FormHeading = styled("h1")(({ theme }) => ({
  ...theme.typography.h4,
  textAlign: "center",
  margin: 0,
}));

const FormSubheading = styled("p")(({ theme }) => ({
  ...theme.typography.body1,
  color: theme.palette.text.secondary,
  textAlign: "center",
  margin: 0,
}));

export default function LoginForm(props: LoginFormProps) {
  return (
    <FormContainer {...props}>
      <FormHeading>Welcome back</FormHeading>
      <FormSubheading>Please sign in to your account</FormSubheading>
      <EmailField required />
      <PasswordField required autoComplete="current-password" />
      <LoginButton />
    </FormContainer>
  );
}

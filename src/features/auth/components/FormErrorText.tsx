import * as React from "react";
import { styled } from "@mui/material/styles";

type FormErrorTextProps = React.ComponentPropsWithoutRef<"p">;

const ErrorText = styled("p")(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.error.main,
  textAlign: "center",
  margin: 0,
}));

export default function FormErrorText({
  children,
  ...props
}: FormErrorTextProps) {
  return <ErrorText {...props}>{children}</ErrorText>;
}

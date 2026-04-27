import * as React from "react";
import { styled } from "@mui/material/styles";

type FormSubheadingProps = React.ComponentPropsWithoutRef<"p">;

const Subheading = styled("p")(({ theme }) => ({
  ...theme.typography.body1,
  color: theme.palette.text.secondary,
  textAlign: "center",
  margin: 0,
}));

export default function FormSubheading({
  children,
  ...props
}: FormSubheadingProps) {
  return <Subheading {...props}>{children}</Subheading>;
}

import * as React from "react";
import { styled } from "@mui/material/styles";

type FormHeadingProps = React.ComponentPropsWithoutRef<"h1">;

const Heading = styled("h1")(({ theme }) => ({
  ...theme.typography.h4,
  textAlign: "center",
  margin: 0,
}));

export default function FormHeading({ children, ...props }: FormHeadingProps) {
  return <Heading {...props}>{children}</Heading>;
}

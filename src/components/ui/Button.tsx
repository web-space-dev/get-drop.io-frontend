import * as React from "react";
import MuiButton, {
  type ButtonProps as MuiButtonProps,
} from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const StyledButton = styled(MuiButton)(({ theme }) => ({
  ...theme.typography.button,
  minHeight: theme.spacing(6),
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1.5, 2),
  boxShadow: "none",
  textTransform: "none",
  "&:hover": {
    boxShadow: "none",
  },
}));

export type ButtonProps = MuiButtonProps;

export default function Button({
  variant = "contained",
  ...props
}: ButtonProps) {
  return <StyledButton variant={variant} {...props} />;
}

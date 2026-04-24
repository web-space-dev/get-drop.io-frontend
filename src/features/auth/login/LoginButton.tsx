import * as React from "react";
import Button, { type ButtonProps } from "@/components/ui/Button";

export type LoginButtonProps = Omit<ButtonProps, "children"> & {
  children?: React.ReactNode;
};

export default function LoginButton({ children, ...props }: LoginButtonProps) {
  return (
    <Button type="submit" fullWidth {...props}>
      {children ?? "Sign in"}
    </Button>
  );
}

import * as React from "react";
import Button, { type ButtonProps } from "@/components/ui/Button";

export type RegisterButtonProps = Omit<ButtonProps, "children"> & {
  children?: React.ReactNode;
};

export default function RegisterButton({ ...props }: RegisterButtonProps) {
  return (
    <Button type="submit" fullWidth {...props}>
      {props.children ?? "Create account"}
    </Button>
  );
}

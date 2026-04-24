import * as React from "react";
import InputField, { type InputFieldProps } from "@/components/ui/InputField";

export type EmailFieldProps = Omit<
  InputFieldProps,
  "label" | "type" | "name" | "id" | "autoComplete"
>;

export default function EmailField(props: EmailFieldProps) {
  return (
    <InputField
      id="email"
      name="email"
      label="Email"
      type="email"
      autoComplete="email"
      {...props}
    />
  );
}

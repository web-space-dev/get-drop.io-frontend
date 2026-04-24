import * as React from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputField, { type InputFieldProps } from "@/components/ui/InputField";

export type PasswordFieldProps = Omit<InputFieldProps, "type">;

export default function PasswordField({
  id = "password",
  name = "password",
  label = "Password",
  autoComplete = "new-password",
  slotProps,
  ...props
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <InputField
      id={id}
      name={name}
      label={label}
      type={showPassword ? "text" : "password"}
      autoComplete={autoComplete}
      slotProps={{
        ...slotProps,
        input: {
          ...(slotProps?.input ?? {}),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={handleTogglePassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      {...props}
    />
  );
}

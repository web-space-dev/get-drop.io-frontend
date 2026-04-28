import { useUser } from "@/context/UserContext";
import Button from "@/shared/components/Button";
import InputField from "@/shared/components/InputField";
import FormContainer from "@/shared/layouts/auth/AuthFormContainer";
import { signUp } from "@/utils/firebaseServer/firebaseAuth";
import { getFriendlyRegisterErrorMessage } from "@/utils/firebaseServer/firebaseErrors";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

type RegisterFormProps = React.ComponentPropsWithoutRef<"form">;
type RegisterFormSubmitHandler = NonNullable<RegisterFormProps["onSubmit"]>;

export default function RegisterForm(props: RegisterFormProps) {
  const router = useRouter();
  const { authUser, isLoading } = useUser();
  const emailInputRef = React.useRef<HTMLInputElement | null>(null);
  const passwordInputRef = React.useRef<HTMLInputElement | null>(null);
  const confirmPasswordInputRef = React.useRef<HTMLInputElement | null>(null);
  const { onSubmit, ...formProps } = props;
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [confirmTouched, setConfirmTouched] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  React.useEffect(() => {
    if (!isLoading && authUser) {
      void router.replace("/seller/dashboard");
    }
  }, [authUser, isLoading, router]);

  const passwordsMatch = password === confirmPassword;

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleConfirmBlur = () => {
    setConfirmTouched(true);
  };

  const handleEmailKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === "ArrowDown") {
      event.preventDefault();
      passwordInputRef.current?.focus();
    }
  };

  const handlePasswordKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      emailInputRef.current?.focus();
      return;
    }

    if (event.key === "Enter" || event.key === "ArrowDown") {
      event.preventDefault();
      confirmPasswordInputRef.current?.focus();
    }
  };

  const handleConfirmPasswordKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      passwordInputRef.current?.focus();
    }
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleSubmit: RegisterFormSubmitHandler = (event) => {
    event.preventDefault();

    void (async () => {
      if (!passwordsMatch) {
        setConfirmTouched(true);
        return;
      }

      if (!email) {
        setSubmitError("Email is required");
        return;
      }

      setSubmitError(null);
      setIsSubmitting(true);

      try {
        await signUp(email, password);
        onSubmit?.(event);
        await router.push("/seller/dashboard");
      } catch (error) {
        setSubmitError(getFriendlyRegisterErrorMessage(error));
        setIsSubmitting(false);
      }
    })();
  };

  const showPasswordMismatch =
    confirmTouched && confirmPassword.length > 0 && !passwordsMatch;

  if (!isLoading && authUser) {
    return null;
  }

  return (
    <FormContainer {...formProps} onSubmit={handleSubmit}>
      <Typography
        component="h1"
        variant="h4"
        sx={{ textAlign: "center", m: 0 }}
      >
        Create an account
      </Typography>
      <InputField
        required
        id="email"
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        inputRef={emailInputRef}
        value={email}
        onChange={handleEmailChange}
        onKeyDown={handleEmailKeyDown}
      />
      <InputField
        required
        id="password"
        name="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        autoComplete="new-password"
        inputRef={passwordInputRef}
        value={password}
        onChange={handlePasswordChange}
        onKeyDown={handlePasswordKeyDown}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((prev) => !prev)}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <InputField
        required
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm password"
        type={showConfirmPassword ? "text" : "password"}
        autoComplete="new-password"
        inputRef={confirmPasswordInputRef}
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        onKeyDown={handleConfirmPasswordKeyDown}
        onBlur={handleConfirmBlur}
        error={showPasswordMismatch}
        helperText={showPasswordMismatch ? "Passwords do not match" : undefined}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      {submitError ? (
        <Typography
          component="p"
          variant="body2"
          color="error.main"
          sx={{ textAlign: "center", m: 0 }}
        >
          {submitError}
        </Typography>
      ) : null}
      <Button
        type="submit"
        fullWidth
        disabled={
          isSubmitting || (confirmPassword.length > 0 && !passwordsMatch)
        }
      >
        Create account
      </Button>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ textAlign: "center", m: 0 }}
      >
        Already have an account?{" "}
        <Link
          component={NextLink}
          href="/auth/login"
          sx={{
            typography: "body2",
            color: "primary.main",
            textDecoration: "underline",
            textDecorationColor: "primary.main",
            textUnderlineOffset: "0.2em",
          }}
        >
          Sign in
        </Link>
      </Typography>
    </FormContainer>
  );
}

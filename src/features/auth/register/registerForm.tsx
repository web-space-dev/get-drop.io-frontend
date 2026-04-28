import { useUser } from "@/context/UserContext";
import Button from "@/shared/components/Button";
import InputField from "@/shared/components/InputField";
import FormContainer from "@/shared/layouts/auth/AuthFormContainer";
import { signUp } from "@/utils/firebaseServer/firebaseAuth";
import {
  getEmailBlurError,
  INVALID_EMAIL_MESSAGE,
  isValidEmail,
} from "@/features/auth/utils/validation";
import { getFriendlyRegisterErrorMessage } from "@/utils/firebaseServer/firebaseErrors";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { FirebaseError } from "firebase/app";
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
  const [emailError, setEmailError] = React.useState<string | null>(null);
  const [passwordError, setPasswordError] = React.useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = React.useState<
    string | null
  >(null);
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
    setEmailError(null);
    setEmail(event.target.value);
  };

  const handleEmailBlur = () => {
    setEmailError(getEmailBlurError(email));
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPasswordError(null);
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setConfirmPasswordError(null);
    setConfirmPassword(event.target.value);
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
      const normalizedEmail = email.trim();
      setEmailError(null);
      setPasswordError(null);
      setConfirmPasswordError(null);

      if (!passwordsMatch) {
        setConfirmPasswordError("Passwords do not match");
        return;
      }

      if (!normalizedEmail) {
        setEmailError("Email is required");
        return;
      }

      if (!isValidEmail(normalizedEmail)) {
        setEmailError(INVALID_EMAIL_MESSAGE);
        return;
      }

      if (!password) {
        setPasswordError("Password is required");
        return;
      }

      if (!confirmPassword) {
        setConfirmPasswordError("Please confirm your password");
        return;
      }
      setIsSubmitting(true);

      try {
        await signUp(normalizedEmail, password);
        onSubmit?.(event);
        await router.push("/seller/dashboard");
      } catch (error) {
        const friendlyMessage = getFriendlyRegisterErrorMessage(error);

        if (error instanceof FirebaseError) {
          switch (error.code) {
            case "auth/email-already-in-use":
            case "auth/invalid-email":
              setEmailError(friendlyMessage);
              break;
            case "auth/weak-password":
              setPasswordError(friendlyMessage);
              break;
            default:
              setEmailError(friendlyMessage);
              break;
          }
        } else {
          setEmailError(friendlyMessage);
        }

        setIsSubmitting(false);
      }
    })();
  };

  const showPasswordMismatch =
    password.length > 0 && confirmPassword.length > 0 && !passwordsMatch;

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
        onBlur={handleEmailBlur}
        onKeyDown={handleEmailKeyDown}
        error={Boolean(emailError)}
        helperText={emailError ?? undefined}
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
        error={Boolean(passwordError)}
        helperText={passwordError ?? undefined}
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
        error={Boolean(confirmPasswordError) || showPasswordMismatch}
        helperText={
          confirmPasswordError ??
          (showPasswordMismatch ? "Passwords do not match" : undefined)
        }
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
      <Button
        type="submit"
        fullWidth
        disabled={
          isSubmitting ||
          !email.trim() ||
          !password ||
          !confirmPassword ||
          !passwordsMatch
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

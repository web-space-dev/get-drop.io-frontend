import { useUser } from "@/context/UserContext";
import ForgotPasswordDialog from "@/features/auth/login/ForgotPasswordDialog";
import {
  INVALID_EMAIL_MESSAGE,
  isValidEmail,
} from "@/features/auth/utils/helpers";
import Button from "@/shared/components/Button";
import InputField from "@/shared/components/InputField";
import { useFieldKeyboardNavigation } from "@/shared/hooks/useFieldKeyboardNavigation";
import FormContainer from "@/shared/layouts/auth/AuthFormContainer";
import {
  resetPassword,
  signInWithEmailAndPassword,
} from "@/utils/firebaseServer/firebaseAuth";
import {
  getFriendlyLoginErrorMessage,
  getFriendlyResetPasswordErrorMessage,
} from "@/utils/firebaseServer/firebaseErrors";
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

type LoginFormProps = React.ComponentPropsWithoutRef<"form">;
type LoginFormSubmitHandler = NonNullable<LoginFormProps["onSubmit"]>;

type NavigableField = "email" | "password";

const FIELD_ORDER: NavigableField[] = ["email", "password"];

const FIELD_IDS: Record<NavigableField, string> = {
  email: "email",
  password: "password",
};

export default function LoginForm(props: LoginFormProps) {
  const router = useRouter();
  const { authUser, isLoading } = useUser();
  const { onSubmit, ...formProps } = props;
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState<string | null>(null);
  const [password, setPassword] = React.useState("");
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const [isResetDialogOpen, setIsResetDialogOpen] = React.useState(false);
  const [resetEmail, setResetEmail] = React.useState("");
  const [resetError, setResetError] = React.useState<string | null>(null);
  const [resetSuccessMessage, setResetSuccessMessage] = React.useState<
    string | null
  >(null);
  const [isResetSubmitting, setIsResetSubmitting] = React.useState(false);

  const { getFieldKeyDownHandler } = useFieldKeyboardNavigation<NavigableField>(
    {
      fieldOrder: FIELD_ORDER,
      fieldIds: FIELD_IDS,
    },
  );

  const normalizedEmail = email.trim();
  const passwordResetSuccessMessage =
    router.query.passwordReset === "success"
      ? "Your password has been successfully reset."
      : null;
  const isLoginFormValid =
    normalizedEmail.length > 0 && isValidEmail(normalizedEmail) && !!password;

  React.useEffect(() => {
    if (!isLoading && authUser) {
      void router.replace("/seller/dashboard");
    }
  }, [authUser, isLoading, router]);

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEmailError(null);
    setEmail(event.target.value);
  };

  const handleEmailBlur = () => {
    const normalizedEmail = email.trim();

    if (normalizedEmail.length === 0) {
      setEmailError(null);
      return;
    }

    if (!isValidEmail(normalizedEmail)) {
      setEmailError(INVALID_EMAIL_MESSAGE);
      return;
    }

    setEmailError(null);
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPassword(event.target.value);
  };

  const handleSubmit: LoginFormSubmitHandler = (event) => {
    event.preventDefault();

    void (async () => {
      const normalizedEmail = email.trim();
      setEmailError(null);

      if (!normalizedEmail) {
        setEmailError("Email is required");
        return;
      }

      if (!isValidEmail(normalizedEmail)) {
        setEmailError(INVALID_EMAIL_MESSAGE);
        return;
      }

      if (!password) {
        setSubmitError("Password is required");
        return;
      }

      setSubmitError(null);
      setIsSubmitting(true);

      try {
        await signInWithEmailAndPassword(normalizedEmail, password);
        onSubmit?.(event);
        await router.push("/seller/dashboard");
      } catch (error) {
        const friendlyMessage = getFriendlyLoginErrorMessage(error);

        if (
          error instanceof FirebaseError &&
          error.code === "auth/invalid-email"
        ) {
          setEmailError(friendlyMessage);
        } else {
          setSubmitError(friendlyMessage);
        }

        setIsSubmitting(false);
      }
    })();
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const openResetDialog = () => {
    setResetEmail(email);
    setResetError(null);
    setResetSuccessMessage(null);
    setIsResetDialogOpen(true);
  };

  const closeResetDialog = () => {
    if (isResetSubmitting) {
      return;
    }

    setIsResetDialogOpen(false);
  };

  const handleResetEmailChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setResetEmail(event.target.value);
  };

  const submitResetPassword = () => {
    void (async () => {
      const normalizedEmail = resetEmail.trim();
      if (!normalizedEmail) {
        setResetError("Email is required");
        return;
      }

      setResetError(null);
      setResetSuccessMessage(null);
      setIsResetSubmitting(true);

      try {
        await resetPassword(normalizedEmail);
        setResetSuccessMessage(
          "If an account exists for this email, a password reset link has been sent.",
        );
        setIsResetSubmitting(false);
      } catch (submissionError) {
        setResetError(getFriendlyResetPasswordErrorMessage(submissionError));
        setIsResetSubmitting(false);
      }
    })();
  };

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
        Welcome back
      </Typography>
      {passwordResetSuccessMessage ? (
        <Typography
          component="p"
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", m: 0 }}
        >
          {passwordResetSuccessMessage}
        </Typography>
      ) : null}
      <InputField
        required
        id="email"
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={handleEmailChange}
        onBlur={handleEmailBlur}
        onKeyDown={getFieldKeyDownHandler("email")}
        error={Boolean(emailError)}
        helperText={emailError ?? undefined}
      />
      <InputField
        required
        id="password"
        name="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        value={password}
        onChange={handlePasswordChange}
        onKeyDown={getFieldKeyDownHandler("password")}
        slotProps={{
          input: {
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
      />
      <Button
        type="button"
        variant="text"
        onClick={openResetDialog}
        sx={{
          typography: "body2",
          color: "primary.main",
          textDecoration: "underline",
          textDecorationColor: "primary.main",
          textUnderlineOffset: "0.2em",
          alignSelf: "center",
          minHeight: 0,
          p: 0,
          "&:hover": {
            backgroundColor: "transparent",
            textDecoration: "underline",
          },
        }}
      >
        Forgot your password?
      </Button>
      {submitError ? (
        <Typography
          component="p"
          variant="body2"
          color="error"
          sx={{ textAlign: "center", m: 0 }}
        >
          {submitError}
        </Typography>
      ) : null}
      <Button
        type="submit"
        fullWidth
        disabled={isSubmitting || !isLoginFormValid}
      >
        Sign in
      </Button>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ textAlign: "center", m: 0 }}
      >
        Do not have an account?{" "}
        <Link
          component={NextLink}
          href="/auth/register"
          sx={{
            typography: "body2",
            color: "primary.main",
            textDecoration: "underline",
            textDecorationColor: "primary.main",
            textUnderlineOffset: "0.2em",
          }}
        >
          Sign up here
        </Link>
      </Typography>

      <ForgotPasswordDialog
        open={isResetDialogOpen}
        email={resetEmail}
        error={resetError}
        successMessage={resetSuccessMessage}
        isSubmitting={isResetSubmitting}
        onClose={closeResetDialog}
        onEmailChange={handleResetEmailChange}
        onSubmit={submitResetPassword}
      />
    </FormContainer>
  );
}

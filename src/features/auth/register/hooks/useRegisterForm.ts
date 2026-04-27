import * as React from "react";
import { useRouter } from "next/router";
import { useUser } from "@/context/UserContext";
import { signUp } from "@/utils/firebaseServer/firebaseAuth";

type RegisterFormSubmitHandler = NonNullable<
  React.ComponentPropsWithoutRef<"form">["onSubmit"]
>;

type UseRegisterFormParams = {
  onSubmit?: RegisterFormSubmitHandler;
};

export function useRegisterForm({ onSubmit }: UseRegisterFormParams) {
  const router = useRouter();
  const { authUser, isLoading } = useUser();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [confirmTouched, setConfirmTouched] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

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
        const message =
          error instanceof Error ? error.message : "Failed to create account";
        setSubmitError(message);
      } finally {
        setIsSubmitting(false);
      }
    })();
  };

  return {
    authUser,
    isLoading,
    email,
    password,
    confirmPassword,
    confirmTouched,
    submitError,
    isSubmitting,
    passwordsMatch,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleConfirmBlur,
    handleSubmit,
  };
}

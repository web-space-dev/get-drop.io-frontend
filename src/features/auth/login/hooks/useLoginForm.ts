import * as React from "react";
import { useRouter } from "next/router";
import { useUser } from "@/context/UserContext";
import { signInWithEmailAndPassword } from "@/utils/firebaseServer/firebaseAuth";
import { getFriendlyLoginErrorMessage } from "@/utils/firebaseServer/firebaseErrors";

type LoginFormSubmitHandler = NonNullable<
  React.ComponentPropsWithoutRef<"form">["onSubmit"]
>;

type UseLoginFormParams = {
  onSubmit?: LoginFormSubmitHandler;
};

export function useLoginForm({ onSubmit }: UseLoginFormParams) {
  const router = useRouter();
  const { authUser, isLoading } = useUser();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (!isLoading && authUser) {
      void router.replace("/seller/dashboard");
    }
  }, [authUser, isLoading, router]);

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

  const handleSubmit: LoginFormSubmitHandler = (event) => {
    event.preventDefault();
    void (async () => {
      if (!email) {
        setSubmitError("Email is required");
        return;
      }

      setSubmitError(null);
      setIsSubmitting(true);

      try {
        await signInWithEmailAndPassword(email, password);
        onSubmit?.(event);
        await router.push("/seller/dashboard");
      } catch (error) {
        setSubmitError(getFriendlyLoginErrorMessage(error));
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
    submitError,
    isSubmitting,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  };
}

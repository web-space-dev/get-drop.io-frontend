import AuthLayout from "@/features/auth/layout/AuthLayout";
import LoginForm from "@/features/auth/login/loginForm";

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}

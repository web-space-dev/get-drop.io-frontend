import LoginForm from "@/features/auth/login/LoginForm";
import AuthLayout from "@/shared/layouts/auth/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}

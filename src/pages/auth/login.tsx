import LoginForm from "@/features/auth/login/Login2Form";
import AuthLayout from "@/shared/layouts/auth/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}

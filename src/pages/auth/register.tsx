import AuthLayout from "@/features/auth/layout/AuthLayout";
import RegisterForm from "@/features/auth/register/registerForm";

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}

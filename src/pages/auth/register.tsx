import RegisterForm from "@/features/auth/register/RegisterForm";
import AuthLayout from "@/shared/layouts/auth/AuthLayout";

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}

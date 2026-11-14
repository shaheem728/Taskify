import AuthLayout from "@/shared/layouts/AuthLayout";
import AuthCard from "@/features/auth/components/AuthCard";
import LoginForm from "@/features/auth/components/Forms/LoginForm";
import RegisterForm from "@/features/auth/components/Forms/RegisterForm";
import ForgotPasswordForm from "@/features/auth/components/Forms/ForgotPasswordForm";
import { useNavigate, useParams } from "react-router-dom";
export default function AuthPage() {
  const { method } = useParams();
  const navigate = useNavigate();
  const mode = method === "register" ? "register" : method === "forgot-password" ? "forgot-password" : "login";

  return (
    <AuthLayout>
      <AuthCard
        active={mode}
        onChange={(nextMode) => navigate(`/auth/${nextMode}`)}
        title={
          mode === "login"
            ? "Welcome back"
            : mode === "register"
              ? "Create your account"
              : "Reset Password"
        }
        subtitle={
          mode === "login"
            ? "Sign in to continue to your workspace."
            : mode === "register"
              ? "Start organizing your work in minutes."
              : "Enter your email to receive a reset link."
        }
      >
        {mode === "login" ? (
          <LoginForm />
        ) : mode === "register" ? (
          <RegisterForm />
        ) : (
          <ForgotPasswordForm />
        )}
      </AuthCard>
    </AuthLayout>
  );
}

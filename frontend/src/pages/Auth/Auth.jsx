import AuthLayout from "../../components/layouts/AuthLayout";
import AuthCard from "../../components/Cards/AuthCard";
import LoginForm from "../../components/Forms/LoginForm";
import RegisterForm from "../../components/Forms/RegisterForm";
import { useNavigate, useParams } from "react-router-dom";
export default function Auth() {
  const { method } = useParams();
  const navigate = useNavigate();
  const mode = method === "register" ? "register" : "login";

  return (
    <AuthLayout>
      <AuthCard
        active={mode}
        onChange={(nextMode) => navigate(`/auth/${nextMode}`)}
        title={
          mode === "login"
            ? "Welcome back"
            : "Create your account"
        }
        subtitle={
          mode === "login"
            ? "Sign in to continue to your workspace."
            : "Start organizing your work in minutes."
        }
      >
        {mode === "login" ? (
          <LoginForm />
        ) : (
          <RegisterForm />
        )}
      </AuthCard>
    </AuthLayout>
  );
}

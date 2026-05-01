import AuthPage from "@/component_pages/AuthPage/AuthPage";
import { PublicRoute } from "@widgets/PublicRoute/PublicRoute";

const Auth = () => (
  <PublicRoute>
    <AuthPage />
  </PublicRoute>
);

export default Auth;

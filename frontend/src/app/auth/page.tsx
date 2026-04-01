import { AuthPage } from "@pages/AuthPage";
import { PublicRoute } from "@widgets/PublicRoute/PublicRoute";

const Auth = () => (
  <PublicRoute>
    <AuthPage />
  </PublicRoute>
);

export default Auth;

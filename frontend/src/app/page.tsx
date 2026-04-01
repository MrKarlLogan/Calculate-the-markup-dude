import { ProtectedRoute } from "@widgets/ProtectedRoute";
import { ConstructorPage } from "@pages/ConstructorPage";

const HomePage = () => (
  <ProtectedRoute>
    <ConstructorPage />
  </ProtectedRoute>
);

export default HomePage;

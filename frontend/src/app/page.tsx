"use client";

import { ProtectedRoute } from "@widgets/ProtectedRoute";
import { ConstructorPage } from "@pages/ConstructorPage";
import { ReduxProvider } from "./store/Provider";

const HomePage = () => (
  <ReduxProvider>
    <ProtectedRoute>
      <ConstructorPage />
    </ProtectedRoute>
  </ReduxProvider>
);

export default HomePage;

"use client";

import { ProtectedRoute } from "@widgets/ProtectedRoute";
import { CalculatorPage } from "@/pages/CalculatorPage";
import { ReduxProvider } from "./store/Provider";

const HomePage = () => (
  <ReduxProvider>
    <ProtectedRoute>
      <CalculatorPage />
    </ProtectedRoute>
  </ReduxProvider>
);

export default HomePage;

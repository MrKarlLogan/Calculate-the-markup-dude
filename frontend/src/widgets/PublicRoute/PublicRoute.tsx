"use client";

import Api from "@shared/api";
import { LoadingPage } from "@pages/LoadingPage/LoadingPage";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { CLIENT_PATH } from "@shared/config/constants";

export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await Api.checkAuth();

        if (result.success) {
          setIsAuthenticated(true);
          router.push(CLIENT_PATH.HOME);
          return;
        }

        setIsAuthenticated(false);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) return <LoadingPage />;
  if (isAuthenticated) return null;

  return children;
};

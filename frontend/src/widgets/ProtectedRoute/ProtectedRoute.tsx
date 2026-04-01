"use client";

import Api from "@shared/api";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { LoadingPage } from "@pages/LoadingPage/LoadingPage";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const getMeResult = await Api.checkAuth();

        if (getMeResult.success) {
          setIsAuth(true);
          setIsLoading(false);
          return;
        }

        const refreshResult = await Api.refreshToken();

        if (refreshResult.success) {
          const newMeResult = await Api.checkAuth();
          if (newMeResult.success) {
            setIsAuth(true);
            setIsLoading(false);
            return;
          }
        }

        router.push("/auth");
      } catch {
        router.push("/auth");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) return <LoadingPage />;
  if (!isAuth) return null;

  return children;
};

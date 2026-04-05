"use client";

import Api from "@/shared/api/AuthApi";
import { LoadingPage } from "@pages/LoadingPage/LoadingPage";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { CLIENT_PATH } from "@shared/config/constants";

export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const getMeResult = await Api.checkAuth();

        if (getMeResult.success) {
          setIsAuth(true);
          router.push(CLIENT_PATH.HOME);
          return;
        }

        const refreshResult = await Api.refreshToken();

        if (refreshResult.success) {
          const newMeResult = await Api.checkAuth();
          if (newMeResult.success) {
            setIsAuth(true);
            router.push(CLIENT_PATH.HOME);
            return;
          }
        }

        setIsAuth(false);
      } catch {
        setIsAuth(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) return <LoadingPage />;
  if (isAuth) return null;

  return children;
};

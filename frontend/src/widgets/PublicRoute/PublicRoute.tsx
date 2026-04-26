"use client";

import authApi from "@/shared/api/authApi";
import { LoadingPage } from "@pages/LoadingPage/LoadingPage";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { CLIENT_PATH } from "@shared/config/constants";

export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const me = await authApi.checkAuth();

        if (me.success) {
          router.replace(CLIENT_PATH.HOME);
          return;
        }
      } catch {}

      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  if (isLoading) return <LoadingPage />;

  return children;
};

"use client";

import Api from "@shared/api";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { LoadingPage } from "@pages/LoadingPage/LoadingPage";
import { useAppDispatch } from "@shared/lib/hooks/redux";
import { setUser } from "@/entities/user/model/userSlice";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const getMeResult = await Api.checkAuth();

        if (getMeResult.success) {
          dispatch(setUser(getMeResult.data));
          setIsAuth(true);
          setIsLoading(false);
          return;
        }

        const refreshResult = await Api.refreshToken();

        if (refreshResult.success) {
          const newMeResult = await Api.checkAuth();
          if (newMeResult.success) {
            dispatch(setUser(newMeResult.data));
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
  }, [router, dispatch]);

  if (isLoading) return <LoadingPage />;
  if (!isAuth) return null;

  return children;
};

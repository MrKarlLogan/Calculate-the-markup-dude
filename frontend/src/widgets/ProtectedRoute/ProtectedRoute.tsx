"use client";

import authApi from "@/shared/api/authApi";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { LoadingPage } from "@pages/LoadingPage/LoadingPage";
import { useAppDispatch } from "@shared/lib/hooks/redux";
import { setUser, clearUser } from "@/entities/user/model/userSlice";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const me = await authApi.checkAuth();

        if (me.success) {
          dispatch(setUser(me.data));
          setIsLoading(false);
          return;
        } else {
          dispatch(clearUser());
          router.replace("/auth");
        }
      } catch {
        dispatch(clearUser());
      }
    };

    checkAuth();
  }, [router, dispatch]);

  if (isLoading) return <LoadingPage />;

  return children;
};

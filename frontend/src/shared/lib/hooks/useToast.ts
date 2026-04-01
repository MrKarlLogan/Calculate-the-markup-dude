"use client";

import { useState, useCallback } from "react";
import { TUseToast } from "./useToast.type";

const useToast = () => {
  const [toasts, setToasts] = useState<TUseToast[]>([]);

  const showToast = useCallback((text: string) => {
    const id = Date.now();
    setToasts([{ text, id }]);
  }, []);

  const removeToast = useCallback(
    (id: number) =>
      setToasts((prev) => prev.filter((toast) => toast.id !== id)),
    [],
  );

  return { toasts, showToast, removeToast };
};

export default useToast;

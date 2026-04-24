import { TApiError } from "@/types/api";

export const getApiErrorMessage = (error: unknown, fallback: string) => {
  const err = error as TApiError;

  return err?.validation?.body?.message || err?.message || fallback;
};

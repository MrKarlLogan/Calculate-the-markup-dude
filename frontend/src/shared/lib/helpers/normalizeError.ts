import { PossibleError, TApiError } from "@/types/api";

export const normalizeError = (error: unknown): TApiError => {
  if (typeof error === "object" && error !== null) {
    const err = error as PossibleError;

    return {
      message:
        err.validation?.body?.message || err.message || "Неизвестная ошибка",
      validation: err.validation,
    };
  }

  if (typeof error === "string") {
    return { message: error };
  }

  return { message: "Неизвестная ошибка" };
};
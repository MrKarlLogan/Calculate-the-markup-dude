export const config = {
  API_URL:
    process.env.NEXT_PUBLIC_API_URL ??
    (() => {
      throw new Error("Переменная NEXT_PUBLIC_API_URL не найдена");
    })(),
} as const;

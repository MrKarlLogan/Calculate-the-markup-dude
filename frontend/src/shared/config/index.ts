export const config = {
  API_URL:
    process.env.NEXT_PUBLIC_API_URL ??
    (() => {
      throw new Error("Переменная NEXT_PUBLIC_API_URL не найдена");
    })(),
  WS_URL:
    process.env.NEXT_PUBLIC_API_URL_WS ??
    (() => {
      throw new Error("Переменная NEXT_PUBLIC_API_URL_WS не найдена");
    })(),
} as const;

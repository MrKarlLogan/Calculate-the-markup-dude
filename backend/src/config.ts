import "dotenv/config";

const requiredVars = [
  "PORT",
  "CLIENT_URL",
  "DB_HOST",
  "DB_PORT",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
] as const;

requiredVars.forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`Не найдена переменная: ${name}. Сервер будет остановлен.`);
  }
});

const config = {
  PORT: process.env.PORT,
  CLIENT_URL: process.env.CLIENT_URL,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: Number(process.env.DB_PORT),
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
};

export default config;

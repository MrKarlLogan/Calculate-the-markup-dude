import "dotenv/config";

const requiredVars = [
  "NODE_ENV",
  "PORT",
  "CLIENT_URL",
  "DB_HOST",
  "DB_PORT",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
  "JWT_SECRET",
  "JWT_REFRESH_SECRET",
  "REGISTRATION_SECRET",
] as const;

requiredVars.forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`Не найдена переменная: ${name}. Сервер будет остановлен.`);
  }
});

const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  CLIENT_URL: process.env.CLIENT_URL,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: Number(process.env.DB_PORT),
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  REGISTRATION_SECRET: process.env.REGISTRATION_SECRET,
};

export default config;

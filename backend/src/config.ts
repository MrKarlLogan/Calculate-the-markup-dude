import "dotenv/config";

const config = {
  PORT: process.env.PORT ?? 6573,
  CLIENT_URL: process.env.CLIENT_URL ?? "http://localhost:5173",
};

export default config;

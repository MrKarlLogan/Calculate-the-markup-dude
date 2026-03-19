import express from "express";
import config from "./config";
import cookieParser from "cookie-parser";
import cors from "cors";
import { AppDataSource } from "./data-source";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: config.CLIENT_URL,
    credentials: true,
  }),
);

// Временный роут
app.use("/", (_req, res) => {
  res.send({ message: "Сервер пока не отдаёт данные, но уже работает" });
});

const boostrap = async () => {
  try {
    await AppDataSource.initialize();

    app.listen(config.PORT, () => {
      console.log("Сервер успешно запущен");
    });
  } catch (error) {
    console.error(`Не удалось запустить сервер. Ошибка: ${error}`);
    process.exit(1);
  }
};

boostrap();

import express from "express";
import config from "./config";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errors } from "celebrate";
import { AppDataSource } from "./data-source";
import { errorHandler } from "@shared/middlewares/error-handler";
import routes from "@routes/app.routes";

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

app.use(routes);

app.use(errors());
app.use(errorHandler);

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

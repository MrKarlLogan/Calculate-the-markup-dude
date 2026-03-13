import express from "express";
import config from "./config";
import routes from "@routes/index";
import cookieParser from "cookie-parser";
import cors from "cors";

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

app.use("/", routes);

const boostrap = async () => {
  try {
    app.listen(config.PORT, () => {
      console.log("Сервер запущен");
    });
  } catch (error) {
    console.warn(`Не удалось запустить сервер. Ошибка: ${error}`);
  }
};

boostrap();

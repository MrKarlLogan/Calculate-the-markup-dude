import { DataSource } from "typeorm";
import config from "./config";
import { Option, Product } from "@modules/product";
import { User } from "@modules/user";
import { Discount } from "@modules/discount";
import { PriceAgreement } from "@modules/agreement";
import { Notification } from "@modules/notification";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  // TO-DO сменить на false при деплое
  // dropSchema: true,
  synchronize: false,
  logging: ["error", "log"],
  entities: [User, Product, Option, Discount, PriceAgreement, Notification],
});

export const ProductRepository = AppDataSource.getRepository(Product);
export const OptionRepository = AppDataSource.getRepository(Option);
export const DiscountRepository = AppDataSource.getRepository(Discount);

import { EntitySchema } from "typeorm";
import { IProduct } from "./index";
import { DB_TABLES } from "@/shared/constants";

export const Product = new EntitySchema<IProduct>({
  name: DB_TABLES.PRODUCT,
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    name: {
      type: "varchar",
    },
  },
  relations: {
    options: {
      type: "one-to-many",
      target: DB_TABLES.OPTION,
      inverseSide: "product",
      cascade: true,
    },
    discounts: {
      type: "one-to-many",
      target: DB_TABLES.DISCOUNT,
      inverseSide: "product",
      cascade: true,
    },
  },
});

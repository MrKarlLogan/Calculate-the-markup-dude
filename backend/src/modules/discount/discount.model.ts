import { EntitySchema } from "typeorm";
import { IDiscount } from "./discount.types";
import { DB_RELATIONS, DB_TABLES } from "@/shared/constants";
import { IProduct } from "../product";

export const Discount = new EntitySchema<
  IDiscount & { productId: string; product: IProduct }
>({
  name: DB_TABLES.DISCOUNT,
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    name: {
      type: "varchar",
    },
    discountAmount: {
      type: "int",
    },
    productId: {
      type: "uuid",
    },
  },
  relations: {
    [DB_RELATIONS.PRODUCT]: {
      type: "many-to-one",
      target: DB_TABLES.PRODUCT,
      joinColumn: { name: "productId" },
    },
  },
});

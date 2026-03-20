import { EntitySchema } from "typeorm";
import { IProduct, TOption } from "./product.types";
import { DB_RELATIONS, DB_TABLES } from "@shared/constants";

export const Option = new EntitySchema<
  TOption & { productId: string; product: IProduct }
>({
  name: DB_TABLES.OPTION,
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    name: {
      type: "varchar",
    },
    price: {
      type: "int",
    },
    cost: {
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

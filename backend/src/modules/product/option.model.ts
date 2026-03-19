import { EntitySchema } from "typeorm";
import { TOption } from "./product.types";
import { DB_TABLES } from "@shared/constants";

export const Option = new EntitySchema<TOption & { productId: string }>({
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
});

import { EntitySchema } from "typeorm";
import { IDiscount } from "./discount.types";
import { DB_TABLES } from "@/shared/constants";

export const Discount = new EntitySchema<IDiscount & { productId: string }>({
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
});

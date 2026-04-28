import { EntitySchema } from "typeorm";
import { IPriceAgreement } from "./priceAgreement.types";
import { DB_TABLES } from "@shared/constants";

export const PriceAgreement = new EntitySchema<IPriceAgreement>({
  name: DB_TABLES.PRICE_AGREEMENT,
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    data: {
      type: "json",
    },
    userId: {
      type: "uuid",
    },
    userName: {
      type: "varchar",
    },
    isAgreed: {
      type: "boolean",
      nullable: true,
    },
    responseMessage: {
      type: "varchar",
      nullable: true,
    },
    created: {
      type: "timestamp",
      createDate: true,
    },
  },
});

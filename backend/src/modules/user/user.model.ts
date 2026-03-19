import { EntitySchema } from "typeorm";
import { IUser } from "./user.types";
import { DB_TABLES } from "@/shared/constants";

export const User = new EntitySchema<IUser>({
  name: DB_TABLES.USER,
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    login: {
      type: "varchar",
      unique: true,
    },
    password: {
      type: "varchar",
    },
    name: {
      type: "varchar",
    },
    role: {
      type: "varchar",
    },
  },
});

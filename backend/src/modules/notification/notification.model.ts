import { EntitySchema } from "typeorm";
import { INotification } from "./notification.types";
import { DB_TABLES } from "@/shared/constants";

export const Notification = new EntitySchema<INotification>({
  name: DB_TABLES.NOTIFICATION,
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    message: {
      type: "varchar",
    },
    created: {
      type: "timestamp",
      createDate: true,
    },
  },
});

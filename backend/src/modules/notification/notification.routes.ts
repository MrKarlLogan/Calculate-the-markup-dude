import { Router } from "express";
import {
  createNotification,
  deleteNotification,
  findNotifications,
  updateNotification,
} from "./notification.controller";
import { notificationValidation } from "./notification.validation";

export const routesNotification = Router();

routesNotification.get("/", findNotifications);
routesNotification.post(
  "/",
  notificationValidation.createNotification(),
  createNotification,
);
routesNotification.put(
  "/:id",
  notificationValidation.updateNotification(),
  updateNotification,
);
routesNotification.delete("/:id", deleteNotification);

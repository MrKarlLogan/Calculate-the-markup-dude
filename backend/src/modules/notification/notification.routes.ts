import { Router } from "express";
import {
  createNotification,
  deleteNotification,
  findNotifications,
  updateNotification,
} from "./notification.controller";
import { notificationValidation } from "./notification.validation";
import { adminMiddleware } from "@shared/middlewares/adminMiddleware";

export const routesNotification = Router();

routesNotification.get("/", findNotifications);
routesNotification.post(
  "/",
  adminMiddleware,
  notificationValidation,
  createNotification,
);
routesNotification.put(
  "/:id",
  adminMiddleware,
  notificationValidation,
  updateNotification,
);
routesNotification.delete("/:id", adminMiddleware, deleteNotification);

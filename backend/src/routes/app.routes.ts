import { Router, type Request, type Response } from "express";
import { ROUTE_PATH } from "@shared/constants";
import { routesProduct } from "@modules/product";
import { routesNotification } from "@modules/notification";
import { routesAgreement } from "@modules/agreement";
import { routesAuth } from "@modules/user";

const routes = Router();

routes.use(ROUTE_PATH.PRODUCTS, routesProduct);
routes.use(ROUTE_PATH.NOTIFICATION, routesNotification);
routes.use(ROUTE_PATH.PRICE_AGREEMENT, routesAgreement);
routes.use(ROUTE_PATH.USERS, routesAuth);

routes.use(ROUTE_PATH.TEST, (_req: Request, res: Response) => {
  res.send({
    status: "Сервер активен",
    current_date: `${new Date().toLocaleTimeString().split(":").slice(0, 2).join(":")} - ${new Date().toLocaleDateString()}`,
  });
});

routes.use(ROUTE_PATH.NOT_FOUND, (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Маршрут ${req.originalUrl} по запросу ${req.method} не найден`,
  });
});

export default routes;

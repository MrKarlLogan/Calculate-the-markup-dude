import { Router } from "express";
import { ROUTE_PATH } from "@/shared/constants";
import { routesProduct } from "@/modules/product";

const routes = Router();

routes.use(ROUTE_PATH.PRODUCTS, routesProduct);
routes.use(ROUTE_PATH.TEST, (_req, res) => {
  res.send({ message: "Сервер активен" });
});

export default routes;

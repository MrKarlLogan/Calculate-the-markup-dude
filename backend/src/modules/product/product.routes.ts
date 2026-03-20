import { Router } from "express";
import {
  createProduct,
  findAllProducts,
  findProductById,
} from "./product.controller";
import { productValidation } from "./product.validation";

export const routesProduct = Router();

routesProduct.get("/", findAllProducts);
routesProduct.get("/:id", findProductById);
routesProduct.post("/", productValidation.createProduct(), createProduct);

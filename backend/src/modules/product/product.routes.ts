import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  findAllProducts,
  findProductById,
  updateProduct,
} from "./product.controller";
import { productValidation } from "./product.validation";

export const routesProduct = Router();

routesProduct.get("/", findAllProducts);
routesProduct.get("/:id", findProductById);
routesProduct.post("/", productValidation.createProduct(), createProduct);
routesProduct.put("/:id", productValidation.updateProduct(), updateProduct);
routesProduct.delete("/:id", deleteProduct);

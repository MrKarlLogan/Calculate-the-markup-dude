import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  findAllProducts,
  findProductById,
  updateProduct,
} from "./product.controller";
import { productValidation } from "./product.validation";
import { adminMiddleware } from "@shared/middlewares/adminMiddleware";

export const routesProduct = Router();

routesProduct.get("/", findAllProducts);
routesProduct.get("/:id", findProductById);
routesProduct.post("/", adminMiddleware, productValidation, createProduct);
routesProduct.put("/:id", adminMiddleware, productValidation, updateProduct);
routesProduct.delete("/:id", adminMiddleware, deleteProduct);

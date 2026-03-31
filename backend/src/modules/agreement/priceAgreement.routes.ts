import { Router } from "express";
import {
  createPriceAgreement,
  deletePriceAgreements,
  findPriceAgreementById,
  findPriceAgreements,
  updatePriceAgreements,
} from "./priceAgreement.controller";
import {
  agreementValidation,
  responseValidation,
} from "./priceAgreement.validation";
import { adminMiddleware } from "@shared/middlewares/adminMiddleware";

export const routesAgreement = Router();

routesAgreement.get("/", findPriceAgreements);
routesAgreement.get("/:id", findPriceAgreementById);
routesAgreement.post("/", agreementValidation, createPriceAgreement);
routesAgreement.patch(
  "/:id",
  adminMiddleware,
  responseValidation,
  updatePriceAgreements,
);
routesAgreement.delete("/:id", deletePriceAgreements);

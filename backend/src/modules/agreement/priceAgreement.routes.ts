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

export const routesAgreement = Router();

routesAgreement.get("/", findPriceAgreements);
routesAgreement.get("/:id", findPriceAgreementById);
routesAgreement.post("/", agreementValidation, createPriceAgreement);
routesAgreement.patch("/:id", responseValidation, updatePriceAgreements);
routesAgreement.delete("/:id", deletePriceAgreements);

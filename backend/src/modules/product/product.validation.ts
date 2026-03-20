import { NAME_FROM_VALIDATION } from "@/shared/constants";
import { celebrate, Joi, Segments } from "celebrate";
import { updateProduct } from "./product.controller";

export const productValidation = {
  createProduct() {
    return celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().min(3).max(20).messages({
          "string.empty": "Наименование товара обязательно",
          "string.min": "Наименование товара должно быть не короче 3 символов",
          "string.max": "Наименование товара не должно превышать 20 символов",
          "any.required": "Наименование товара обязательно",
        }),
        options: Joi.array()
          .items(
            Joi.object().keys({
              name: Joi.string()
                .required()
                .min(2)
                .max(20)
                .messages({
                  "string.empty": `Наименование ${NAME_FROM_VALIDATION.OPTION} обязательно`,
                  "string.min": `Наименование ${NAME_FROM_VALIDATION.OPTION} должно быть не короче 2 символов`,
                  "string.max": `Наименование ${NAME_FROM_VALIDATION.OPTION} не должно превышать 20 символов`,
                }),
              price: Joi.number()
                .integer()
                .positive()
                .required()
                .messages({
                  "number.positive": `${NAME_FROM_VALIDATION.PRICE} не должна быть отрицательной`,
                  "any.required": `Поле ${NAME_FROM_VALIDATION.PRICE} является обязательным`,
                }),
              cost: Joi.number()
                .integer()
                .positive()
                .required()
                .messages({
                  "number.positive": `${NAME_FROM_VALIDATION.COST} не должна быть отрицательной`,
                  "any.required": `Поле ${NAME_FROM_VALIDATION.COST} является обязательным`,
                }),
            }),
          )
          .min(1)
          .required()
          .messages({
            "array.min": `Должна быть хотя бы одна ${NAME_FROM_VALIDATION.OPTION}`,
            "any.required": `Поле ${NAME_FROM_VALIDATION.OPTION} обязательно`,
          }),
        discounts: Joi.array()
          .items(
            Joi.object().keys({
              name: Joi.string()
                .required()
                .min(3)
                .max(50)
                .messages({
                  "string.empty": `Наименование ${NAME_FROM_VALIDATION.DISCOUNT} обязательно`,
                  "string.min": `Наименование ${NAME_FROM_VALIDATION.DISCOUNT} должно быть не короче 3 символов`,
                  "string.max": `Наименование ${NAME_FROM_VALIDATION.DISCOUNT} не должно превышать 50 символов`,
                }),
              discountAmount: Joi.number()
                .integer()
                .positive()
                .required()
                .messages({
                  "number.positive": `${NAME_FROM_VALIDATION.DISCOUNT_AMOUNT} не должна быть отрицательной`,
                  "any.required": `Поле ${NAME_FROM_VALIDATION.DISCOUNT_AMOUNT} является обязательным`,
                }),
            }),
          )
          .optional()
          .default([]),
      }),
    });
  },
  updateProduct() {
    return this.createProduct();
  },
};

import { celebrate, Joi, Segments } from "celebrate";
import { NAME_FROM_VALIDATION } from "@shared/constants";

export const agreementValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    data: Joi.object()
      .keys({
        product: Joi.object()
          .keys({
            id: Joi.string().required().uuid(),
            name: Joi.string().required(),
          })
          .required(),
        option: Joi.object()
          .keys({
            id: Joi.string().required().uuid(),
            name: Joi.string().required(),
            price: Joi.number().integer().positive().required(),
            cost: Joi.number().integer().positive().required(),
            productId: Joi.string().required().uuid(),
          })
          .required(),
        discounts: Joi.array().default([]),
        otherDiscount: Joi.array()
          .items(
            Joi.object().keys({
              id: Joi.string()
                .uuid()
                .required()
                .messages({
                  "string.empty": `ID ${NAME_FROM_VALIDATION.DISCOUNT_OTHER} обязателен`,
                  "string.guid": `ID ${NAME_FROM_VALIDATION.DISCOUNT_OTHER} должен быть в формате UUID`,
                  "any.required": `ID ${NAME_FROM_VALIDATION.DISCOUNT_OTHER} обязателен`,
                }),
              name: Joi.string()
                .required()
                .min(3)
                .max(30)
                .messages({
                  "string.empty": `Название ${NAME_FROM_VALIDATION.DISCOUNT_OTHER} обязательно`,
                  "string.min": `Название ${NAME_FROM_VALIDATION.DISCOUNT_OTHER} должно быть не короче 3 символов`,
                  "string.max": `Название ${NAME_FROM_VALIDATION.DISCOUNT_OTHER} не должно превышать 30 символов`,
                  "any.required": `Название ${NAME_FROM_VALIDATION.DISCOUNT_OTHER} обязательно`,
                }),
              type: Joi.string()
                .valid("increment", "decrement")
                .required()
                .messages({
                  "any.only":
                    'Тип должен быть "increment" (увеличение) или "decrement" (уменьшение)',
                  "any.required": `Тип ${NAME_FROM_VALIDATION.DISCOUNT_OTHER} обязателен`,
                }),
              amount: Joi.number()
                .integer()
                .required()
                .messages({
                  "number.base": `Сумма ${NAME_FROM_VALIDATION.DISCOUNT_OTHER} должна быть числом`,
                  "number.integer": `Сумма ${NAME_FROM_VALIDATION.DISCOUNT_OTHER} должна быть целым числом`,
                  "any.required": `Сумма ${NAME_FROM_VALIDATION.DISCOUNT_OTHER} обязательна`,
                }),
            }),
          )
          .default([]),
        message: Joi.string().max(300).allow("").default("").messages({
          "string.max": "Текст сообщения не должен превышать 300 символов",
        }),
        total: Joi.number().integer().required(),
      })
      .required(),
    isAgreed: Joi.valid(null).required(),
  }),
});

export const responseValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    responseMessage: Joi.string().allow("").max(300).optional().messages({
      "string.max": "Текст сообщения не должен превышать 300 символов",
    }),
    isAgreed: Joi.boolean().required().messages({
      "any.required": "Поле 'статус' обязательно",
      "boolean.base": "Поле 'статус' должно быть true или false",
    }),
  }),
});

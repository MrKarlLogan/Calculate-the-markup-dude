import { celebrate, Joi, Segments } from "celebrate";

export const agreementValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    data: Joi.object()
      .keys({
        product: Joi.string().required().messages({
          "any.required": "Поле 'product' обязательно",
          "string.empty": "Название продукта не может быть пустым",
        }),
        option: Joi.string().required().messages({
          "any.required": "Поле 'option' обязательно",
          "string.empty": "Название комплектации не может быть пустым",
        }),
        discounts: Joi.array().items(Joi.string()).default([]),
        otherDiscount: Joi.object()
          .keys({
            creditDiscount: Joi.number().min(0).default(0),
            otherDiscount: Joi.number().min(0).default(0),
            additionalEquipment: Joi.number().min(0).default(0),
          })
          .default({}),
        plannedProfit: Joi.number().required().messages({
          "any.required": "Поле 'plannedProfit' обязательно",
          "number.base": "Поле 'plannedProfit' должно быть числом",
        }),
        message: Joi.string().max(500).allow("").default("").trim().messages({
          "string.max": "Текст сообщения не должен превышать 500 символов",
        }),
        total: Joi.number().required().messages({
          "any.required": "Поле 'total' обязательно",
          "number.base": "Поле 'total' должно быть числом",
        }),
      })
      .required(),
    userName: Joi.string().required().messages({
      "any.required": "Поле 'userName' обязательно",
      "string.empty": "Имя пользователя не может быть пустым",
    }),
    isAgreed: Joi.valid(null).optional(),
    responseMessage: Joi.optional(),
  }),
});

export const responseValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    responseMessage: Joi.string()
      .allow("")
      .max(500)
      .optional()
      .trim()
      .messages({
        "string.max": "Текст сообщения не должен превышать 500 символов",
      }),
    isAgreed: Joi.boolean().required().messages({
      "any.required": "Поле 'isAgreed' обязательно",
      "boolean.base": "Поле 'isAgreed' должно быть true или false",
    }),
  }),
});

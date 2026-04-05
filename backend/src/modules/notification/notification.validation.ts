import { celebrate, Joi, Segments } from "celebrate";

export const notificationValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    message: Joi.string().trim().required().min(3).max(300).messages({
      "string.empty": "Текст сообщения обязателен",
      "string.min": "Текст сообщения должен быть не короче 3 символов",
      "string.max": "Текст сообщения не должен превышать 300 символов",
      "any.required": "Текст сообщения обязателен",
    }),
  }),
});

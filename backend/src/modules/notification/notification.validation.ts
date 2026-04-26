import { celebrate, Joi, Segments } from "celebrate";

export const notificationValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    author: Joi.string().trim().required().min(3).max(30).messages({
      "string.empty": "Указание автора обязательно",
      "string.min": "Имя автора должно быть не менее 3 символов",
      "string.max": "Имя автора не должно превышать 300 символов",
      "any.required": "Указание автора обязательно",
    }),
    message: Joi.string().trim().required().min(3).max(300).messages({
      "string.empty": "Текст сообщения обязателен",
      "string.min": "Текст сообщения должен быть не менее 3 символов",
      "string.max": "Текст сообщения не должен превышать 300 символов",
      "any.required": "Текст сообщения обязателен",
    }),
  }),
});

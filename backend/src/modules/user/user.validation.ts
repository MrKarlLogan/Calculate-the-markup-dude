import { celebrate, Joi, Segments } from "celebrate";

export const registerValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    login: Joi.string().required().min(3).max(20).messages({
      "any.required": "Поле 'Логин' обязательно",
      "string.empty": "Поле 'Логин' обязательно",
      "string.min": "Логин должен быть не короче 3 символов",
      "string.max": "Логин не должен превышать 20 символов",
    }),
    password: Joi.string().required().min(6).max(20).messages({
      "any.required": "Поле 'Пароль' обязательно",
      "string.empty": "Поле 'Пароль' обязательно",
      "string.min": "Пароль должен быть не короче 6 символов",
      "string.max": "Пароль не должен превышать 20 символов",
    }),
    name: Joi.string().required().min(2).max(20).messages({
      "any.required": "Поле 'Имя' обязательно",
      "string.empty": "Поле 'Имя' обязательно",
      "string.min": "Имя должно быть не короче 2 символов",
      "string.max": "Имя не должно превышать 20 символов",
    }),
    role: Joi.string().valid("admin", "others").default("others").messages({
      "any.only": "Роль может быть только 'Администратор' или 'Пользователь'",
    }),
    registrationPassword: Joi.string().valid().messages({
      "any.required": "Поле 'Пароль администратора' обязателен",
    }),
  }),
});

export const loginValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    login: Joi.string().required().messages({
      "any.required": "Поле 'Логин' обязательно",
      "string.empty": "Поле 'Логин' обязателен",
    }),
    password: Joi.string().required().messages({
      "any.required": "Поле 'Пароль' обязательно",
      "string.empty": "Поле 'Пароль' обязателен",
    }),
  }),
});

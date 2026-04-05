import { celebrate, Joi, Segments } from "celebrate";

export const registerValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    login: Joi.string()
      .trim()
      .required()
      .min(3)
      .max(20)
      .pattern(/^[a-zA-Z0-9._-]+$/)
      .messages({
        "any.required": "Поле 'Логин' обязательно",
        "string.empty": "Поле 'Логин' обязательно",
        "string.min": "Логин должен быть не короче 3 символов",
        "string.max": "Логин не должен превышать 20 символов",
        "string.pattern.base":
          "Логин может содержать только латинские буквы, цифры, точки, дефисы и нижнее подчёркивание",
      }),
    password: Joi.string()
      .required()
      .min(6)
      .max(20)
      .pattern(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
      )
      .messages({
        "any.required": "Поле 'Пароль' обязательно",
        "string.empty": "Поле 'Пароль' обязательно",
        "string.min": "Пароль должен быть не короче 6 символов",
        "string.max": "Пароль не должен превышать 20 символов",
        "string.pattern.base":
          "Пароль должен состоять из латинских букв и содержать хотя бы одну заглавную букву, одну цифру и один специальный символ",
      }),
    name: Joi.string().required().min(2).max(50).trim().messages({
      "any.required": "Поле 'Имя' обязательно",
      "string.empty": "Поле 'Имя' обязательно",
      "string.min": "Имя должно быть не короче 2 символов",
      "string.max": "Имя не должно превышать 50 символов",
    }),
    role: Joi.string().valid("admin", "others").default("others").messages({
      "any.only": "Роль может быть только 'Администратор' или 'Пользователь'",
    }),
    registrationPassword: Joi.string().required().messages({
      "any.required": "Поле 'Пароль администратора' обязательно",
      "string.empty": "Поле 'Пароль администратора' обязательно",
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

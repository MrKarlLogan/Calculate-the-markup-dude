export const DB_TABLES = {
  PRODUCT: "product",
  OPTION: "option",
  DISCOUNT: "discount",
  USER: "user",
  NOTIFICATION: "notification",
  PRICE_AGREEMENT: "price_agreement",
} as const;

export const DB_RELATIONS = {
  PRODUCT: "product",
  OPTIONS: "options",
  DISCOUNTS: "discounts",
} as const;

export const USER_ROLES = {
  ADMIN: "admin",
  OTHERS: "others",
} as const;

export const ROUTE_PATH = {
  TEST: "/test",
  PRODUCTS: "/products",
  NOTIFICATION: "/notification",
  PRICE_AGREEMENT: "/agreement",
  USERS: "/auth",
  NOT_FOUND: "/*path",
} as const;

export const NAME_FROM_VALIDATION = {
  OPTION: "Комплектация",
  PRICE: "Прайсовая стоимость",
  COST: "Себестоимость",
  DISCOUNT: "Скидка от импортера",
  DISCOUNT_AMOUNT: "Сумма скидки",
  DISCOUNT_OTHER: "Дополнительной скидки",
} as const;

export const NOTIFICATION_OPTIONS = {
  MAX_LENGTH: 5,
} as const;

export const AGREEMENT_OPTIONS = {
  MAX_LENGTH: 30,
} as const;

export const COOKIES_NAME = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
} as const;

export const WEBSOCKET_EVENT_NAME = {
  CREATED: "agreement:created",
  UPDATED: "agreement:updated",
  DELETED: "agreement:deleted",
} as const;

export const WEBSOCKET_MESSAGE_TYPE = {
  JOIN_ADMIN: "join:admin",
  JOIN_USER: "join:user",
  PING: "ping",
  PONG: "pong",
} as const;

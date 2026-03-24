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
  NOT_FOUND: "/*path",
} as const;

export const NAME_FROM_VALIDATION = {
  OPTION: "Комплектация",
  PRICE: "Прайсовая стоимость",
  COST: "Себестоимость",
  DISCOUNT: "Скидка от импортера",
  DISCOUNT_AMOUNT: "Сумма скидки",
};

export const NOTIFICATION_OPTIONS = {
  MAX_LENGTH: 5,
};

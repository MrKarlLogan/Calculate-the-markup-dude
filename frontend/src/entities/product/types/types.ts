export type TDiscount = {
  id: string;
  name: string;
  discountAmount: number;
};

export type TOption = {
  id: string;
  name: string;
  price: number;
  cost: number;
};

export type TProduct = {
  id: string;
  name: string;
  options: TOption[];
  discounts: TDiscount[];
};

export type TProductsResponse = {
  success: boolean;
  data: TProduct[];
};

export type TProductsState = {
  products: TProduct[];
  loading: boolean;
  error: string | null;
};

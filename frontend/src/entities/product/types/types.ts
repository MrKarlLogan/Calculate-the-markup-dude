import { TValidationError } from "@/types/api";

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

export type TCreateProductResponse = {
  success: boolean;
  data?: TProduct;
  message?: string;
  validation?: TValidationError["validation"];
};

export type TUpdateProductResponse = {
  success: boolean;
  data: TProduct;
  message: string;
  validation?: TValidationError["validation"];
};

export type TDeleteProductResponse = {
  success: boolean;
  message: string;
};

export type TProductsState = {
  products: TProduct[];
  loading: boolean;
  editing: boolean;
  error: string | null;
};

export type TOptionRequest = Omit<TOption, "id">;
export type TDiscountRequest = Omit<TDiscount, "id">;

export type TProductRequest = {
  name: string;
  options: TOptionRequest[];
  discounts: TDiscountRequest[];
};

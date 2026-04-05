export interface IDiscount {
  id: string;
  name: string;
  discountAmount: number;
}

export interface TOption {
  id: string;
  name: string;
  price: number;
  cost: number;
}

export interface IProduct {
  id: string;
  name: string;
  options: TOption[];
  discounts: IDiscount[];
}

export interface IProductsResponse {
  success: boolean;
  data: IProduct[];
}

export interface IProductsState {
  products: IProduct[];
  loading: boolean;
  error: string | null;
}

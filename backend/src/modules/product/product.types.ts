import { IDiscount } from "@discount/discount.types";

export type TOption = {
  id: string;
  name: string;
  price: number;
  cost: number;
  productId: string;
};

export interface IProduct {
  id: string;
  name: string;
  options: TOption[];
  discounts: IDiscount[];
}

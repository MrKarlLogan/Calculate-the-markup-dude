import { IDiscount } from "./discount.types";

type TOption = {
  id: string;
  name: string;
  price: number;
  cost: number;
};

export interface IProduct {
  id: string;
  name: string;
  options: TOption[];
  discounts: IDiscount[];
}

import { IDiscount } from "./discount.types";

export interface IPriceAgreement {
  id: string;
  name: string;
  option: string;
  discounts: IDiscount[];
  total: number;
  isAgreed: boolean;
}

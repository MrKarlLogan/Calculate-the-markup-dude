import { IDiscount, TOtherDiscount } from "../discount";
import { TOption } from "../product";

type TAgreementData = {
  product: {
    id: string;
    name: string;
  };
  option: TOption;
  discounts: IDiscount[];
  otherDiscount: TOtherDiscount[];
  message: string;
  total: number;
};

export interface IPriceAgreement {
  id: string;
  data: TAgreementData;
  userId: string;
  isAgreed: boolean | null;
  responseMessage?: string | null;
  created: string;
}

export type TResponseAgreement = {
  responseMessage: string | null;
  isAgreed: boolean;
};

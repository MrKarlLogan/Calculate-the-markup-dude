type TAgreementData = {
  product: string;
  option: string;
  discounts: string[];
  otherDiscount: {
    creditDiscount?: number;
    otherDiscount?: number;
    additionalEquipment?: number | null;
  };
  plannedProfit: number;
  message?: string;
  total: number;
};

export interface IPriceAgreement {
  id: string;
  data: TAgreementData;
  userId: string;
  userName: string;
  isAgreed: boolean | null;
  responseMessage?: string | null;
  created: string;
}

export type TResponseAgreement = {
  responseMessage: string | null;
  isAgreed: boolean;
};

export type TAgreementData = {
  product: string;
  option: string;
  discounts: string[];
  otherDiscount: {
    creditDiscount?: number;
    otherDiscount?: number;
    additionalEquipment?: number;
  };
  plannedProfit: number;
  message?: string;
  total: number;
};

export type TCreateAgreementRequest = {
  data: TAgreementData;
  userName: string;
};

export type TUpdateAgreementPayload = {
  isAgreed: boolean;
  responseMessage: string;
};

export type TAgreement = {
  id: string;
  data: TAgreementData;
  userId: string;
  userName: string;
  isAgreed: boolean | null;
  responseMessage: string | null;
  created: string;
};

export type TAgreementsResponse = {
  success: boolean;
  data: TAgreement[];
};

export type TAgreementResponse = {
  success: boolean;
  data: TAgreement;
};

export type TDeleteAgreementResponse = {
  success: boolean;
  message: string;
};

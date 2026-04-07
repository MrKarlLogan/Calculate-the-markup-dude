export type TCalculator = {
  modelId: string | null;
  optionId: string | null;
  selectedDiscountIds: string[];
  creditDiscount: number;
  otherDiscount: number;
  additionalEquipment: number;
  plannedProfit: number;
  customPrice: number;
  message: string;
};

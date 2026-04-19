type DiscountDirection = "increment" | "decrement";

export type TOtherDiscount = {
  id: string;
  name: string;
  type: DiscountDirection;
  amount: number;
};

export interface IDiscount {
  id: string;
  name: string;
  discountAmount: number;
  productId: string;
}

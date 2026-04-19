import { TDiscount } from "@entities/product/types/types";
import { Dispatch, SetStateAction } from "react";

export type TDiscountEdit = Omit<TDiscount, "id">;

export type TInputsDiscounts = {
  isCreated?: boolean;
  created?: {
    value: TDiscountEdit;
    onChange: Dispatch<SetStateAction<TDiscountEdit>>;
    onCreate: () => void;
  };
  discounts?: TDiscount;
  onChange?: (field: string, value: string | number) => void;
  onDelete?: () => void;
};

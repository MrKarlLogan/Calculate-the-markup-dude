import { TOption } from "@/entities/product/types/types";
import { Dispatch, SetStateAction } from "react";

export type TOptionEdit = Omit<TOption, "id">;

export type TInputsOptions = {
  isCreated?: boolean;
  created?: {
    value: TOptionEdit;
    onChange: Dispatch<SetStateAction<TOptionEdit>>;
    onCreate: () => void;
  };
  option?: TOption;
  onChange?: (field: string, value: string | number) => void;
};

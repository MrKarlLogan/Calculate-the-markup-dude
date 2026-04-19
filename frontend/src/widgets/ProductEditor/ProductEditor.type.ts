import { Dispatch, SetStateAction } from "react";
import { TConstructor } from "../Constructor/Constructor.type";

export type TProductEditor = {
  productId: string;
  showToast?: (text: string) => void;
  hasChange: Dispatch<SetStateAction<boolean>>;
  createdProduct: {
    state: boolean;
    dispatch: Dispatch<SetStateAction<boolean>>;
  };
  changeProduct: {
    initialState: TConstructor;
    dispatch: Dispatch<SetStateAction<TConstructor>>;
  };
};

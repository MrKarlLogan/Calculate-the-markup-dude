import { TConstructor } from "../Constructor/Constructor.type";
import { Dispatch, SetStateAction } from "react";

export type TProductEditor = {
  product: TConstructor;
  createdProduct: {
    state: boolean;
    dispatch: Dispatch<SetStateAction<boolean>>;
  };
  changeProduct: {
    initialState: TConstructor;
    dispatch: Dispatch<SetStateAction<TConstructor>>;
  };
};

import { InputHTMLAttributes } from "react";

export type TCheckbox = InputHTMLAttributes<HTMLInputElement> & {
  text: string;
  name: string;
};

import { InputHTMLAttributes } from "react";

export type TPasswordInput = InputHTMLAttributes<HTMLInputElement> & {
  text: string;
  placeholder?: string;
};

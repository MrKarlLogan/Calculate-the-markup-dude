import { InputHTMLAttributes } from "react";

export type TTextInput = InputHTMLAttributes<HTMLInputElement> & {
  text: string;
  placeholder?: string;
};

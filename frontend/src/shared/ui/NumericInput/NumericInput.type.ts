import { InputHTMLAttributes } from "react";

export type TNumericInput = InputHTMLAttributes<HTMLInputElement> & {
  text: string;
  maxLength?: number;
  placeholder?: string;
  unit?: string;
};

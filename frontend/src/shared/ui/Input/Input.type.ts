import { InputHTMLAttributes } from "react";

export type TInput = InputHTMLAttributes<HTMLInputElement> & {
  text: string;
  type?: "text" | "password" | "number";
  maxLength?: number;
  placeholder?: string;
};

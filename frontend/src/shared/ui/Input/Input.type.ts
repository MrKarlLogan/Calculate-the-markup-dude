import { InputHTMLAttributes } from "react";

export type TInput = InputHTMLAttributes<HTMLInputElement> & {
  text: string;
  type?: "text" | "password" | "number";
  placeholder?: string;
};

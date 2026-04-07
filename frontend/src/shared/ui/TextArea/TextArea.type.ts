import { TextareaHTMLAttributes } from "react";

export type TTextArea = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  cols?: number;
  rows?: number;
  placeholder?: string;
};

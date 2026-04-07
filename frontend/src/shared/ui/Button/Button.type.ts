import { ButtonHTMLAttributes } from "react";

export type TButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
};

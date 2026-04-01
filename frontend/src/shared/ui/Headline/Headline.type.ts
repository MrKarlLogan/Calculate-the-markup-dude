import { ReactNode } from "react";

export type THeadline = {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  size?: number;
  weight?: "regular" | "bold";
  position?: "start" | "center" | "end";
};

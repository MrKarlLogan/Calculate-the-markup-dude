import { ReactNode } from "react";

export type TParagraph = {
  children: ReactNode;
  className?: string;
  size?: number;
  weight?: "regular" | "bold";
  position?: "start" | "center" | "end";
};

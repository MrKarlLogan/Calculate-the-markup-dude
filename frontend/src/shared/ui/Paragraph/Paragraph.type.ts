export interface IParagraph {
  children: string;
  className?: string;
  size?: number;
  weight?: "regular" | "bold";
  position?: "start" | "center" | "end";
}

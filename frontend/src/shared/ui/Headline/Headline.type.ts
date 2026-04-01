export interface IHeadline {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  size?: number;
  weight?: "regular" | "bold";
  position?: "start" | "center" | "end";
}

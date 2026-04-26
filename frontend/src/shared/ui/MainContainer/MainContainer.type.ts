import { ComponentProps, ReactNode } from "react";

export type TMainContainer = {
  title: string;
  children: ReactNode;
} & ComponentProps<"div">;

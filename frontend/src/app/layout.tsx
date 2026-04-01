import type { Metadata } from "next";
import { ReactNode } from "react";
import "./styles/index.scss";

export const metadata: Metadata = {
  title: "",
  description: "",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;

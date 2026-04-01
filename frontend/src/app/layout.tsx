import type { Metadata } from "next";
import "./styles/index.scss";

export const metadata: Metadata = {
  title: "",
  description: "",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;

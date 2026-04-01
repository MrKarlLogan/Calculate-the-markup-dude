import type { Metadata } from "next";
import { ReactNode } from "react";
import "./styles/index.scss";

export const metadata: Metadata = {
  title: "Calculate the markup, dude",
  description:
    "Внутренний инструмент для расчёта маржинальной стоимости товаров с учётом акций. Согласование сделок, управление позициями, уведомления в реальном времени.",
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

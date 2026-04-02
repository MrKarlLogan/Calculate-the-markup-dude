import { ReactNode } from "react";
import styles from "./MainLayout.module.scss";
import { Footer } from "@widgets/Footer";

export const MainLayout = ({
  children,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={styles.container}>
    {children}
    <Footer />
  </div>
);

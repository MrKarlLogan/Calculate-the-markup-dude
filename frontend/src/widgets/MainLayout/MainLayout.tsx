import { ReactNode } from "react";
import styles from "./MainLayout.module.scss";

export const MainLayout = ({
  children,
}: {
  children: ReactNode;
  className?: string;
}) => <div className={styles.container}>{children}</div>;

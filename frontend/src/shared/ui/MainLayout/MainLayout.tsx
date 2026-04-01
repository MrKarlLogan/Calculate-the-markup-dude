import { ReactNode } from "react";
import styles from "./MainLayout.module.scss";

export const MainLayout = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <main className={`${styles.main} ${className}`}>{children}</main>;

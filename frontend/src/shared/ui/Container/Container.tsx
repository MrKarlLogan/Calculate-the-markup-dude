import { ReactNode } from "react";
import styles from "./Container.module.scss";

export const Container = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => <div className={`${styles.container} ${className}`}>{children}</div>;

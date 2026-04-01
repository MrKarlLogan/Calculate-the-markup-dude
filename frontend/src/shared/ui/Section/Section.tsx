import { ReactNode } from "react";
import styles from "./Section.module.scss";

export const Section = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <section className={`${styles.section} ${className}`}>{children}</section>
);

import styles from "./Section.module.scss";

export const Section = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <section className={`${styles.section} ${className}`}>{children}</section>
);

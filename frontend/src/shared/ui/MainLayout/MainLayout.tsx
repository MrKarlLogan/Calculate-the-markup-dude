import styles from "./MainLayout.module.scss";

export const MainLayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <main className={`${styles.main} ${className}`}>{children}</main>;

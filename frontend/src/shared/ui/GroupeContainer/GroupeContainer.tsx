import { TGroupeContainer } from "./GroupeContainer.type";
import styles from "./GroupeContainer.module.scss";

export const GroupeContainer = ({
  title,
  className,
  disabled = false,
  children,
}: TGroupeContainer) => (
  <fieldset className={`${styles.fieldset} ${className}`} disabled={disabled}>
    <legend className={styles.legend}>{title}</legend>
    {children}
  </fieldset>
);

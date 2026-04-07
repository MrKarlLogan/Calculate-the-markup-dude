import { TGroupeContainer } from "./GroupeContainer.type";
import styles from "./GroupeContainer.module.scss";

export const GroupeContainer = ({
  text,
  className,
  disabled = false,
  children,
}: TGroupeContainer) => {
  return (
    <fieldset className={`${styles.fieldset} ${className}`} disabled={disabled}>
      <legend className={styles.legend}>{text}</legend>
      {children}
    </fieldset>
  );
};

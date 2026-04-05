import { TGroupeContainer } from "./GroupeContainer.type";
import styles from "./GroupeContainer.module.scss";

export const GroupeContainer = ({
  text,
  className,
  children,
}: TGroupeContainer) => {
  return (
    <fieldset className={`${styles.fieldset} ${className}`}>
      <legend className={styles.legend}>{text}</legend>
      {children}
    </fieldset>
  );
};

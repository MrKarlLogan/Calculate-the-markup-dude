import { TGroupeContainer } from "./GroupeContainer.type";
import styles from "./GroupeContainer.module.scss";

export const GroupeContainer = ({ text, children }: TGroupeContainer) => {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>{text}</legend>
      {children}
    </fieldset>
  );
};

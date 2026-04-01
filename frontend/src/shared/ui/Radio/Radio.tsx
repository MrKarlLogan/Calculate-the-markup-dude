import styles from "./Radio.module.scss";
import { TCheckbox } from "./Radio.type";

export const Radio = ({ text, name, ...otherProps }: TCheckbox) => (
  <label className={styles.radio}>
    <input
      {...otherProps}
      name={name}
      type="radio"
      className={styles.input_radio}
    />
    <span>{text}</span>
  </label>
);

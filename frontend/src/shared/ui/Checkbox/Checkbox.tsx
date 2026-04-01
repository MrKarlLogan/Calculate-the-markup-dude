import { TCheckbox } from "./Checkbox.type";
import styles from "./Checkbox.module.scss";

export const Checkbox = ({ text, ...otherProps }: TCheckbox) => (
  <label className={styles.checkbox}>
    <input {...otherProps} type="checkbox" className={styles.input_checkbox} />
    <span>{text}</span>
  </label>
);

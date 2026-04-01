import styles from "./Button.module.scss";
import { TButton } from "./Button.type";

export const Button = ({ text, onClick, ...otherProps }: TButton) => (
  <button {...otherProps} className={styles.button} onClick={onClick}>
    {text}
  </button>
);

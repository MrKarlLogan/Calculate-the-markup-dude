import styles from "./Button.module.scss";
import { TButton } from "./Button.type";

export const Button = ({
  text,
  onClick,
  type = "button",
  ...otherProps
}: TButton) => (
  <button
    {...otherProps}
    className={styles.button}
    type={type}
    onClick={onClick}
  >
    {text}
  </button>
);

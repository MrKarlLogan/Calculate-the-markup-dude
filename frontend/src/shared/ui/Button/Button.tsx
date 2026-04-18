import styles from "./Button.module.scss";
import { TButton } from "./Button.type";

export const Button = ({
  text,
  onClick,
  type = "button",
  className,
  ...otherProps
}: TButton) => (
  <button
    {...otherProps}
    className={`${styles.button} ${className}`}
    type={type}
    onClick={onClick}
  >
    {text}
  </button>
);

import type { InputHTMLAttributes } from "react";
import styles from "./Checkbox.module.scss";

type TCheckbox = InputHTMLAttributes<HTMLInputElement> & {
  text: string;
};

export const Checkbox = (props: TCheckbox) => {
  const { text, ...otherProps } = props;

  return (
    <label className={styles.checkbox}>
      <input
        {...otherProps}
        type="checkbox"
        className={styles.input_checkbox}
      />
      <span>{text}</span>
    </label>
  );
};

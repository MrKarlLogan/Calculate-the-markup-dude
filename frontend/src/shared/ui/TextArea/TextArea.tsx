import type { TextareaHTMLAttributes } from "react";
import styles from "./TextArea.module.scss";

type TTextArea = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  cols?: number;
  rows?: number;
  placeholder?: string;
};

export const TextArea = (props: TTextArea) => {
  const {
    cols,
    rows,
    placeholder = "Начните писать сообщение...",
    ...otherProps
  } = props;

  return (
    <textarea
      {...otherProps}
      cols={cols}
      rows={rows}
      placeholder={placeholder}
      className={styles.textarea}
    ></textarea>
  );
};

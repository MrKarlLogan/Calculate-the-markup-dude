import styles from "./TextArea.module.scss";
import { TTextArea } from "./TextArea.type";

export const TextArea = ({
  cols,
  rows,
  placeholder = "Начните писать сообщение...",
  ...otherProps
}: TTextArea) => (
  <textarea
    {...otherProps}
    cols={cols}
    rows={rows}
    placeholder={placeholder}
    className={styles.textarea}
  ></textarea>
);

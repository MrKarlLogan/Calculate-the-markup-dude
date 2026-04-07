"use client";

import styles from "./TextInput.module.scss";
import { TTextInput } from "./TextInput.type";

export const TextInput = ({
  text,
  placeholder = "Введите значение",
  ...otherProps
}: TTextInput) => (
  <label className={styles.wrapper}>
    <span className={styles.text}>{text}</span>
    <input
      {...otherProps}
      spellCheck={false}
      type="text"
      placeholder={placeholder}
      className={styles.input}
    />
  </label>
);

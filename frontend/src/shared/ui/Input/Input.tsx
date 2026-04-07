"use client";

import {
  useState,
  type ChangeEvent,
  type FocusEvent,
  type MouseEvent,
} from "react";
import styles from "./Input.module.scss";
import { HidePassword, ShowPassword } from "./svg/PasswordSvg";
import { TInput } from "./Input.type";

export const Input = ({
  text,
  type = "text",
  placeholder = "",
  onChange,
  onFocus,
  onBlur,
  maxLength = 7,
  ...otherProps
}: TInput) => {
  const [showIconPassword, setShowIconPassword] = useState(false);
  const [isShowPassword, setIsShow] = useState(false);

  const inputType =
    type === "password" ? (isShowPassword ? "text" : "password") : type;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.currentTarget.value;
    const hasValue = !!value;

    if (type === "number" && value.length > maxLength) {
      value = value.slice(0, maxLength);
      event.currentTarget.value = value;
    }

    setShowIconPassword(hasValue);
    onChange?.(event);
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    const value = !!event.currentTarget.value;
    if (value) setShowIconPassword(true);
    onFocus?.(event);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const value = !!event.currentTarget.value;
    if (value) setShowIconPassword(false);
    onBlur?.(event);
  };

  const handleTogglePassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsShow(!isShowPassword);
  };

  return (
    <label className={styles.wrapper}>
      <span className={styles.text}>{text}</span>
      <input
        {...otherProps}
        spellCheck={false}
        type={inputType}
        placeholder={placeholder}
        className={`${styles.input} ${type === "password" ? styles.input_password : ""}`}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {type === "password" && showIconPassword && (
        <button
          type="button"
          className={styles.password}
          onMouseDown={handleTogglePassword}
        >
          {isShowPassword ? <HidePassword /> : <ShowPassword />}
        </button>
      )}
    </label>
  );
};

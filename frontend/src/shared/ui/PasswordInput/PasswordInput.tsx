"use client";

import {
  useState,
  type ChangeEvent,
  type FocusEvent,
  type MouseEvent,
} from "react";
import styles from "./PasswordInput.module.scss";
import { HidePassword, ShowPassword } from "../PasswordInput/svg/PasswordSvg";
import { TPasswordInput } from "./PasswordInput.type";

export const PasswordInput = ({
  text,
  placeholder = "Введите значение",
  onChange,
  onFocus,
  onBlur,
  ...otherProps
}: TPasswordInput) => {
  const [showIconPassword, setShowIconPassword] = useState(false);
  const [isShowPassword, setIsShow] = useState(false);

  const isVisiblePassword = isShowPassword ? "text" : "password";

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setShowIconPassword(!!event.currentTarget.value);
    onChange?.(event);
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (!!event.currentTarget.value) setShowIconPassword(true);
    onFocus?.(event);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (!!event.currentTarget.value) setShowIconPassword(false);
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
        type={isVisiblePassword}
        placeholder={placeholder}
        className={styles.input}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {showIconPassword && (
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

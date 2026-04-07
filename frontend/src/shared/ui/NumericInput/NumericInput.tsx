"use client";

import { useState, ChangeEvent, FocusEvent } from "react";
import styles from "./NumericInput.module.scss";
import { TNumericInput } from "./NumericInput.type";

export const NumericInput = ({
  text,
  placeholder = "Введите значение",
  onChange,
  onFocus,
  onBlur,
  maxLength = 7,
  value,
  unit = "руб.",
  ...otherProps
}: TNumericInput) => {
  const [isFocused, setIsFocused] = useState(false);

  const format = (value: string, withCurrency = false) => {
    if (!value) return "";
    const formatted = Number(value).toLocaleString("ru-RU");
    return withCurrency ? `${formatted} ${unit}` : formatted;
  };

  const renderValue = isFocused
    ? format(String(value), false)
    : format(String(value), true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value.replace(/\D/g, "");

    const limited = raw.length > maxLength ? raw.slice(0, maxLength) : raw;

    onChange?.({
      ...event,
      target: {
        ...event.target,
        value: limited,
      },
    } as ChangeEvent<HTMLInputElement>);
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  return (
    <label className={styles.wrapper}>
      <span className={styles.text}>{text}</span>
      <input
        {...otherProps}
        type="text"
        inputMode="numeric"
        value={renderValue}
        placeholder={placeholder}
        className={styles.input}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </label>
  );
};

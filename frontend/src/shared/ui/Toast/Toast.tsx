"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Headline } from "../Headline";
import { Paragraph } from "../Paragraph";
import styles from "./Toast.module.scss";
import { TToast } from "./Toast.type";

export const Toast = ({ title = "Уведомление", text, onClose }: TToast) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hideTimer = setTimeout(() => setIsVisible(false), 2700);
    const removeTimer = setTimeout(() => onClose?.(), 3000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [onClose]);

  const toastContent = (
    <div className={`${styles.toast} ${!isVisible ? styles.hide : ""}`}>
      <Headline as="h3" position="start" size={18} weight="bold">
        {title}
      </Headline>
      <Paragraph position="start" className={styles.text}>{text}</Paragraph>
    </div>
  );

  if (typeof window === "undefined" || typeof document === "undefined")
    return null;

  return createPortal(toastContent, document.body);
};

"use client";

import { useEffect, useState } from "react";
import { Headline } from "../Headline";
import { Paragraph } from "../Paragraph";
import styles from "./Toast.module.scss";
import { TToast } from "./Toast.type";

export const Toast = ({ text, onClose }: TToast) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hideTimer = setTimeout(() => setIsVisible(false), 2700);
    const removeTimer = setTimeout(() => onClose?.(), 3000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [onClose]);

  return (
    <div className={`${styles.toast} ${!isVisible ? styles.hide : ""}`}>
      <Headline as="h3" position="start" size={18} weight="bold">
        Уведомление
      </Headline>
      <Paragraph position="start">{text}</Paragraph>
    </div>
  );
};

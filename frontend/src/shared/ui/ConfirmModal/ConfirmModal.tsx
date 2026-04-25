"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import styles from "./ConfirmModal.module.scss";
import { Paragraph } from "../Paragraph";
import { Button } from "../Button";
import { IConfirmModal } from "./ConfirmModal.type";
import { Headline } from "../Headline";

export const ConfirmModal = ({
  text,
  positiveAnswer = "Да",
  negativeAnswer = "Нет",
  onConfirm,
  onCancel,
  onClose,
}: IConfirmModal) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleConfirm = () => {
    setIsVisible(false);
    onConfirm();
    setTimeout(onClose, 200);
  };

  const handleCancel = () => {
    setIsVisible(false);
    onCancel();
    setTimeout(onClose, 200);
  };

  const confirmModalContent = (
    <div className={`${styles.modal} ${!isVisible ? styles.hide : ""}`}>
      <div className={styles.content}>
        <Headline
          position="start"
          size={20}
          weight="bold"
          className={styles.content__title}
        >
          Необходимо подтвердить действие
        </Headline>
        <Paragraph position="start" size={18}>
          {text}
        </Paragraph>
        <div className={styles.buttons}>
          <Button text={positiveAnswer} type="button" onClick={handleConfirm} />
          <Button text={negativeAnswer} type="button" onClick={handleCancel} />
        </div>
      </div>
    </div>
  );

  if (typeof window === "undefined" || typeof document === "undefined")
    return null;

  return createPortal(confirmModalContent, document.body);
};

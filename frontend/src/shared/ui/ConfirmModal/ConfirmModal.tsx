import { useState } from "react";
import styles from "./ConfirmModal.module.scss";
import { Paragraph } from "../Paragraph";
import { Button } from "../Button";
import { IConfirmModal } from "./ConfirmModal.type";

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

  return (
    <div className={`${styles.modal} ${!isVisible ? styles.hide : ""}`}>
      <div className={styles.content}>
        <Paragraph size={18}>{text}</Paragraph>
        <div className={styles.buttons}>
          <Button text={positiveAnswer} type="button" onClick={handleConfirm} />
          <Button text={negativeAnswer} type="button" onClick={handleCancel} />
        </div>
      </div>
    </div>
  );
};

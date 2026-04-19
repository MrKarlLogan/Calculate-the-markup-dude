import { Paragraph } from "../Paragraph";
import styles from "./NotificationMessage.module.scss";
import { TextArea } from "../TextArea";
import { Button } from "../Button";
import { useState } from "react";
import { useAppDispatch } from "@/shared/lib/hooks/redux";
import {
  createNotificationThunk,
  deleteNotificationThunk,
} from "@/entities/notification/api";
import { TNotificationMessage } from "./NotificationMessage.type";
import { TValidationError } from "@/entities/product/types/types";

export const NotificationMessage = ({
  notification,
  isEdit = false,
  isCreated = false,
  showFn,
}: TNotificationMessage) => {
  const dispatch = useAppDispatch();

  const [text, setText] = useState("");
  const formatDate = new Date(notification?.created || "").toLocaleDateString(
    "ru-RU",
  );

  const handleAddMessage = async () => {
    try {
      const result = await showFn.modal(
        "Вы уверены, что хотите создать сообщение?",
      );

      if (result) {
        await dispatch(createNotificationThunk({ message: text })).unwrap();
        setText("");
        showFn.toast("Сообщение успешно создано");
      }
    } catch (error: unknown) {
      const err = error as TValidationError;
      const validationMessage = err?.validation?.body?.message;
      const errorMsg =
        validationMessage ||
        err?.message ||
        "Произошла ошибка при создании сообщения";

      showFn.toast(errorMsg);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      const result = await showFn.modal(
        "Вы уверены, что хотите удалить сообщение?",
      );

      if (result) {
        await dispatch(deleteNotificationThunk(id)).unwrap();
        setText("");
        showFn.toast("Сообщение успешно удалено");
      }
    } catch {
      showFn.toast("Произошла ошибка при удалении");
    }
  };

  if (isCreated)
    return (
      <div className={styles.container}>
        <Paragraph position="start" weight="bold">
          Создание сообщения
        </Paragraph>
        <TextArea
          value={text}
          onChange={(event) => setText(event.target.value)}
        >
          {text}
        </TextArea>
        <Button text="Создать" onClick={handleAddMessage} disabled={!text} />
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Paragraph
          size={12}
          position="start"
          weight="bold"
          className={styles.date}
        >
          {formatDate}
        </Paragraph>
        {isEdit && (
          <Button
            text="Удалить"
            onClick={() => handleDeleteMessage(notification?.id || "")}
            className={styles.deleteButton}
          />
        )}
      </div>
      <Paragraph position="start">{notification?.message || ""}</Paragraph>
    </div>
  );
};

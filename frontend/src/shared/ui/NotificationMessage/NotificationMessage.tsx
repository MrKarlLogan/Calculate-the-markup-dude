"use client";

import { Paragraph } from "../Paragraph";
import styles from "./NotificationMessage.module.scss";
import { TextArea } from "../TextArea";
import { Button } from "../Button";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/redux";
import {
  createNotificationThunk,
  deleteNotificationThunk,
} from "@/entities/notification/api";
import { TNotificationMessage } from "./NotificationMessage.type";
import { getApiErrorMessage } from "@/shared/lib/helpers/getApiErrorMessage";
import { getUser } from "@/entities/user/model/userSlice";

export const NotificationMessage = ({
  notification,
  isEdit = false,
  isCreated = false,
  showFn,
}: TNotificationMessage) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);

  const [text, setText] = useState("");
  const formatDate = new Date(notification?.created || "").toLocaleDateString(
    "ru-RU",
  );

  const handleAddMessage = async () => {
    try {
      const result = await showFn.modal(
        "Вы уверены, что хотите создать новое уведомление?",
      );

      if (result) {
        await dispatch(
          createNotificationThunk({
            author: user?.name || "Администратор",
            message: text,
          }),
        ).unwrap();
        setText("");
        showFn.toast("Уведомление успешно создано");
      }
    } catch (error) {
      showFn.toast(
        getApiErrorMessage(error, "Произошла ошибка при создании уведомления"),
      );
    }
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      const result = await showFn.modal(
        "Вы уверены, что хотите удалить уведомление?",
      );

      if (result) {
        await dispatch(deleteNotificationThunk(id)).unwrap();
        setText("");
        showFn.toast("Уведомление успешно удалено");
      }
    } catch (error) {
      showFn.toast(
        getApiErrorMessage(error, "Произошла ошибка при удалении уведомления"),
      );
    }
  };

  if (isCreated)
    return (
      <div className={`${styles.container} ${styles.container_accent}`}>
        <Paragraph position="start" weight="bold">
          Создание уведомление
        </Paragraph>
        <TextArea
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={3}
        >
          {text}
        </TextArea>
        <Button
          text="Создать"
          onClick={handleAddMessage}
          disabled={!text}
          className={styles.create_button}
        />
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.info}>
          <div className={styles.info__created}>
            <Paragraph
              size={14}
              position={isEdit ? "start" : "end"}
              weight="bold"
              className={styles.info__created_date}
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
          {user?.name !== notification?.author ? (
            <Paragraph
              size={14}
              position="start"
              weight="bold"
              className={styles.info__author}
            >
              <span className={styles.info__author_name}>
                {notification?.author}
              </span>{" "}
              информирует вас:
            </Paragraph>
          ) : (
            <Paragraph size={14} position="start" weight="bold">
              Это <span className={styles.info__author_name}>ваше</span>{" "}
              уведомление
            </Paragraph>
          )}
        </div>
      </div>
      <Paragraph position="start">{notification?.message || ""}</Paragraph>
    </div>
  );
};

"use client";

import { IAuthData } from "@/entities/user/types/types";
import { Paragraph } from "../Paragraph";
import { Button } from "../Button";
import styles from "./UserCard.module.scss";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/redux";
import { getUserId } from "@/entities/user/model/userSlice";
import { Toast } from "../Toast";
import useToast from "@/shared/lib/hooks/useToast";
import { ConfirmModal } from "../ConfirmModal";
import useConfirmModal from "@/shared/lib/hooks/useConfirmModal";
import { deleteUserThunk, updateUsersRoleThunk } from "@/entities/user/api";
import { getApiErrorMessage } from "@/shared/lib/helpers/getApiErrorMessage";

export const UserCard = ({ user }: { user: IAuthData }) => {
  const id = useAppSelector(getUserId);
  const dispatch = useAppDispatch();

  const { modal, showConfirm, handleConfirm, handleCancel, handleClose } =
    useConfirmModal();
  const { toasts, showToast, removeToast } = useToast();

  const handleToggle = async () => {
    const result = await showConfirm(
      `Сделать пользователя ${user.name} администратором? Это действие нельзя будет отменить.`,
    );

    if (!result) return;

    try {
      await dispatch(
        updateUsersRoleThunk({
          data: { role: "admin" },
          id: user.id,
        }),
      ).unwrap();

      showToast(`Пользователь ${user.name} теперь администратор`);
    } catch (error) {
      showToast(
        getApiErrorMessage(
          error,
          `Произошла ошибка при изменении роли пользователя ${user.name}`,
        ),
      );
    }
  };

  const handleDelete = async () => {
    const result = await showConfirm(
      `Вы действительно хотите удалить пользователя ${user.name}`,
    );

    if (!result) return;

    try {
      await dispatch(deleteUserThunk(user.id)).unwrap();
      showToast(`Пользователь ${user.name} успешно удален`);
    } catch (error) {
      showToast(
        getApiErrorMessage(
          error,
          `Произошла ошибка при удалении пользователя ${user.name}`,
        ),
      );
    }
  };

  return (
    <>
      <div className={styles.card_users}>
        <div className={styles.description}>
          {id === user.id && (
            <Paragraph position="start" weight="bold" className={styles.me}>
              Это вы
            </Paragraph>
          )}
          <Paragraph position="start">
            Пользователь: <span className={styles.span}>{user.name}</span>
          </Paragraph>
          <Paragraph position="start">
            Роль:{" "}
            <span className={styles.span}>
              {user.role === "admin" ? "Администратор" : "Пользователь"}
            </span>
          </Paragraph>
        </div>
        <div className={styles.buttons}>
          {user.role !== "admin" && id !== user.id && (
            <Button
              className={styles.button}
              text="Сделать администратором"
              onClick={handleToggle}
            />
          )}
          {id !== user.id && (
            <Button
              className={styles.button}
              text="Удалить"
              onClick={handleDelete}
            />
          )}
        </div>
      </div>
      {modal && (
        <ConfirmModal
          text={modal.text}
          positiveAnswer={modal.positiveAnswer}
          negativeAnswer={modal.negativeAnswer}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          onClose={handleClose}
        />
      )}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          text={toast.text}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </>
  );
};

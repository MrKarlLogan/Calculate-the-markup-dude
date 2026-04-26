"use client";

import { Section } from "@shared/ui/Section";
import { NotificationMessage } from "@shared/ui/NotificationMessage";
import { useAppDispatch, useAppSelector } from "@shared/lib/hooks/redux";
import { useEffect } from "react";
import { fetchNotifications } from "@entities/notification/api";
import {
  getMessages,
  getLoading,
} from "@entities/notification/model/notificationSlice";
import { LoaderComponent } from "@shared/ui/LoaderComponent";
import useConfirmModal from "@shared/lib/hooks/useConfirmModal";
import { ConfirmModal } from "@shared/ui/ConfirmModal";
import { Toast } from "@shared/ui/Toast";
import useToast from "@shared/lib/hooks/useToast";
import { MainContainer } from "@shared/ui/MainContainer/MainContainer";

export const Notification = ({
  className,
  isEdit = false,
}: {
  className?: string;
  isEdit?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(getMessages);
  const loading = useAppSelector(getLoading);
  const { modal, showConfirm, handleConfirm, handleCancel, handleClose } =
    useConfirmModal();
  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  if (loading)
    return (
      <Section className={className}>
        <MainContainer
          title={!isEdit ? "Информация" : "Информационный редактор"}
        >
          <LoaderComponent />
        </MainContainer>
      </Section>
    );

  return (
    <>
      <Section className={className}>
        <MainContainer
          title={!isEdit ? "Информация" : "Информационный редактор"}
        >
          {isEdit && (
            <NotificationMessage
              isCreated
              showFn={{ modal: showConfirm, toast: showToast }}
            />
          )}
          {notifications &&
            notifications
              .map((notification) => (
                <NotificationMessage
                  key={notification.id}
                  notification={notification}
                  isEdit={isEdit}
                  showFn={{ modal: showConfirm, toast: showToast }}
                />
              ))
              .reverse()}
        </MainContainer>
      </Section>
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

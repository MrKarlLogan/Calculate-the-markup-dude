"use client";

import { Section } from "@shared/ui/Section";
import { MainContainer } from "@shared/ui/MainContainer/MainContainer";
import { useAppSelector } from "@/shared/lib/hooks/redux";
import { getUser } from "@/entities/user/model/userSlice";
import { useWebSocket } from "@/shared/lib/hooks/useWebSocker";
import { LoaderComponent } from "@/shared/ui/LoaderComponent";
import styles from "./Agreement.module.scss";
import { AgreementMessage } from "@/shared/ui/AgreementMessage";
import useToast from "@/shared/lib/hooks/useToast";
import { Toast } from "@/shared/ui/Toast";
import { TAgreement } from "@/entities/priceAgreement/types/types";
import { ConfirmModal } from "@/shared/ui/ConfirmModal";
import useConfirmModal from "@/shared/lib/hooks/useConfirmModal";
import agreementApi from "@/shared/api/agreementApi";
import { getApiErrorMessage } from "@/shared/lib/helpers/getApiErrorMessage";

export const Agreement = ({ className }: { className?: string }) => {
  const user = useAppSelector(getUser);
  const userId = user?.id;
  const isAdmin = user?.role === "admin";
  const { modal, showConfirm, handleConfirm, handleCancel, handleClose } =
    useConfirmModal();
  const { toasts, showToast, removeToast } = useToast();

  const { agreements, loading } = useWebSocket(
    userId,
    isAdmin,
    (event, data) => {
      switch (event) {
        case "agreement:created":
          if (userId !== data.userId)
            showToast(
              `${data.userName} создал новый запрос на согласование стоимости ${data.data.product}`,
            );
          break;
        case "agreement:updated":
          if (userId === data.userId)
            showToast(
              `Запрос на согласование стоимости ${data.data.product} был ${data.isAgreed ? "согласован" : "отклонен"}`,
            );
          break;
        case "agreement:deleted":
          showToast(`Запрос на согласование стоимости был удален`);
          break;
      }
    },
  );

  const handleUpdateAgreement = async (id: string) => {
    const result = await showConfirm(
      "Примите решение по сделке",
      "Согласовать",
      "Отказать",
    );

    try {
      const response = await agreementApi.updateMessage(id, {
        isAgreed: result,
        responseMessage: "",
      });
      if (response.success)
        showToast(
          `${result ? "Согласование успешно подтверждено" : "Вы отказали в согласовании цены"}`,
        );
    } catch (error) {
      showToast(
        getApiErrorMessage(error, "Произошла ошибка при удалении согласования"),
      );
    }
  };

  const handleDeleteAgreement = async (id: string, data: TAgreement) => {
    const result = await showConfirm(
      `${user?.role !== "admin" ? (data.isAgreed !== null ? "Вы уверены, что хотите удалить данное согласовение? Это действие нельзя будет отменить." : "Вы уверены, что не будете дожидаться решения? Это действие приведет к полному удалению ранее отправленного согласования. Удалить согласование цены?") : data.isAgreed !== null ? "Вы уверены, что хотите удалить данное согласовение? Это действие нельзя будет отменить." : "Вы ещё не приняли решение по согласованию. Вы точно хотите его удалить?"}`,
    );

    if (!result) return;

    try {
      const response = await agreementApi.deleteMessage(id);
      if (response.success) showToast("Согласование успешно удалено");
    } catch (error) {
      showToast(
        getApiErrorMessage(error, "Произошла ошибка при удалении согласования"),
      );
    }
  };

  if (loading)
    return (
      <Section className={className}>
        <MainContainer title="Согласование">
          <LoaderComponent />
        </MainContainer>
      </Section>
    );

  return (
    <>
      <Section className={className}>
        <MainContainer title="Согласование">
          <ul className={styles.agreement__list}>
            {agreements.map((agreement) => (
              <li key={agreement.id}>
                <AgreementMessage
                  data={agreement}
                  handlers={{
                    update: handleUpdateAgreement,
                    delete: handleDeleteAgreement,
                  }}
                />
              </li>
            ))}
          </ul>
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

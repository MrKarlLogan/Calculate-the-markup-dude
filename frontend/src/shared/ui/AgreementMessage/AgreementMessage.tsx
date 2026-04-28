import { TAgreement } from "@/entities/priceAgreement/types/types";
import styles from "./AgreementMessage.module.scss";
import { useAppSelector } from "@/shared/lib/hooks/redux";
import { getUser } from "@/entities/user/model/userSlice";
import { DataRow } from "../DataRow";
import { Button } from "../Button";
import useConfirmModal from "@/shared/lib/hooks/useConfirmModal";
import useToast from "@/shared/lib/hooks/useToast";
import { getApiErrorMessage } from "@/shared/lib/helpers/getApiErrorMessage";
import agreementApi from "@/shared/api/agreementApi";
import { Toast } from "../Toast";
import { ConfirmModal } from "../ConfirmModal";

export const AgreementMessage = ({ data }: { data: TAgreement }) => {
  const me = useAppSelector(getUser);
  const { modal, showConfirm, handleConfirm, handleCancel, handleClose } =
    useConfirmModal();
  const { toasts, showToast, removeToast } = useToast();

  const setStatus = (status: boolean | null) => {
    switch (status) {
      case null:
        return "В ожидании";
      case true:
        return "Согласовано";
      case false:
        return "Отказано";
      default:
        return "Ошибка";
    }
  };

  const handleDeleteAgreement = async (id: string) => {
    const result = await showConfirm(
      `${me?.role !== "admin" ? (data.isAgreed !== null ? "Вы уверены, что хотите удалить данное согласовение? Это действие нельзя будет отменить." : "Вы уверены, что не будете дожидаться решения? Это действие приведет к полному удалению ранее отправленного согласования. Удалить согласование цены?") : data.isAgreed !== null ? "Вы уверены, что хотите удалить данное согласовение? Это действие нельзя будет отменить." : "Вы ещё не приняли решение по согласованию. Вы точно хотите его удалить?"}`,
    );

    if (!result) return;

    try {
      const response = await agreementApi.deleteMessage(id);
      if (response.success) {
        showToast("Согласование успешно удалено");
      }
    } catch (error) {
      showToast(
        getApiErrorMessage(error, "Произошла ошибка при удалении согласования"),
      );
    }
  };

  return (
    <>
      {" "}
      <article className={styles.container}>
        <span className={styles.status}>
          <span className={styles.status__date}>
            {new Date(data.created || "").toLocaleDateString("ru-RU")}
          </span>
          <span>
            Статус:{" "}
            <span className={styles.status__result}>
              {setStatus(data.isAgreed)}
            </span>
          </span>
        </span>
        <h3>
          <span className={styles.name}>
            {data.userName === me?.name ? "Вы" : data.userName}
          </span>{" "}
          {data.userName === me?.name ? "просите" : "просит"} согласовать цену{" "}
          <span className={styles.total}>
            {data.data.total.toLocaleString("ru-RU")} руб.
          </span>{" "}
          на{" "}
          <span>
            <span className={styles.product}>{data.data.product}</span> в
            комплектации{" "}
            <span className={styles.product}>{data.data.option}</span>
          </span>
          .
        </h3>
        {data.data.discounts.length > 0 ? (
          <ul className={styles.discounts}>
            Список примененных поддержек:{" "}
            {data.data.discounts.map((discount) => (
              <li
                key={`${discount}-${data.id}`}
                className={styles.discounts__items}
              >
                {discount}
              </li>
            ))}
          </ul>
        ) : (
          <p>Примененных поддержке нет</p>
        )}
        <DataRow
          text="Скидка за кредит:"
          value={data.data.otherDiscount.creditDiscount || 0}
        />
        <DataRow
          text="Прочие скидки:"
          value={data.data.otherDiscount.otherDiscount || 0}
        />
        <DataRow
          text="Сумма доп.оборудования:"
          value={data.data.otherDiscount.additionalEquipment || 0}
        />
        <DataRow
          text="Плановая наценка:"
          value={data.data.plannedProfit || 0}
        />
        <p className={styles.message}>
          Сообщение:{" "}
          <span className={styles.message__text}>{data.data.message}</span>
        </p>
        {me?.role === "admin" && <Button text="Принять решение" />}
        {
          <Button
            text="Удалить"
            onClick={() => handleDeleteAgreement(data.id)}
          />
        }
      </article>
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

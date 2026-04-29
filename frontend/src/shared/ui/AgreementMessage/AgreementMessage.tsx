import { TAgreement } from "@/entities/priceAgreement/types/types";
import styles from "./AgreementMessage.module.scss";
import { useAppSelector } from "@/shared/lib/hooks/redux";
import { getUser } from "@/entities/user/model/userSlice";
import { DataRow } from "../DataRow";
import { Button } from "../Button";

export const AgreementMessage = ({
  data,
  handlers,
}: {
  data: TAgreement;
  handlers: {
    update: (id: string, data: TAgreement) => void;
    delete: (id: string, data: TAgreement) => void;
  };
}) => {
  const me = useAppSelector(getUser);

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

  return (
    <article className={styles.container}>
      <span className={styles.status}>
        <span className={styles.status__date}>
          {new Date(data.created || "").toLocaleDateString("ru-RU")}
        </span>
        <span>
          Статус:{" "}
          <span
            className={`${styles.status__result} ${data.isAgreed !== null && (data.isAgreed ? styles.status__positive : styles.status__negative)}`}
          >
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
      <details className={styles.agreement_details}>
        <summary className={styles.agreement_details__summary}>
          Дополнительная информация
        </summary>
        <div className={styles.agreement_details__information}>
          {data.data.discounts.length > 0 && (
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
          {data.data.message !== "" && (
            <p className={styles.message}>
              Сообщение:{" "}
              <span className={styles.message__text}>{data.data.message}</span>
            </p>
          )}
        </div>
      </details>
      {me?.role === "admin" && data.isAgreed === null && (
        <Button
          text="Принять решение"
          onClick={() => handlers.update(data.id, data)}
        />
      )}
      {<Button text="Удалить" onClick={() => handlers.delete(data.id, data)} />}
    </article>
  );
};

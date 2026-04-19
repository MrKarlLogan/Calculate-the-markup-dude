import { TextInput } from "@shared/ui/TextInput";
import styles from "./InputsDiscounts.module.scss";
import { Paragraph } from "@shared/ui/Paragraph";
import { Button } from "@shared/ui/Button";
import { NumericInput } from "@/shared/ui/NumericInput";
import { TInputsDiscounts } from "./InputsDiscounts.type";
import { ChangeEvent } from "react";

export const InputsDiscounts = ({
  isCreated,
  created,
  discounts,
  onChange,
  onDelete,
}: TInputsDiscounts) => {
  const handleCreateDiscount = (
    name: string,
    event: ChangeEvent<HTMLInputElement>,
    isNum: boolean = false,
  ) => {
    created?.onChange((prev) => ({
      ...prev,
      [name]: isNum ? Number(event.target.value) : event.target.value,
    }));
  };

  if (isCreated)
    return (
      <div className={styles.container_created}>
        <div className={styles.container_created__title}>
          <Paragraph position="start" size={18} weight="bold">
            Создание поддержки
          </Paragraph>
          <Button
            text="Создать"
            className={styles.container_created__button_create}
            onClick={created?.onCreate}
            disabled={
              !created?.value.name ||
              !created.value.discountAmount ||
              created.value.discountAmount < 0
            }
          />
        </div>
        <div className={styles.container_created__inputs}>
          <TextInput
            text="Название поддержки"
            placeholder="Введите название поддержки"
            value={created?.value.name}
            onChange={(event) => handleCreateDiscount("name", event)}
          />
          <NumericInput
            text="Сумма поддержки"
            placeholder="Введите сумму поддержки"
            value={created?.value.discountAmount}
            onChange={(event) =>
              handleCreateDiscount("discountAmount", event, true)
            }
          />
        </div>
      </div>
    );

  return (
    <div className={styles.container_edit}>
      <div className={styles.container_edit__title}>
        <Paragraph position="start" size={18} weight="bold">
          Редактирование поддержки
        </Paragraph>
        <Button
          text="Удалить"
          className={styles.container_edit__button_delete}
          onClick={onDelete}
        />
      </div>
      <div className={styles.container_edit__inputs}>
        <TextInput
          text="Название поддержки"
          placeholder="Введите название поддержки"
          value={discounts?.name || ""}
          onChange={(event) => onChange?.("name", event.target.value)}
        />
        <NumericInput
          text="Сумма поддержки"
          placeholder="Введите сумму поддержки"
          value={discounts?.discountAmount || ""}
          onChange={(event) =>
            onChange?.("discountAmount", Number(event.target.value))
          }
        />
      </div>
    </div>
  );
};

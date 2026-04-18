import { TextInput } from "@shared/ui/TextInput";
import styles from "./InputsDiscounts.module.scss";
import { Paragraph } from "@shared/ui/Paragraph";
import { Button } from "@shared/ui/Button";
import { NumericInput } from "@/shared/ui/NumericInput";
import { TInputsDiscounts } from "./InputsDiscounts.type";

export const InputsDiscounts = ({ isCreated }: TInputsDiscounts) => {
  if (isCreated)
    return (
      <div className={styles.container_created}>
        <div className={styles.container_created__title}>
          <Paragraph position="start" size={20} weight="bold">
            Создание поддержки
          </Paragraph>
          <Button
            text="Создать"
            className={styles.container_created__button_create}
          />
        </div>
        <div className={styles.container_created__inputs}>
          <TextInput
            text="Название поддержки"
            placeholder="Введите название поддержки"
            value=""
          />
          <NumericInput
            text="Сумма поддержки"
            placeholder="Введите сумму поддержки"
            value=""
          />
        </div>
      </div>
    );

  return (
    <div className={styles.container_edit}>
      <div className={styles.container_edit__title}>
        <Paragraph position="start" size={20} weight="bold">
          Редактирование поддержки
        </Paragraph>
        <Button
          text="Удалить"
          className={styles.container_edit__button_delete}
        />
      </div>
      <div className={styles.container_edit__inputs}>
        <TextInput
          text="Название поддержки"
          placeholder="Введите название поддержки"
          value=""
        />
        <NumericInput
          text="Сумма поддержки"
          placeholder="Введите сумму поддержки"
          value=""
        />
      </div>
    </div>
  );
};

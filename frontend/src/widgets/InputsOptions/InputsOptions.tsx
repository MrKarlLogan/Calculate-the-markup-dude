import { TextInput } from "@shared/ui/TextInput";
import styles from "./InputsOptions.module.scss";
import { Paragraph } from "@shared/ui/Paragraph";
import { Button } from "@shared/ui/Button";
import { TInputsOptions } from "./ImputsOptions.type";
import { NumericInput } from "@/shared/ui/NumericInput";
import { ChangeEvent } from "react";

export const InputsOptions = ({
  isCreated,
  created,
  option,
  onChange,
  onDelete,
}: TInputsOptions) => {
  const handleCreateOption = (
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
          <Paragraph position="start" size={20} weight="bold">
            Создание комплектации
          </Paragraph>
          <Button
            text="Создать"
            className={styles.container_created__button_create}
            onClick={created?.onCreate}
            disabled={
              !created?.value.name ||
              !created?.value.cost ||
              !created?.value.price ||
              created?.value.cost >= created?.value.price
            }
          />
        </div>
        <div className={styles.container_created__inputs}>
          <TextInput
            text="Название комплектации"
            placeholder="Введите название комплектации"
            value={created?.value.name || ""}
            onChange={(event) => handleCreateOption("name", event)}
          />
          <NumericInput
            text="Себестоимость"
            placeholder="Введите себестоимость"
            value={created?.value.cost || ""}
            onChange={(event) => handleCreateOption("cost", event, true)}
          />
          <NumericInput
            text="Прайсовая цена"
            placeholder="Введите прайсовую стоимость"
            value={created?.value.price || ""}
            onChange={(event) => {
              handleCreateOption("price", event, true);
            }}
          />
        </div>
      </div>
    );

  return (
    <div className={styles.container_edit}>
      <div className={styles.container_edit__title}>
        <Paragraph position="start" size={20} weight="bold">
          Редактирование комплектации
        </Paragraph>
        <Button
          text="Удалить"
          className={styles.container_edit__button_delete}
          onClick={onDelete}
        />
      </div>
      <div className={styles.container_edit__inputs}>
        <TextInput
          text="Название комплектации"
          value={option?.name || ""}
          onChange={(event) => onChange?.("name", event.target.value)}
        />
        <NumericInput
          text="Себестоимость"
          value={option?.cost || ""}
          onChange={(event) => onChange?.("cost", Number(event.target.value))}
        />
        <NumericInput
          text="Прайсовая цена"
          value={option?.price || ""}
          onChange={(event) => onChange?.("price", Number(event.target.value))}
        />
      </div>
    </div>
  );
};

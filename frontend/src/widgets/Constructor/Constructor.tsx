"use client";

import { Section } from "@shared/ui/Section";
import styles from "./Constructor.module.scss";
import { GroupeContainer } from "@shared/ui/GroupeContainer";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/redux";
import { fetchProducts } from "@/entities/product/api";
import {
  getProducts,
  getStatusLoading,
} from "@entities/product/model/productsSlice";
import { LoaderComponent } from "@shared/ui/LoaderComponent";
import { Radio } from "@shared/ui/Radio";
import { Checkbox } from "@shared/ui/Checkbox";
import { Button } from "@shared/ui/Button";
import { Input } from "@shared/ui/Input";
import { Paragraph } from "@/shared/ui/Paragraph";

export const Constructor = () => {
  const dispath = useAppDispatch();
  const products = useAppSelector(getProducts);
  const loading = useAppSelector(getStatusLoading);

  const [modelName, setModelName] = useState<string | null>(null);
  const [optionName, setOptionName] = useState<string | null>(null);

  const selectedProduct = products.find(
    (product) => product.name === modelName,
  );
  const options = selectedProduct?.options || [];
  const discounts = selectedProduct?.discounts || [];

  const handleModelChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setModelName(event.target.value);
      setOptionName(null);
    },
    [],
  );

  const handleOptionChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setOptionName(event.target.value);
    },
    [],
  );

  useEffect(() => {
    dispath(fetchProducts());
  }, [dispath]);

  if (loading) return <LoaderComponent />;

  return (
    <Section>
      <GroupeContainer text="Конструктор" className={styles.container}>
        <GroupeContainer text="Модель" className={styles.products}>
          {products.map((product) => (
            <Radio
              key={product.id}
              text={product.name}
              value={product.name}
              name="model"
              onChange={handleModelChange}
            />
          ))}
        </GroupeContainer>
        <GroupeContainer text="Комплектация" className={styles.products}>
          {modelName &&
            options.map((option) => (
              <Radio
                key={option.id}
                text={option.name}
                value={option.name}
                name="options"
                onChange={handleOptionChange}
              />
            ))}
        </GroupeContainer>
        <GroupeContainer text="Поддержки" className={styles.products}>
          {optionName &&
            discounts.map((discount) => (
              <Checkbox
                key={discount.id}
                value={discount.name}
                text={`${discount.name} - ${discount.discountAmount} руб.`}
              />
            ))}
        </GroupeContainer>
        <GroupeContainer
          text="Дополнительные условия"
          className={styles.conditions}
        >
          <Input
            text="Скидка за кредит / лизинг"
            placeholder="Внесите сумму возврата по кредиту / лизингу"
            type="number"
          />
          <Input
            text="Прочие скидки"
            placeholder="Введите сумму прочих скидок"
            type="number"
          />
          <Input
            text="Стоимость дополнительного оборудования"
            placeholder="Введите стоимость дополнительного оборудования"
            type="number"
          />
          <Input
            text="Планируемый заработок"
            placeholder="Введите сумму запланированного заработка"
            type="number"
          />
        </GroupeContainer>
        <GroupeContainer text="Расчёт стоимости" className={styles.calculate}>
          <Paragraph position="end">Прайсовая стоимость: </Paragraph>
          <Paragraph position="end">Себестоимость: </Paragraph>
          <Paragraph position="end">Сумма всех скидок: </Paragraph>
          <Paragraph position="end">
            Стоимость с учетом примененных скидок:
          </Paragraph>
          <Paragraph position="end">Ваше предложение: </Paragraph>
          <Paragraph position="end">Планируемый заработок: </Paragraph>
          <Button text="Согласовать" />
        </GroupeContainer>
      </GroupeContainer>
    </Section>
  );
};

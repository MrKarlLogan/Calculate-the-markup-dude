"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Section } from "@shared/ui/Section";
import { GroupeContainer } from "@shared/ui/GroupeContainer";
import { useAppDispatch, useAppSelector } from "@shared/lib/hooks/redux";
import { fetchProducts } from "@entities/product/api";
import {
  getProducts,
  getStatusLoading,
} from "@entities/product/model/productsSlice";
import { LoaderComponent } from "@shared/ui/LoaderComponent";
import { Radio } from "@shared/ui/Radio";
import { Checkbox } from "@shared/ui/Checkbox";
import { Button } from "@shared/ui/Button";
import { Input } from "@shared/ui/Input";
import { DataRow } from "@shared/ui/DataRow";
import styles from "./Constructor.module.scss";
import { TextArea } from "@/shared/ui/TextArea";
import { TCalculator } from "./Constructor.type";

const initialStateCalculator: TCalculator = {
  modelId: null,
  optionId: null,
  selectedDiscountIds: [],
  creditDiscount: 0,
  otherDiscount: 0,
  additionalEquipment: 0,
  plannedProfit: 0,
  customPrice: 0,
  message: "",
};

export const Constructor = () => {
  const dispath = useAppDispatch();
  const products = useAppSelector(getProducts);
  const loading = useAppSelector(getStatusLoading);

  const [calculator, setCalculator] = useState<TCalculator>(
    initialStateCalculator,
  );

  useEffect(() => {
    dispath(fetchProducts());
  }, [dispath]);

  if (loading) return <LoaderComponent />;

  const selectedProduct = products.find(
    (product) => product.id === calculator.modelId,
  );
  const selectedOption = selectedProduct?.options.find(
    (option) => option.id === calculator.optionId,
  );

  const basePrice = selectedOption?.price ?? 0;
  const cost = selectedOption?.cost ?? 0;

  const selectedDiscountsSum =
    selectedProduct?.discounts
      .filter((discount) =>
        calculator.selectedDiscountIds.includes(discount.id),
      )
      .reduce((sum, discount) => sum + discount.discountAmount, 0) ?? 0;

  const totalDiscount =
    selectedDiscountsSum + calculator.creditDiscount + calculator.otherDiscount;

  const finalPrice = cost - totalDiscount + calculator.additionalEquipment;

  const actualPrice = !calculator.customPrice
    ? finalPrice + calculator.plannedProfit
    : calculator.customPrice || finalPrice + calculator.plannedProfit;

  const markup = actualPrice - finalPrice;

  const handleModelChange = (id: string) =>
    setCalculator((prev) => ({
      ...prev,
      modelId: id,
      optionId: null,
    }));

  const handleOptionChange = (id: string) =>
    setCalculator((prev) => ({ ...prev, optionId: id }));

  const handleDiscountsChange = (id: string, checked: boolean) =>
    setCalculator((prev) => ({
      ...prev,
      selectedDiscountIds: checked
        ? [...prev.selectedDiscountIds, id]
        : prev.selectedDiscountIds.filter((discountId) => discountId !== id),
    }));

  const options = selectedProduct?.options || [];
  const discounts = selectedProduct?.discounts || [];

  return (
    <Section>
      <GroupeContainer text="Конструктор" className={styles.container}>
        <GroupeContainer text="Модель" className={styles.products}>
          {products.map((product) => (
            <Radio
              key={product.id}
              text={product.name}
              value={product.id}
              name="model"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleModelChange(event.target.value)
              }
            />
          ))}
        </GroupeContainer>
        <GroupeContainer text="Комплектация" className={styles.products}>
          {calculator.modelId &&
            options.map((option) => (
              <Radio
                key={option.id}
                text={option.name}
                value={option.id}
                name="options"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleOptionChange(event.target.value)
                }
              />
            ))}
        </GroupeContainer>
        <GroupeContainer text="Поддержки" className={styles.products}>
          {calculator.optionId &&
            discounts.map((discount) => (
              <Checkbox
                key={discount.id}
                value={discount.id}
                text={`${discount.name} - ${discount.discountAmount} руб.`}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleDiscountsChange(discount.id, event.target.checked)
                }
              />
            ))}
        </GroupeContainer>
        <GroupeContainer
          text="Дополнительные условия"
          className={styles.conditions}
        >
          <Input
            text="Скидка за кредит / лизинг"
            placeholder="Введите сумму возврата по кредиту / лизингу"
            type="number"
            onBlur={(event) =>
              setCalculator((prev) => ({
                ...prev,
                creditDiscount: Number(event.target.value),
              }))
            }
          />
          <Input
            text="Прочие скидки"
            placeholder="Введите сумму прочих скидок"
            type="number"
            onBlur={(event) =>
              setCalculator((prev) => ({
                ...prev,
                otherDiscount: Number(event.target.value),
              }))
            }
          />
          <Input
            text="Стоимость дополнительного оборудования"
            placeholder="Введите стоимость дополнительного оборудования"
            type="number"
            onBlur={(event) =>
              setCalculator((prev) => ({
                ...prev,
                additionalEquipment: Number(event.target.value),
              }))
            }
          />
          <Input
            text={`Планируемый заработок ${!!calculator.customPrice ? "(не учитывается)" : ""}`}
            placeholder={`${!!calculator.customPrice ? "Сейчас это поле неактивно" : "Введите сумму запланированного заработка"}`}
            type="number"
            onBlur={(event) =>
              setCalculator((prev) => ({
                ...prev,
                plannedProfit: Number(event.target.value),
              }))
            }
            disabled={!!calculator.customPrice}
          />
          <Input
            text="Ваше предложение по стоимости"
            placeholder="Введите стоимость, которую хотите предложить"
            type="number"
            maxLength={8}
            onBlur={(event) =>
              setCalculator((prev) => ({
                ...prev,
                customPrice: Number(event.target.value),
              }))
            }
          />
        </GroupeContainer>
        <GroupeContainer text="Расчёт стоимости" className={styles.calculate}>
          <div className={styles.numbers}>
            <DataRow text="Прайсовая стоимость" value={basePrice} />
            <DataRow text="Себестоимость" value={cost} />
            <DataRow text="Сумма примененных скидок" value={totalDiscount} />
            <DataRow
              text="Сумма дополнительного оборудования"
              value={calculator.additionalEquipment}
            />
            <DataRow text="Плановая наценка" value={markup} />
            <DataRow
              text="Итоговая стоимость"
              value={actualPrice}
              size={18}
              weight="bold"
            />
          </div>
          <div className={styles.text}>
            <TextArea
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                setCalculator((prev) => ({
                  ...prev,
                  message: event.target.value,
                }))
              }
            />
            <Button
              text="Согласовать"
              onClick={() => console.log(calculator)}
            />
          </div>
        </GroupeContainer>
      </GroupeContainer>
    </Section>
  );
};

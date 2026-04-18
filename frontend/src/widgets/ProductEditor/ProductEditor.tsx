import { GroupeContainer } from "@/shared/ui/GroupeContainer";
import styles from "./ProductEditor.module.scss";
import { Button } from "@shared/ui/Button";
import { TProductEditor } from "./ProductEditor.type";
import { TextInput } from "@shared/ui/TextInput";
import { useAppDispatch, useAppSelector } from "@shared/lib/hooks/redux";
import {
  getProductById,
  updateProductOptions,
} from "@/entities/product/model/productsSlice";
import { InputsOptions } from "../InputsOptions";
import { useEffect, useMemo, useState } from "react";
import { TOption } from "@/entities/product/types/types";
import { InputsDiscounts } from "../InputsDiscounts";

export const ProductEditor = ({
  productId,
  hasChange,
  createdProduct,
  changeProduct,
}: TProductEditor) => {
  const dispatch = useAppDispatch();

  const handleCreateNewProduct = () => {
    changeProduct.dispatch(changeProduct.initialState);
    createdProduct.dispatch(true);
  };

  const product = useAppSelector((state) => getProductById(state, productId));

  const [optionsState, setOptionsState] = useState<TOption[] | null>(null);

  const options = optionsState ?? product?.options ?? [];
  const [createdOptionValue, setCreatedOptionValue] = useState({
    name: "",
    cost: 0,
    price: 0,
  });

  const handleAddOption = () => {
    setOptionsState((prev) => {
      const current = prev ?? product?.options ?? [];
      return [
        ...current,
        {
          id: crypto.randomUUID(),
          ...createdOptionValue,
        },
      ];
    });

    setCreatedOptionValue({
      name: "",
      cost: 0,
      price: 0,
    });
  };

  const hasChanges = useMemo(() => {
    if (optionsState === null) return false;
    if (!product) return optionsState.length > 0;
    if (optionsState.length !== product.options?.length) return true;

    const sortedLocal = [...optionsState].sort((a, b) =>
      a.id.localeCompare(b.id),
    );

    const sortedOriginal = [...(product.options || [])].sort((a, b) =>
      a.id.localeCompare(b.id),
    );

    return sortedLocal.some((localOption, index) => {
      const originalOption = sortedOriginal[index];
      if (!originalOption) return true;

      return (
        localOption.name !== originalOption.name ||
        localOption.cost !== originalOption.cost ||
        localOption.price !== originalOption.price
      );
    });
  }, [optionsState, product]);

  const isValidOptions = useMemo(() => {
    const current = optionsState ?? product?.options ?? [];
    if (current.length === 0) return true;

    return current.every(
      (option) =>
        option.name?.trim() &&
        option.cost > 0 &&
        option.price > 0 &&
        option.cost < option.price,
    );
  }, [optionsState, product]);

  useEffect(() => {
    hasChange(hasChanges);
  }, [hasChanges, hasChange]);

  const handleSave = () => {
    const current = optionsState ?? product?.options ?? [];

    dispatch(
      updateProductOptions({
        productId,
        options: current,
      }),
    );

    setOptionsState(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <div className={styles.buttons_create}>
          <Button
            text="Создать новую модель"
            className={styles.buttons_all}
            onClick={handleCreateNewProduct}
            disabled={createdProduct.state || hasChanges}
          />
          <Button
            text="Удалить выбранную модель"
            className={styles.buttons_all}
            disabled={!product || hasChanges}
          />
        </div>
        <div className={styles.buttons_save}>
          <Button
            text="Сохранить изменения"
            className={styles.buttons_all}
            onClick={handleSave}
            disabled={!hasChanges || !optionsState || !isValidOptions}
          />
          <Button
            text="Отменить все изменения"
            className={styles.buttons_all}
            onClick={() => setOptionsState(null)}
            disabled={!hasChanges}
          />
        </div>
      </div>
      <div className={styles.inputs}>
        <TextInput
          text="Название новой модели"
          placeholder="Введите название новой модели"
          disabled={!createdProduct.state}
        />
        <GroupeContainer
          title="Все комплектации"
          className={styles.inputs__content}
          disabled={!product}
        >
          <>
            <InputsOptions
              isCreated
              created={{
                value: createdOptionValue,
                onChange: setCreatedOptionValue,
                onCreate: handleAddOption,
              }}
            />
            {options.map((option) => (
              <InputsOptions
                key={option.id}
                option={option}
                onChange={(field, value) => {
                  setOptionsState((prev) => {
                    const current = prev ?? product?.options ?? [];
                    return current.map((opt) =>
                      opt.id === option.id ? { ...opt, [field]: value } : opt,
                    );
                  });
                }}
                onDelete={() => {
                  setOptionsState((prev) => {
                    const current = prev ?? product?.options ?? [];
                    return current.filter((opt) => opt.id !== option.id);
                  });
                }}
              />
            ))}
          </>
        </GroupeContainer>
        <GroupeContainer
          title="Все поддержки"
          className={styles.inputs__content}
          disabled={!product}
        >
          <>
            <InputsDiscounts isCreated />
            {product?.discounts.map((discount) => (
              <InputsDiscounts key={discount.id} />
            ))}
          </>
        </GroupeContainer>
      </div>
    </div>
  );
};

import { GroupeContainer } from "@/shared/ui/GroupeContainer";
import styles from "./ProductEditor.module.scss";
import { Button } from "@shared/ui/Button";
import { TProductEditor } from "./ProductEditor.type";
import { TextInput } from "@shared/ui/TextInput";
import { useAppDispatch, useAppSelector } from "@shared/lib/hooks/redux";
import {
  getProductById,
  updateProductDiscounts,
  updateProductOptions,
} from "@/entities/product/model/productsSlice";
import { InputsOptions } from "../InputsOptions";
import { useEffect, useMemo, useState } from "react";
import { TDiscount, TOption } from "@/entities/product/types/types";
import { InputsDiscounts } from "../InputsDiscounts";

const initialOptionsState = {
  name: "",
  cost: 0,
  price: 0,
};

const initialDiscountsState = {
  name: "",
  discountAmount: 0,
};

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
  const [discountsState, setDiscountsState] = useState<TDiscount[] | null>(
    null,
  );

  const options = optionsState ?? product?.options ?? [];
  const discounts = discountsState ?? product?.discounts ?? [];

  const [createdOptionValue, setCreatedOptionValue] =
    useState(initialOptionsState);
  const [createdDiscountValue, setCreatedDiscountValue] = useState(
    initialDiscountsState,
  );

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

    setCreatedOptionValue(initialOptionsState);
  };

  const handleAddDiscount = () => {
    setDiscountsState((prev) => {
      const current = prev ?? product?.discounts ?? [];
      return [
        ...current,
        {
          id: crypto.randomUUID(),
          ...createdDiscountValue,
        },
      ];
    });

    setCreatedDiscountValue(initialDiscountsState);
  };

  const hasChanges = useMemo(() => {
    let hasOptionChanges = false;
    let hasDiscountChanges = false;

    if (optionsState !== null) {
      if (!product) {
        hasOptionChanges = optionsState.length > 0;
      } else if (optionsState.length !== product.options?.length) {
        hasOptionChanges = true;
      } else {
        const sortedLocal = [...optionsState].sort((a, b) =>
          a.id.localeCompare(b.id),
        );
        const sortedOriginal = [...(product.options || [])].sort((a, b) =>
          a.id.localeCompare(b.id),
        );

        hasOptionChanges = sortedLocal.some((localOption, index) => {
          const originalOption = sortedOriginal[index];
          if (!originalOption) return true;
          return (
            localOption.name !== originalOption.name ||
            localOption.cost !== originalOption.cost ||
            localOption.price !== originalOption.price
          );
        });
      }
    }

    if (discountsState !== null) {
      if (!product) {
        hasDiscountChanges = discountsState.length > 0;
      } else if (discountsState.length !== product.discounts?.length) {
        hasDiscountChanges = true;
      } else {
        const sortedLocal = [...discountsState].sort((a, b) =>
          a.id.localeCompare(b.id),
        );
        const sortedOriginal = [...(product.discounts || [])].sort((a, b) =>
          a.id.localeCompare(b.id),
        );

        hasDiscountChanges = sortedLocal.some((localDiscount, index) => {
          const originalDiscount = sortedOriginal[index];
          if (!originalDiscount) return true;
          return (
            localDiscount.name !== originalDiscount.name ||
            localDiscount.discountAmount !== originalDiscount.discountAmount
          );
        });
      }
    }

    return hasOptionChanges || hasDiscountChanges;
  }, [optionsState, discountsState, product]);

  const isValidOptions = useMemo(() => {
    const currentOptions = optionsState ?? product?.options ?? [];
    const currentDiscounts = discountsState ?? product?.discounts ?? [];

    const optionValid =
      currentOptions.length === 0 ||
      currentOptions.every(
        (option) =>
          option.name?.trim() &&
          option.cost > 0 &&
          option.price > 0 &&
          option.cost < option.price,
      );

    const discountValid =
      currentDiscounts.length === 0 ||
      currentDiscounts.every(
        (discount) => discount.name?.trim() && discount.discountAmount > 0,
      );

    return optionValid && discountValid;
  }, [optionsState, discountsState, product]);

  useEffect(() => {
    hasChange(hasChanges);
  }, [hasChanges, hasChange]);

  const handleSave = () => {
    const currentOptions = optionsState ?? product?.options ?? [];
    const currentDiscounts = discountsState ?? product?.discounts ?? [];

    dispatch(
      updateProductOptions({
        productId,
        options: currentOptions,
      }),
    );

    dispatch(
      updateProductDiscounts({
        productId,
        discounts: currentDiscounts,
      }),
    );

    setOptionsState(null);
    setDiscountsState(null);
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
            disabled={!hasChanges || !isValidOptions}
          />
          <Button
            text="Отменить все изменения"
            className={styles.buttons_all}
            onClick={() => {
              setOptionsState(null);
              setDiscountsState(null);
            }}
            disabled={!hasChanges}
          />
        </div>
      </div>
      <div className={styles.inputs}>
        <TextInput text="Название модели" placeholder="Введите новой модели" />
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
            <InputsDiscounts
              isCreated
              created={{
                value: createdDiscountValue,
                onChange: setCreatedDiscountValue,
                onCreate: handleAddDiscount,
              }}
            />
            {discounts.map((discount) => (
              <InputsDiscounts
                key={discount.id}
                discounts={discount}
                onChange={(field, value) => {
                  setDiscountsState((prev) => {
                    const current = prev ?? product?.discounts ?? [];
                    return current.map((dis) =>
                      dis.id === discount.id ? { ...dis, [field]: value } : dis,
                    );
                  });
                }}
                onDelete={() => {
                  setDiscountsState((prev) => {
                    const current = prev ?? product?.discounts ?? [];
                    return current.filter((dis) => dis.id !== discount.id);
                  });
                }}
              />
            ))}
          </>
        </GroupeContainer>
      </div>
    </div>
  );
};

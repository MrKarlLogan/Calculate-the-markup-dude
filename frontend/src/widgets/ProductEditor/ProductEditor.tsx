"use client";

import { GroupeContainer } from "@/shared/ui/GroupeContainer";
import styles from "./ProductEditor.module.scss";
import { Button } from "@shared/ui/Button";
import { TProductEditor } from "./ProductEditor.type";
import { TextInput } from "@shared/ui/TextInput";
import { useAppDispatch, useAppSelector } from "@shared/lib/hooks/redux";
import {
  getProductById,
  setEditing,
} from "@/entities/product/model/productsSlice";
import { InputsOptions } from "../InputsOptions";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { TDiscount, TOption } from "@/entities/product/types/types";
import { InputsDiscounts } from "../InputsDiscounts";
import { ConfirmModal } from "@/shared/ui/ConfirmModal";
import useConfirmModal from "@/shared/lib/hooks/useConfirmModal";
import {
  createProductThunk,
  removeProductThunk,
  updateProductThunk,
} from "@/entities/product/api";
import { getApiErrorMessage } from "@/shared/lib/helpers/getApiErrorMessage";

const initialNewModel = {
  name: "",
  options: [] as TOption[],
  discounts: [] as TDiscount[],
};

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
  showToast,
  hasChange,
  createdProduct,
  changeProduct,
}: TProductEditor) => {
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => getProductById(state, productId));
  const { modal, showConfirm, handleConfirm, handleCancel, handleClose } =
    useConfirmModal();

  const [newModel, setNewModel] = useState(initialNewModel);

  const [modelState, setModelState] = useState<string | null>(null);
  const [optionsState, setOptionsState] = useState<TOption[] | null>(null);
  const [discountsState, setDiscountsState] = useState<TDiscount[] | null>(
    null,
  );

  const model = createdProduct.state
    ? newModel.name
    : (modelState ?? product?.name ?? "");
  const options = createdProduct.state
    ? newModel.options
    : (optionsState ?? product?.options ?? []);
  const discounts = createdProduct.state
    ? newModel.discounts
    : (discountsState ?? product?.discounts ?? []);

  const [createdOptionValue, setCreatedOptionValue] =
    useState(initialOptionsState);
  const [createdDiscountValue, setCreatedDiscountValue] = useState(
    initialDiscountsState,
  );

  const handleCreateNewProduct = () => {
    setNewModel(initialNewModel);
    setModelState(null);
    setOptionsState(null);
    setDiscountsState(null);
    setCreatedOptionValue(initialOptionsState);
    setCreatedDiscountValue(initialDiscountsState);

    changeProduct.dispatch(changeProduct.initialState);
    createdProduct.dispatch(true);
  };

  const handleRemoveModel = async () => {
    if (!product) return;

    const result = await showConfirm(
      `Вы уверены, что хотите удалить модель ${product.name}? Это действие нельзя будет отменить.`,
      "Удалить",
      "Вернуться к редактированию",
    );

    if (result) {
      try {
        await dispatch(removeProductThunk(product.id)).unwrap();
        changeProduct.dispatch(changeProduct.initialState);
        showToast?.(`Модель ${product.name} успешно удалена`);
      } catch (error) {
        showToast?.(
          getApiErrorMessage(
            error,
            `Произошла ошибка при удалении модели ${product.name}`,
          ),
        );
      }
    }
  };

  const handleEditCancel = async () => {
    const result = await showConfirm(
      "Это действие приведет к удалению всех ранее записанных изменений. Выйти из создания новой модели?",
    );

    if (result) {
      setNewModel(initialNewModel);
      setModelState(null);
      setOptionsState(null);
      setDiscountsState(null);
      createdProduct.dispatch(false);
      changeProduct.dispatch(changeProduct.initialState);
      dispatch(setEditing(false));

      showToast?.("Все действия были отменены");
    }
  };

  const handleAllCancel = async () => {
    const result = await showConfirm(
      "Это действие приведет к удалению всех ранее записанных изменений. Отменить внесенные изменения?",
    );

    if (result) {
      setModelState(null);
      setOptionsState(null);
      setDiscountsState(null);
      dispatch(setEditing(false));

      showToast?.("Все действия были отменены");
    }
  };

  const handleSaveNewProduct = async () => {
    if (!newModel.name.trim()) return;

    const result = await showConfirm(
      `После подтверждения будет создана новая модель ${newModel.name}`,
      "Создать",
      "Вернуться к созданию",
    );

    if (result) {
      try {
        const createNewModel = {
          name: newModel.name,
          options: newModel.options.map(({ id: _id, ...option }) => option),
          discounts: newModel.discounts.map(
            ({ id: _id, ...discount }) => discount,
          ),
        };

        await dispatch(createProductThunk(createNewModel)).unwrap();

        createdProduct.dispatch(false);
        changeProduct.dispatch(changeProduct.initialState);

        setNewModel(initialNewModel);
        setModelState(null);
        setOptionsState(null);
        setDiscountsState(null);
        dispatch(setEditing(false));

        showToast?.(`Модель ${newModel.name} успешно создана`);
      } catch (error) {
        showToast?.(
          getApiErrorMessage(
            error,
            `Произошла ошибка при создании модели ${newModel.name}`,
          ),
        );
      }
    }
  };

  const handleModelChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (createdProduct.state)
      setNewModel((prev) => ({ ...prev, name: event.target.value }));
    else setModelState(event.target.value);
  };

  const handleAddOption = () => {
    const newOption = {
      id: crypto.randomUUID(),
      ...createdOptionValue,
    };

    if (createdProduct.state) {
      setNewModel((prev) => ({
        ...prev,
        options: [...prev.options, newOption],
      }));
    } else {
      setOptionsState((prev) => {
        const current = prev ?? product?.options ?? [];
        return [...current, newOption];
      });
    }

    setCreatedOptionValue(initialOptionsState);
  };

  const handleAddDiscount = () => {
    const newDiscount = {
      id: crypto.randomUUID(),
      ...createdDiscountValue,
    };

    if (createdProduct.state) {
      setNewModel((prev) => ({
        ...prev,
        discounts: [...prev.discounts, newDiscount],
      }));
    } else {
      setDiscountsState((prev) => {
        const current = prev ?? product?.discounts ?? [];
        return [...current, newDiscount];
      });
    }

    setCreatedDiscountValue(initialDiscountsState);
  };

  const handleOptionChange = (
    optionId: string,
    field: string,
    value: string | number,
  ) => {
    if (createdProduct.state) {
      setNewModel((prev) => ({
        ...prev,
        options: prev.options.map((opt) =>
          opt.id === optionId ? { ...opt, [field]: value } : opt,
        ),
      }));
    } else {
      setOptionsState((prev) => {
        const current = prev ?? product?.options ?? [];
        return current.map((opt) =>
          opt.id === optionId ? { ...opt, [field]: value } : opt,
        );
      });
    }
  };

  const handleDeleteOption = (optionId: string) => {
    if (createdProduct.state) {
      setNewModel((prev) => ({
        ...prev,
        options: prev.options.filter((opt) => opt.id !== optionId),
      }));
    } else {
      setOptionsState((prev) => {
        const current = prev ?? product?.options ?? [];
        return current.filter((opt) => opt.id !== optionId);
      });
    }
  };

  const handleDiscountChange = (
    discountId: string,
    field: string,
    value: string | number,
  ) => {
    if (createdProduct.state) {
      setNewModel((prev) => ({
        ...prev,
        discounts: prev.discounts.map((dis) =>
          dis.id === discountId ? { ...dis, [field]: value } : dis,
        ),
      }));
    } else {
      setDiscountsState((prev) => {
        const current = prev ?? product?.discounts ?? [];
        return current.map((dis) =>
          dis.id === discountId ? { ...dis, [field]: value } : dis,
        );
      });
    }
  };

  const handleDeleteDiscount = (discountId: string) => {
    if (createdProduct.state) {
      setNewModel((prev) => ({
        ...prev,
        discounts: prev.discounts.filter((dis) => dis.id !== discountId),
      }));
    } else {
      setDiscountsState((prev) => {
        const current = prev ?? product?.discounts ?? [];
        return current.filter((dis) => dis.id !== discountId);
      });
    }
  };

  const hasModelChanges =
    !createdProduct.state &&
    modelState !== null &&
    modelState !== product?.name;

  const hasChanges = useMemo(() => {
    if (createdProduct.state) return false;

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

    return hasOptionChanges || hasDiscountChanges || hasModelChanges;
  }, [
    optionsState,
    discountsState,
    product,
    hasModelChanges,
    createdProduct.state,
  ]);

  const isValidData = useMemo(() => {
    const currentOptions = createdProduct.state
      ? newModel.options
      : (optionsState ?? product?.options ?? []);
    const currentDiscounts = createdProduct.state
      ? newModel.discounts
      : (discountsState ?? product?.discounts ?? []);
    const currentModel = createdProduct.state ? newModel.name : model;

    const optionValid =
      currentOptions.length > 0 &&
      currentOptions.every(
        (option) =>
          option.name?.trim() &&
          option.cost > 0 &&
          option.price > 0 &&
          option.cost < option.price,
      );

    const discountValid = currentDiscounts.every(
      (discount) => discount.name?.trim() && discount.discountAmount > 0,
    );

    const modelValid = currentModel.trim().length > 0;

    return optionValid && discountValid && modelValid;
  }, [
    optionsState,
    discountsState,
    model,
    product,
    createdProduct.state,
    newModel,
  ]);

  useEffect(() => {
    if (!createdProduct.state) {
      hasChange(hasChanges);
      dispatch(setEditing(hasChanges));
    } else dispatch(setEditing(isValidData));
  }, [hasChanges, hasChange, createdProduct.state, isValidData, dispatch]);

  const handleSave = async () => {
    const result = await showConfirm(
      `Вы хотите сохранить изменения внесенные в модель ${product?.name}?`,
      "Сохранить",
      "Вернуться к редактированию",
    );

    if (result) {
      try {
        const currentModel = modelState ?? product?.name ?? "";
        const currentOptions = optionsState ?? product?.options ?? [];
        const currentDiscounts = discountsState ?? product?.discounts ?? [];

        const updateData = {
          name: currentModel,
          options: currentOptions.map(({ id: _id, ...option }) => option),
          discounts: currentDiscounts.map(
            ({ id: _id, ...discount }) => discount,
          ),
        };

        await dispatch(
          updateProductThunk({
            data: updateData,
            id: productId,
          }),
        ).unwrap();

        setOptionsState(null);
        setDiscountsState(null);

        showToast?.(
          `Изменения внесенные в модель ${product?.name || ""} были успешно сохранены`,
        );
      } catch (error) {
        showToast?.(
          getApiErrorMessage(
            error,
            `Произошла ошибка при обновлении модели ${product?.name || ""}`,
          ),
        );
      }
    }
  };

  return (
    <>
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
              onClick={handleRemoveModel}
            />
          </div>
          <div className={styles.buttons_save}>
            {createdProduct.state ? (
              <>
                <Button
                  text="Создать модель"
                  className={styles.buttons_all}
                  onClick={handleSaveNewProduct}
                  disabled={!newModel.name.trim() || !isValidData}
                />
                <Button
                  text="Отменить"
                  className={styles.buttons_all}
                  onClick={handleEditCancel}
                />
              </>
            ) : (
              <>
                <Button
                  text="Сохранить изменения"
                  className={styles.buttons_all}
                  onClick={handleSave}
                  disabled={!hasChanges || !isValidData}
                />
                <Button
                  text="Отменить все изменения"
                  className={styles.buttons_all}
                  onClick={handleAllCancel}
                  disabled={!hasChanges}
                />
              </>
            )}
          </div>
        </div>
        <div className={styles.inputs}>
          <TextInput
            text="Название модели"
            placeholder="Введите название модели"
            value={model}
            onChange={handleModelChange}
            disabled={!product && !createdProduct.state}
          />
          <GroupeContainer
            title="Все комплектации"
            className={styles.inputs__content}
            disabled={!product && !createdProduct.state}
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
                  onChange={(field, value) =>
                    handleOptionChange(option.id, field, value)
                  }
                  onDelete={() => handleDeleteOption(option.id)}
                />
              ))}
            </>
          </GroupeContainer>
          <GroupeContainer
            title="Все поддержки"
            className={styles.inputs__content}
            disabled={!product && !createdProduct.state}
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
                  onChange={(field, value) =>
                    handleDiscountChange(discount.id, field, value)
                  }
                  onDelete={() => handleDeleteDiscount(discount.id)}
                />
              ))}
            </>
          </GroupeContainer>
        </div>
      </div>
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
    </>
  );
};

"use client";

import styles from "./Constructor.module.scss";
import { GroupeContainer } from "@shared/ui/GroupeContainer";
import { useAppDispatch, useAppSelector } from "@shared/lib/hooks/redux";
import {
  getProducts,
  getLoading,
  setEditing,
} from "@entities/product/model/productsSlice";
import { Radio } from "@shared/ui/Radio";
import { ChangeEvent, useState } from "react";
import { LoaderComponent } from "@shared/ui/LoaderComponent";
import { TConstructor } from "./Constructor.type";
import { ProductEditor } from "../ProductEditor";
import useConfirmModal from "@shared/lib/hooks/useConfirmModal";
import { ConfirmModal } from "@shared/ui/ConfirmModal";
import { Toast } from "@/shared/ui/Toast";
import useToast from "@/shared/lib/hooks/useToast";
import { Paragraph } from "@/shared/ui/Paragraph";
import { Container } from "@/shared/ui/Container";
import { MainContainer } from "@/shared/ui/MainContainer/MainContainer";

const initialStateConstructor: TConstructor = {
  modelId: null,
  optionId: null,
  selectedDiscountIds: [],
};

export const Constructor = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);
  const loading = useAppSelector(getLoading);
  const { modal, showConfirm, handleConfirm, handleCancel, handleClose } =
    useConfirmModal();
  const { toasts, showToast, removeToast } = useToast();

  const [hasChange, setHasChange] = useState(false);
  const [createNewProduct, setCreateNewProduct] = useState(false);
  const [selectModel, setSelectModel] = useState(initialStateConstructor);

  const handleModelChange = async (id: string) => {
    if (createNewProduct) {
      const result = await showConfirm(
        "Это действие приведет к удалению всех ранее записанных изменений. Выйти из режима редактирования?",
      );

      if (!result) return;
      dispatch(setEditing(false));
      showToast("Все действия были отменены");
    }

    setSelectModel({
      ...initialStateConstructor,
      modelId: id,
      optionId: id,
    });
    setCreateNewProduct(false);
  };

  if (loading)
    return (
      <Container className={styles.wrapper}>
        <MainContainer title="Конструктор">
          <LoaderComponent />
        </MainContainer>
      </Container>
    );

  return (
    <>
      <Container className={styles.wrapper}>
        <MainContainer title="Конструктор" className={styles.editor}>
          <GroupeContainer
            title="Выбор модели"
            className={`${products.length !== 0 ? styles.products : styles.products_empty}`}
            disabled={hasChange}
          >
            {products.length !== 0 ? (
              products.map((product) => (
                <Radio
                  key={product.id}
                  text={product.name}
                  value={product.id}
                  name="model"
                  checked={selectModel.modelId === product.id}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleModelChange(event.target.value)
                  }
                />
              ))
            ) : (
              <Paragraph>Модели для выбора отсуствуют</Paragraph>
            )}
          </GroupeContainer>
          <ProductEditor
            key={selectModel.modelId}
            showToast={showToast}
            productId={selectModel.modelId || ""}
            hasChange={setHasChange}
            createdProduct={{
              state: createNewProduct,
              dispatch: setCreateNewProduct,
            }}
            changeProduct={{
              initialState: initialStateConstructor,
              dispatch: setSelectModel,
            }}
          />
        </MainContainer>
      </Container>
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

import { Section } from "@/shared/ui/Section";
import styles from "./Constructor.module.scss";
import { GroupeContainer } from "@shared/ui/GroupeContainer";
import { useAppSelector } from "@shared/lib/hooks/redux";
import {
  getProducts,
  getStatusLoading,
} from "@entities/product/model/productsSlice";
import { Radio } from "@shared/ui/Radio";
import { ChangeEvent, useState } from "react";
import { LoaderComponent } from "@shared/ui/LoaderComponent";
import { TConstructor } from "./Constructor.type";
import { ProductEditor } from "../ProductEditor";
import useConfirmModal from "@shared/lib/hooks/useConfirmModal";
import { ConfirmModal } from "@shared/ui/ConfirmModal";

const initialStateConstructor: TConstructor = {
  modelId: null,
  optionId: null,
  selectedDiscountIds: [],
};

export const Constructor = () => {
  const products = useAppSelector(getProducts);
  const loading = useAppSelector(getStatusLoading);
  const { modal, showConfirm, handleConfirm, handleCancel, handleClose } =
    useConfirmModal();

  const [hasChange, setHasChange] = useState(false);
  const [createNewProduct, setCreateNewProduct] = useState(false);
  const [selectModel, setSelectModel] = useState(initialStateConstructor);

  const selectedProduct = products.find(
    (product) => product.id === selectModel.modelId,
  );

  const handleModelChange = async (id: string) => {
    if (createNewProduct) {
      const result = await showConfirm(
        "Это действие приведет к удалению всех записанных изменений. Выйти из создания новой модели?",
      );

      if (!result) return;
    }

    setSelectModel({
      ...initialStateConstructor,
      modelId: id,
      optionId: id,
    });
    setCreateNewProduct(false);
  };

  const options = selectedProduct?.options || [];
  const discounts = selectedProduct?.discounts || [];

  if (loading) return <LoaderComponent />;

  return (
    <>
      <Section>
        <GroupeContainer title="Конструктор" className={styles.container}>
          <GroupeContainer
            title="Выбор модели"
            className={styles.products}
            disabled={hasChange}
          >
            {products.map((product) => (
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
            ))}
          </GroupeContainer>
          <GroupeContainer
            title="Создание и редактирование"
            className={styles.editor}
          >
            <ProductEditor
              key={selectModel.modelId}
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
          </GroupeContainer>
        </GroupeContainer>
      </Section>
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

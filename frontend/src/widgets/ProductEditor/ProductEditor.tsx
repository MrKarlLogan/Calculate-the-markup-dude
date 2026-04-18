import { GroupeContainer } from "@/shared/ui/GroupeContainer";
import styles from "./ProductEditor.module.scss";
import { Button } from "@shared/ui/Button";
import { TProductEditor } from "./ProductEditor.type";
import { TextInput } from "@shared/ui/TextInput";

export const ProductEditor = ({
  product,
  createdProduct,
  changeProduct,
}: TProductEditor) => {
  const handleCreateNewProduct = () => {
    changeProduct.dispatch(changeProduct.initialState);
    createdProduct.dispatch(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <Button
          text="Создать новую модель"
          className={styles.buttons_all}
          onClick={handleCreateNewProduct}
          disabled={createdProduct.state}
        />
        <Button
          text="Редактировать выбранную модель"
          className={styles.buttons_all}
          disabled={!product?.modelId}
        />
        <Button
          text="Удалить выбранную модель"
          className={styles.buttons_all}
          disabled={!product?.modelId}
        />
      </div>
      <div className={styles.inputs}>
        <TextInput
          text="Название новой модели"
          placeholder="Введите название новой модели"
          disabled={!createdProduct.state}
        />
        <GroupeContainer title="Все комплектации"></GroupeContainer>
        <GroupeContainer title="Все поддержки"></GroupeContainer>
      </div>
    </div>
  );
};

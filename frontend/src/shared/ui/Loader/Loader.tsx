import type { CSSProperties } from "react";
import styles from "./Loader.module.scss";

type TLoader = {
  text?: string;
};

export const Loader = (props: TLoader) => {
  const { text = "Загрузка" } = props;

  return (
    <div
      style={{ "--loader-text": `"${text}"` } as CSSProperties}
      className={styles.loader}
      aria-label="Индикатор загрузки"
    ></div>
  );
};

import type { CSSProperties } from "react";
import styles from "./Loader.module.scss";
import { TLoader } from "./Loader.type";

export const Loader = ({ text = "Загрузка..." }: TLoader) => (
  <div
    style={{ "--loader-text": `"${text}"` } as CSSProperties}
    className={styles.loader}
    aria-label="Индикатор загрузки"
  ></div>
);

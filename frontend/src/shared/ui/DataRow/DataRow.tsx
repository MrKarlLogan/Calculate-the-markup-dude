import { CSSProperties } from "react";
import styles from "./DataRow.module.scss";
import { TDataRow } from "./DataRow.type";

export const DataRow = ({
  text,
  value,
  unit = "руб.",
  size = 14,

  weight = "regular",
}: TDataRow) => {
  return (
    <div
      className={styles.container}
      style={{ "--size": `${size}px` } as CSSProperties}
    >
      <span className={styles.text}>{`${text}: `}</span>
      <span
        className={`${styles.num} ${value < 0 ? styles.error : ""}`}
        style={{ "--weight": weight } as CSSProperties}
      >{`${value.toLocaleString("ru-RU")} ${unit}`}</span>
    </div>
  );
};

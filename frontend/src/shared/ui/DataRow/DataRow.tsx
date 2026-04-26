import { CSSProperties } from "react";
import styles from "./DataRow.module.scss";
import { TDataRow } from "./DataRow.type";

export const DataRow = ({
  text,
  value,
  unit = "руб.",
  size = 16,
  weight = "regular",
  className,
}: TDataRow) => (
  <div
    className={`${styles.container} ${className}`}
    style={{ "--size": `${size}px`, "--weight": weight } as CSSProperties}
  >
    <span className={styles.text}>{`${text}: `}</span>
    <span
      className={`${styles.num} ${value < 0 ? styles.error : ""}`}
    >{`${value.toLocaleString("ru-RU")} ${unit}`}</span>
  </div>
);

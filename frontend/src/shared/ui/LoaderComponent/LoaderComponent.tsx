import styles from "./LoaderComponent.module.scss";

export const LoaderComponent = () => {
  return (
    <div className={styles.loader_component} aria-label="Индикатор загрузки">
      <span className={styles.circle_one}></span>
      <span className={styles.circle_two}></span>
      <span className={styles.circle_three}></span>
    </div>
  );
};

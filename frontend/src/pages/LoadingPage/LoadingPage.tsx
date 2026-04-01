import { Loader } from "@/shared/ui/Loader";
import styles from "./LoadingPage.module.scss";

export const LoadingPage = () => (
  <div className={styles.container}>
    <Loader />
  </div>
);

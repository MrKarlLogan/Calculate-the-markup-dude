import { Loader } from "@shared/ui/Loader";
import styles from "./LoadingPage.module.scss";

const LoadingPage = () => (
  <div className={styles.container}>
    <Loader />
  </div>
);

export default LoadingPage;

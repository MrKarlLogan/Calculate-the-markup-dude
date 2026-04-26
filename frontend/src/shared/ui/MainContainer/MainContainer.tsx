import styles from "./MainContainer.module.scss";
import { Paragraph } from "../Paragraph";
import { TMainContainer } from "./MainContainer.type";

export const MainContainer = ({
  title,
  children,
  ...other
}: TMainContainer) => {
  return (
    <div
      {...other}
      className={styles.container}
    >
      <Paragraph
        position="start"
        weight="bold"
        size={18}
        className={styles.title}
      >
        {title}
      </Paragraph>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

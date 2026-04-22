import { IAuthData } from "@/entities/user/types/types";
import { Paragraph } from "../Paragraph";
import { Button } from "../Button";
import styles from "./UserCard.module.scss";
import { useAppSelector } from "@/shared/lib/hooks/redux";
import { getUserId } from "@/entities/user/model/userSlice";

export const UserCard = ({ user }: { user: IAuthData }) => {
  const id = useAppSelector(getUserId);

  return (
    <div key={user.id} className={styles.card_users}>
      <div className={styles.description}>
        {id === user.id && (
          <Paragraph position="start" weight="bold" className={styles.me}>
            Это вы
          </Paragraph>
        )}
        <Paragraph position="start">
          Пользователь: <span className={styles.span}>{user.name}</span>
        </Paragraph>
        <Paragraph position="start">
          Роль:{" "}
          <span className={styles.span}>
            {user.role === "admin" ? "Администратор" : "Пользователь"}
          </span>
        </Paragraph>
      </div>
      <div className={styles.buttons}>
        {user.role === "others" && (
          <Button className={styles.button} text="Сделать администратором" />
        )}
        {id !== user.id && <Button className={styles.button} text="Удалить" />}
      </div>
    </div>
  );
};

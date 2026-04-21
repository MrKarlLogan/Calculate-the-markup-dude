import { IAuthData } from "@/entities/user/types/types";
import { Paragraph } from "../Paragraph";
import { Button } from "../Button";
import styles from "./UserCard.module.scss";

export const UserCard = ({ user }: { user: IAuthData }) => {
  return (
    <div key={user.id} className={styles.card_users}>
      <Paragraph>{user.name}</Paragraph>
      <Paragraph>
        Роль: {user.role === "admin" ? "Администратор" : "Пользователь"}
      </Paragraph>
      <Button text="Изменить" />
    </div>
  );
};

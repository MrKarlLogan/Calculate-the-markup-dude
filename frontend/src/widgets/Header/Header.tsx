"use client";

import { Button } from "@shared/ui/Button";
import { Greeting } from "@shared/ui/Greeting";
import styles from "./Header.module.scss";
import authApi from "@/shared/api/authApi";
import { useRouter } from "next/navigation";
import { CLIENT_PATH } from "@shared/config/constants";
import { useAppSelector } from "@shared/lib/hooks/redux";
import { getUser } from "@entities/user/model/userSlice";
import { THeader } from "./Header.type";
import { getEditing, getLoading } from "@/entities/product/model/productsSlice";

export const Header = ({ toggle, onToggle }: THeader) => {
  const router = useRouter();
  const loading = useAppSelector(getLoading);
  const user = useAppSelector(getUser);
  const editing = useAppSelector(getEditing);

  const handleLogout = async () => {
    const result = await authApi.logout();
    if (result.success) router.replace(CLIENT_PATH.AUTH);
  };

  return (
    <header className={styles.header__wrapper}>
      <div className={styles.header}>
        <Greeting name={user?.name ?? "пользователь"} />
        <nav className={styles.nav}>
          {user?.role === "admin" && (
            <Button
              text={toggle ? "Калькулятор" : "Конструктор"}
              onClick={onToggle}
              disabled={loading || editing}
              className={styles.buttons}
            />
          )}
          <Button
            text="Выход"
            onClick={handleLogout}
            disabled={editing}
            className={styles.buttons}
          />
        </nav>
      </div>
    </header>
  );
};

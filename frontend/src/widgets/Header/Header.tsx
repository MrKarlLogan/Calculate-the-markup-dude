"use client";

import { Button } from "@shared/ui/Button";
import { Greeting } from "@shared/ui/Greeting";
import styles from "./Header.module.scss";
import Api from "@/shared/api/AuthApi";
import { useRouter } from "next/navigation";
import { CLIENT_PATH } from "@shared/config/constants";
import { useAppSelector } from "@shared/lib/hooks/redux";
import { getRole, getUser } from "@entities/user/model/userSlice";

export const Header = () => {
  const router = useRouter();
  const user = useAppSelector(getUser);
  const role = useAppSelector(getRole);

  const handleLogout = async () => {
    const result = await Api.logout();
    if (result.success) router.push(CLIENT_PATH.AUTH);
  };

  return (
    <header className={styles.header}>
      <Greeting name={user ?? "пользователь"} />
      <nav className={styles.nav}>
        {role === "admin" && <Button text="Конструктор" />}
        <Button text="Выход" onClick={handleLogout} />
      </nav>
    </header>
  );
};

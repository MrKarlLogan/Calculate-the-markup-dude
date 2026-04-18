import { Button } from "@shared/ui/Button";
import { Greeting } from "@shared/ui/Greeting";
import styles from "./Header.module.scss";
import authApi from "@/shared/api/authApi";
import { useRouter } from "next/navigation";
import { CLIENT_PATH } from "@shared/config/constants";
import { useAppSelector } from "@shared/lib/hooks/redux";
import { getRole, getUser } from "@entities/user/model/userSlice";

export const Header = ({
  toggle,
  onToggle,
}: {
  toggle?: boolean;
  onToggle?: () => void;
}) => {
  const router = useRouter();
  const user = useAppSelector(getUser);
  const role = useAppSelector(getRole);

  const handleLogout = async () => {
    const result = await authApi.logout();
    if (result.success) router.push(CLIENT_PATH.AUTH);
  };

  return (
    <header className={styles.header}>
      <Greeting name={user ?? "пользователь"} />
      <nav className={styles.nav}>
        {role === "admin" && (
          <Button
            text={toggle ? "Калькулятор" : "Конструктор"}
            onClick={onToggle}
          />
        )}
        <Button text="Выход" onClick={handleLogout} />
      </nav>
    </header>
  );
};

import styles from "./RegisterForm.module.scss";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Paragraph } from "@/shared/ui/Paragraph";
import { Button } from "@shared/ui/Button";
import { Input } from "@shared/ui/Input";
import { GroupeContainer } from "@/shared/ui/GroupeContainer";
import { Radio } from "@shared/ui/Radio";
import { Toast } from "@shared/ui/Toast";
import useToast from "@shared/lib/hooks/useToast";
import Api from "@shared/api";

export const RegisterForm = ({ selectForm }: { selectForm: () => void }) => {
  const [isEmpty, setIsEmpty] = useState({
    login: true,
    password: true,
    name: true,
    role: true,
    registrationPassword: true,
  });
  const { toasts, showToast, removeToast } = useToast();

  const disabledButton =
    isEmpty.login ||
    isEmpty.name ||
    isEmpty.password ||
    isEmpty.registrationPassword ||
    isEmpty.role;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setIsEmpty((prev) => ({ ...prev, [name]: value.trim() === "" }));
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const login = formData.get("login")?.toString();
    const password = formData.get("password")?.toString();
    const name = formData.get("name")?.toString();
    const role = formData.get("role")?.toString();
    const registrationPassword = formData
      .get("registrationPassword")
      ?.toString();

    if (!login || !password || !name || !role || !registrationPassword)
      return showToast("Все поля обязательны для заполнения");

    try {
      const result = await Api.register({
        login,
        password,
        name,
        role,
        registrationPassword,
      });

      if (result.success) selectForm();
      else {
        const errorMessage = result.validation?.body?.message || result.message;
        showToast(errorMessage || "Произошла ошибка при регистрации");
      }
    } catch {
      showToast("Ошибка при получении данных от сервера");
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          name="login"
          text="Логин"
          placeholder="Придумайте логин"
          autoComplete="off"
          onChange={handleChange}
        />
        <Input
          name="password"
          text="Пароль"
          placeholder="Придумайте пароль"
          type="password"
          autoComplete="off"
          onChange={handleChange}
        />
        <Input
          name="name"
          text="Ваше ФИО"
          placeholder="Введите ваше имя и фамилию"
          autoComplete="off"
          onChange={handleChange}
        />
        <GroupeContainer text="Ваша роль">
          <Radio
            value="admin"
            text="Администратор"
            name="role"
            onChange={handleChange}
          />
          <Radio
            value="others"
            text="Пользователь"
            name="role"
            onChange={handleChange}
          />
        </GroupeContainer>
        <Input
          name="registrationPassword"
          text="Пароль администратора*"
          placeholder="Введите пароль администратора"
          type="password"
          autoComplete="off"
          onChange={handleChange}
        />
        <Paragraph position="start">
          * Пароль администратора необходим для создания новых пользователей
        </Paragraph>
        <div className={styles.buttons}>
          <Button
            text="Зарегистрироваться"
            type="submit"
            disabled={disabledButton}
          />
          <Button
            text="Уже есть учётная запись"
            onClick={selectForm}
            type="button"
          />
        </div>
      </form>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          text={toast.text}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </>
  );
};

"use client";

import { ChangeEvent, SyntheticEvent, useState } from "react";
import styles from "./LoginForm.module.scss";
import { Input } from "@shared/ui/Input";
import { Button } from "@shared/ui/Button";
import { useRouter } from "next/navigation";
import { CLIENT_PATH } from "@shared/config/constants";
import { Toast } from "@shared/ui/Toast";
import useToast from "@shared/lib/hooks/useToast";
import Api from "@shared/api";
import { Headline } from "@/shared/ui/Headline";

export const LoginForm = ({ selectForm }: { selectForm: () => void }) => {
  const router = useRouter();
  const { toasts, showToast, removeToast } = useToast();
  const [isEmpty, setIsEmpty] = useState({
    login: true,
    password: true,
  });
  const disabledButton = isEmpty.login || isEmpty.password;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setIsEmpty((prev) => ({ ...prev, [name]: value.trim() === "" }));
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const login = formData.get("login")?.toString();
    const password = formData.get("password")?.toString();

    if (!login || !password)
      return showToast("Все поля обязательны для заполнения");

    try {
      const result = await Api.login({ login, password });

      if (result.success) router.push(CLIENT_PATH.HOME);
      else {
        const errorMessage = result.validation?.body?.message || result.message;
        showToast(errorMessage || "Произошла ошибка при входе");
      }
    } catch {
      showToast("Ошибка при получении данных от сервера");
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Headline
          size={20}
          weight="bold"
          position="start"
          className={styles.title}
        >
          Вход
        </Headline>
        <Input
          name="login"
          text="Логин:"
          placeholder="Введите логин"
          onChange={handleChange}
        />
        <Input
          name="password"
          text="Пароль:"
          type="password"
          placeholder="Введите пароль"
          onChange={handleChange}
        />
        <div className={styles.buttons}>
          <Button text="Войти" type="submit" disabled={disabledButton} />
          <Button text="Регистрация" onClick={selectForm} type="button" />
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

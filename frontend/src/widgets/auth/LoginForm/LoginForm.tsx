"use client";

import { ChangeEvent, SyntheticEvent, useState } from "react";
import styles from "./LoginForm.module.scss";
import { TextInput } from "@shared/ui/TextInput";
import { Button } from "@shared/ui/Button";
import { useRouter } from "next/navigation";
import { CLIENT_PATH } from "@shared/config/constants";
import { Toast } from "@shared/ui/Toast";
import useToast from "@shared/lib/hooks/useToast";
import authApi from "@shared/api/authApi";
import { Headline } from "@shared/ui/Headline";
import { PasswordInput } from "@shared/ui/PasswordInput";
import { getApiErrorMessage } from "@shared/lib/helpers/getApiErrorMessage";
import { LoginFormState } from "./LoginForm.type";

const initialState: LoginFormState = {
  login: "",
  password: "",
};

export const LoginForm = ({ selectForm }: { selectForm: () => void }) => {
  const router = useRouter();
  const { toasts, showToast, removeToast } = useToast();

  const [form, setForm] = useState<LoginFormState>(initialState);

  const disabledButton = !form.login.trim() || !form.password.trim();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { login, password } = form;

    if (!login || !password) {
      showToast("Все поля обязательны для заполнения");
      return;
    }

    try {
      const result = await authApi.login({ login, password });

      if (!result.success) {
        showToast(
          getApiErrorMessage(result, "Произошла ошибка при входе в приложение"),
        );
        return;
      }

      router.replace(CLIENT_PATH.HOME);
    } catch (error) {
      showToast(
        getApiErrorMessage(error, "Ошибка при получении данных от сервера"),
      );
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

        <TextInput
          name="login"
          text="Логин:"
          placeholder="Введите логин"
          value={form.login}
          onChange={handleChange}
        />

        <PasswordInput
          name="password"
          text="Пароль:"
          placeholder="Введите пароль"
          value={form.password}
          onChange={handleChange}
        />

        <div className={styles.buttons}>
          <Button text="Войти" type="submit" disabled={disabledButton} />
          <Button text="Регистрация" onClick={selectForm} />
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

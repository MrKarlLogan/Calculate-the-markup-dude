"use client";

import { SyntheticEvent, useState } from "react";
import styles from "./RegisterForm.module.scss";
import { Paragraph } from "@shared/ui/Paragraph";
import { Button } from "@shared/ui/Button";
import { TextInput } from "@shared/ui/TextInput";
import { GroupeContainer } from "@shared/ui/GroupeContainer";
import { Radio } from "@shared/ui/Radio";
import { Toast } from "@shared/ui/Toast";
import { Headline } from "@shared/ui/Headline";
import { PasswordInput } from "@shared/ui/PasswordInput";
import useToast from "@shared/lib/hooks/useToast";
import authApi from "@shared/api/authApi";
import { getApiErrorMessage } from "@shared/lib/helpers/getApiErrorMessage";
import { FormState } from "./RegisterForm.type";

const initialState: FormState = {
  login: "",
  password: "",
  name: "",
  registrationPassword: "",
  role: "",
};

export const RegisterForm = ({ selectForm }: { selectForm: () => void }) => {
  const [form, setForm] = useState(initialState);
  const { toasts, showToast, removeToast } = useToast();

  const handleChange =
    (field: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const disabledButton =
    !form.login.trim() ||
    !form.password.trim() ||
    !form.name.trim() ||
    !form.registrationPassword.trim() ||
    !form.role;

  const resetForm = () => setForm(initialState);

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { login, password, name, role, registrationPassword } = form;

    if (!login || !password || !name || !role || !registrationPassword) {
      showToast("Все поля обязательны для заполнения");
      return;
    }

    try {
      const result = await authApi.register({
        login,
        password,
        name,
        role,
        registrationPassword,
      });

      if (!result.success) {
        showToast(
          getApiErrorMessage(result, "Произошла ошибка при регистрации"),
        );
        return;
      }

      resetForm();
      showToast(`Создан новый пользователь: ${result.data.name}`);
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
          Регистрация
        </Headline>

        <TextInput
          name="login"
          text="Логин"
          placeholder="Придумайте логин"
          autoComplete="off"
          value={form.login}
          onChange={handleChange("login")}
        />

        <Paragraph position="start" size={12}>
          <strong>Логин:</strong> только латинские буквы, цифры, точки, дефисы,
          нижнее подчёркивание. Без пробелов
        </Paragraph>

        <PasswordInput
          name="password"
          text="Пароль"
          placeholder="Придумайте пароль"
          autoComplete="off"
          value={form.password}
          onChange={handleChange("password")}
        />

        <Paragraph position="start" size={12}>
          <strong>Пароль:</strong> латиница, минимум 1 заглавная буква, цифра и
          символ
        </Paragraph>

        <TextInput
          name="name"
          text="ФИО пользователя"
          placeholder="Введите имя"
          autoComplete="off"
          value={form.name}
          onChange={handleChange("name")}
        />

        <GroupeContainer
          title="Роль пользователя"
          className={styles.radioGroupe}
        >
          <Radio
            value="admin"
            text="Администратор"
            name="role"
            checked={form.role === "admin"}
            onChange={handleChange("role")}
          />

          <Radio
            value="others"
            text="Пользователь"
            name="role"
            checked={form.role === "others"}
            onChange={handleChange("role")}
          />
        </GroupeContainer>

        <PasswordInput
          name="registrationPassword"
          text="Пароль администратора"
          placeholder="Введите пароль администратора"
          autoComplete="off"
          value={form.registrationPassword}
          onChange={handleChange("registrationPassword")}
        />

        <Paragraph position="start" size={12}>
          <strong>Ключ администратора:</strong> служебный доступ для создания
          аккаунтов
        </Paragraph>

        <div className={styles.buttons}>
          <Button
            text="Зарегистрироваться"
            type="submit"
            disabled={disabledButton}
          />
          <Button text="Войти" onClick={selectForm} />
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

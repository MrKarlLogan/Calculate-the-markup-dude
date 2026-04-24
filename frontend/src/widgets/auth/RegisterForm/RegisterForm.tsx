"use client";

import styles from "./RegisterForm.module.scss";
import { SyntheticEvent, useState } from "react";
import { Paragraph } from "@shared/ui/Paragraph";
import { Button } from "@shared/ui/Button";
import { TextInput } from "@shared/ui/TextInput";
import { GroupeContainer } from "@shared/ui/GroupeContainer";
import { Radio } from "@shared/ui/Radio";
import { Toast } from "@shared/ui/Toast";
import useToast from "@shared/lib/hooks/useToast";
import authApi from "@/shared/api/authApi";
import { Headline } from "@shared/ui/Headline";
import { PasswordInput } from "@shared/ui/PasswordInput";
import { getApiErrorMessage } from "@/shared/lib/helpers/getApiErrorMessage";
import { FormState } from "./RegisterForm.type";

const initialState: FormState = {
  login: "",
  password: "",
  name: "",
  registrationPassword: "",
};

export const RegisterForm = ({ selectForm }: { selectForm: () => void }) => {
  const [form, setForm] = useState<FormState>(initialState);
  const [role, setRole] = useState("");

  const { toasts, showToast, removeToast } = useToast();

  const disabledButton =
    !form.login.trim() ||
    !form.password.trim() ||
    !form.name.trim() ||
    !form.registrationPassword.trim() ||
    !role;

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { login, password, name, registrationPassword } = form;

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

      setForm(initialState);
      setRole("");

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
          onChange={handleInput}
        />

        <Paragraph position="start" size={12}>
          <strong>Логин:</strong> только латинские буквы, цифры, точки, дефисы,
          нижнее подчёркивание. Без пробелов
        </Paragraph>

        <PasswordInput
          name="password"
          text="Пароль"
          placeholder="Придумайте пароль"
          type="password"
          autoComplete="off"
          value={form.password}
          onChange={handleInput}
        />

        <Paragraph position="start" size={12}>
          <strong>Пароль:</strong> только латинские буквы, без пробелов.
          Обязательно: одна заглавная буква, одна цифра, один спецсимвол
        </Paragraph>

        <TextInput
          name="name"
          text="ФИО пользователя"
          placeholder="Введите фамилию и имя пользователя"
          autoComplete="off"
          value={form.name}
          onChange={handleInput}
        />

        <GroupeContainer
          title="Роль пользователя"
          className={styles.radioGroupe}
        >
          <Radio
            value="admin"
            text="Администратор"
            name="role"
            checked={role === "admin"}
            onChange={(e) => setRole(e.currentTarget.value)}
          />

          <Radio
            value="others"
            text="Пользователь"
            name="role"
            checked={role === "others"}
            onChange={(e) => setRole(e.currentTarget.value)}
          />
        </GroupeContainer>

        <PasswordInput
          name="registrationPassword"
          text="Пароль администратора"
          placeholder="Введите пароль администратора"
          type="password"
          autoComplete="off"
          value={form.registrationPassword}
          onChange={handleInput}
        />

        <Paragraph position="start" size={12}>
          <strong>Пароль администратора:</strong> служебный ключ доступа для
          создания учётных записей
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

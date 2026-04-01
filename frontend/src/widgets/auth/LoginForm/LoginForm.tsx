"use client";

import { Input } from "@shared/ui/Input";
import styles from "./LoginForm.module.scss";
import { Button } from "@shared/ui/Button";
import { useRouter } from "next/navigation";
import { config } from "@shared/config";
import { URL_PATH } from "@shared/config/constants";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Toast } from "@/shared/ui/Toast";
import useToast from "@/shared/lib/hooks/useToast";

export const LoginForm = () => {
  const router = useRouter();
  const { toasts, showToast, removeToast } = useToast();
  const [isEmpty, setIsEmpty] = useState({
    login: true,
    password: true,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setIsEmpty((prev) => ({ ...prev, [name]: value.trim() === "" }));
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const login = formData.get("login");
    const password = formData.get("password");

    const response = await fetch(`${config.API_URL}${URL_PATH.LOGIN}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ login, password }),
    });

    const result = await response.json();

    if (result.success) router.push("/");
    else showToast(result.message || "Произошла ошибка при входе");
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          name="login"
          text="Логин:"
          placeholder="Введите логин"
          onChange={handleChange}
          autoComplete="off"
        />
        <Input
          name="password"
          text="Пароль:"
          type="password"
          placeholder="Введите пароль"
          onChange={handleChange}
          autoComplete="off"
        />
        <div className={styles.buttons}>
          <Button
            text="Войти"
            type="submit"
            disabled={isEmpty.login || isEmpty.password}
          />
          <Button text="Регистрация" onClick={() => {}} type="button" />
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

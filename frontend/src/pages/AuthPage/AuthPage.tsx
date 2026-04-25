"use client";

import { MainLayout } from "@/widgets/MainLayout";
import styles from "./AuthPage.module.scss";
import { Section } from "@shared/ui/Section";
import { Headline } from "@shared/ui/Headline";
import { Paragraph } from "@shared/ui/Paragraph";
import { useState } from "react";
import { Footer } from "@widgets/Footer";
import { LoginForm } from "@/widgets/auth/LoginForm";
import { RegisterForm } from "@/widgets/auth/RegisterForm";

export const AuthPage = () => {
  const [selectForm, setSelectForm] = useState<"login" | "register">("login");

  return (
    <MainLayout>
      <div className={styles.container}>
        <Section className={styles.welcome}>
          <Headline size={30} weight="bold" className={styles.welcome__title}>
            Добро пожаловать
          </Headline>
          <Paragraph className={styles.welcome__text}>
            Для дальнейшей работы необходимо выполнить вход или произвести
            регистрацию
          </Paragraph>
        </Section>
        <Section className={styles.LoginForm}>
          {selectForm === "login" ? (
            <LoginForm selectForm={() => setSelectForm("register")} />
          ) : (
            <RegisterForm selectForm={() => setSelectForm("login")} />
          )}
        </Section>
      </div>
      <Footer />
    </MainLayout>
  );
};

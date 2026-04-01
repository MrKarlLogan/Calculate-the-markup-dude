"use client";

import { MainLayout } from "@shared/ui/MainLayout";
import styles from "./page.module.scss";
import { Section } from "@shared/ui/Section";
import { Headline } from "@shared/ui/Headline";
import { Paragraph } from "@shared/ui/Paragraph";
import { LoginForm } from "@/widgets/auth/LoginForm";
import { useState } from "react";
import { RegisterForm } from "@/widgets/auth/RegisterForm";

const Auth = () => {
  const [selectForm, setSelectForm] = useState<"login" | "register">("login");

  return (
    <MainLayout className={styles.container}>
      <Section className={styles.welcome}>
        <Headline size={30} weight="bold">
          Добро пожаловать
        </Headline>
        <Paragraph>
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
    </MainLayout>
  );
};

export default Auth;

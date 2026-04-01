import { MainLayout } from "@shared/ui/MainLayout";
import styles from "./page.module.scss";
import { Section } from "@shared/ui/Section";
import { Headline } from "@shared/ui/Headline";
import { Paragraph } from "@shared/ui/Paragraph";
import { LoginForm } from "@widgets/auth/LoginForm";

const Auth = () => {
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
      <Section className={styles.authform}>
        <LoginForm />
      </Section>
    </MainLayout>
  );
};

export default Auth;

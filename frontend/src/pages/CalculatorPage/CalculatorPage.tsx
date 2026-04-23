"use client";

import { Header } from "@widgets/Header";
import { MainLayout } from "@widgets/MainLayout";
import { Calculator } from "@widgets/Calculator/Calculator";
import { Agreement } from "@widgets/Agreement";
import { Footer } from "@widgets/Footer";
import styles from "./CalculatorPage.module.scss";
import { useEffect, useState } from "react";
import { Constructor } from "@widgets/Constructor";
import { Section } from "@shared/ui/Section";
import { Notification } from "@widgets/Notification";
import { useAppDispatch } from "@shared/lib/hooks/redux";
import { fetchProducts } from "@entities/product/api";
import { UsersEditor } from "@/widgets/UsersEditor";

export const CalculatorPage = () => {
  const [toggleComponent, setToggleComponent] = useState(false);
  const dispath = useAppDispatch();

  useEffect(() => {
    dispath(fetchProducts());
  }, [dispath]);

  return (
    <MainLayout>
      <Header
        toggle={toggleComponent}
        onToggle={() => setToggleComponent((prev) => !prev)}
      />
      <main className={styles.content}>
        {!toggleComponent ? (
          <Section
            key={toggleComponent ? "constructor" : "calculator"}
            className={styles.content__calculator}
          >
            <Calculator />
            <Section className={styles.content__other}>
              <Notification className={styles.content__other_notification} />
              <Agreement className={styles.content__other_agreement} />
            </Section>
          </Section>
        ) : (
          <Section className={styles.content__constructor}>
            <Constructor />
            <Section className={styles.content__other}>
              <Notification
                className={styles.content__other_notification_editor}
                isEdit
              />
              <UsersEditor className={styles.content__other_user_editor} />
            </Section>
          </Section>
        )}
      </main>
      <Footer />
    </MainLayout>
  );
};

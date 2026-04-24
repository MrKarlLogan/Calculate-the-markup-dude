"use client";

import { Header } from "@widgets/Header";
import { MainLayout } from "@widgets/MainLayout";
import { Calculator } from "@widgets/Calculator/Calculator";
import { Agreement } from "@widgets/Agreement";
import { Footer } from "@widgets/Footer";
import styles from "./CalculatorPage.module.scss";
import { useEffect, useState } from "react";
import { Constructor } from "@widgets/Constructor";
import { Notification } from "@widgets/Notification";
import { useAppDispatch, useAppSelector } from "@shared/lib/hooks/redux";
import { fetchProducts } from "@entities/product/api";
import { UsersEditor } from "@/widgets/UsersEditor";
import { getLoading } from "@/entities/product/model/productsSlice";
import { Loader } from "@/shared/ui/Loader";
import { Container } from "@/shared/ui/Container";

export const CalculatorPage = () => {
  const [toggleComponent, setToggleComponent] = useState(false);
  const dispath = useAppDispatch();
  const loading = useAppSelector(getLoading);

  useEffect(() => {
    dispath(fetchProducts());
  }, [dispath]);

  if (loading)
    return (
      <MainLayout>
        <Loader />
      </MainLayout>
    );

  return (
    <MainLayout>
      <Header
        toggle={toggleComponent}
        onToggle={() => setToggleComponent((prev) => !prev)}
      />
      <main className={styles.content}>
        {!toggleComponent ? (
          <Container
            key={toggleComponent ? "constructor" : "calculator"}
            className={styles.content__calculator}
          >
            <Calculator />
            <Container className={styles.content__other}>
              <Notification className={styles.content__other_notification} />
              <Agreement className={styles.content__other_agreement} />
            </Container>
          </Container>
        ) : (
          <Container className={styles.content__constructor}>
            <Constructor />
            <Container className={styles.content__other}>
              <Notification
                className={styles.content__other_notification_editor}
                isEdit
              />
              <UsersEditor className={styles.content__other_user_editor} />
            </Container>
          </Container>
        )}
      </main>
      <Footer />
    </MainLayout>
  );
};

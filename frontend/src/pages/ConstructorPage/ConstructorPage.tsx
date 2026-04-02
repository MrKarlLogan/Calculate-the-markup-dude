"use client";

import { Header } from "@widgets/Header";
import { MainLayout } from "@/widgets/MainLayout";
import styles from "./ConstructorPage.module.scss";

export const ConstructorPage = () => (
  <MainLayout>
    <Header />
    <main className={styles.container}></main>
  </MainLayout>
);

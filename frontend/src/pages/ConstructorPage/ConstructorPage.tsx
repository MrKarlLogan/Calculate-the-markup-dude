"use client";

import { Header } from "@widgets/Header";
import { MainLayout } from "@/widgets/MainLayout";
import styles from "./ConstructorPage.module.scss";
import { Constructor } from "@/widgets/Constructor/Constructor";
import { Agreement } from "@/widgets/Agreement";

export const ConstructorPage = () => (
  <MainLayout>
    <Header />
    <main className={styles.container}>
      <Constructor />
      <Agreement />
    </main>
  </MainLayout>
);

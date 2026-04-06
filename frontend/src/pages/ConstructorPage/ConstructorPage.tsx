"use client";

import { Header } from "@widgets/Header";
import { MainLayout } from "@widgets/MainLayout";
import { Constructor } from "@widgets/Constructor/Constructor";
import { Agreement } from "@widgets/Agreement";
import { Footer } from "@widgets/Footer";
import styles from "./ConstructorPage.module.scss";

export const ConstructorPage = () => (
  <MainLayout>
    <Header />
    <main className={styles.content}>
      <Constructor />
      <Agreement />
    </main>
    <Footer />
  </MainLayout>
);

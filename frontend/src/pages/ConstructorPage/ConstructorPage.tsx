"use client";

import { Section } from "@/shared/ui/Section";
import { Header } from "@/widgets/Header";
import { MainLayout } from "@shared/ui/MainLayout";
import styles from "./ConstructorPage.module.scss";

export const ConstructorPage = () => (
  <MainLayout>
    <Header />
    <Section className={styles.content}>Контент</Section>
  </MainLayout>
);

"use client";

import { Greeting } from "@shared/ui/Greeting";
import { MainLayout } from "@shared/ui/MainLayout";

export const ConstructorPage = () => (
  <MainLayout>
    <Greeting name="Тест" />
    <p>Домашняя страница</p>
  </MainLayout>
);

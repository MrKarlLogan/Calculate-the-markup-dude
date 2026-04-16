"use client";

import { Header } from "@widgets/Header";
import { MainLayout } from "@widgets/MainLayout";
import { Calculator } from "@/widgets/Calculator/Calculator";
import { Agreement } from "@widgets/Agreement";
import { Footer } from "@widgets/Footer";
import styles from "./CalculatorPage.module.scss";
import { useState } from "react";
import { Constructor } from "@widgets/Constructor";

export const CalculatorPage = () => {
  const [toggleComponent, setToggleComponent] = useState(false);

  return (
    <MainLayout>
      <Header onToggle={() => setToggleComponent((prev) => !prev)} />
      <main
        className={
          !toggleComponent
            ? styles.content_calculator
            : styles.content_constructor
        }
      >
        {!toggleComponent ? (
          <>
            <Calculator />
            <Agreement />
          </>
        ) : (
          <Constructor />
        )}
      </main>
      <Footer />
    </MainLayout>
  );
};

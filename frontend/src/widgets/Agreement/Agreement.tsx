"use client";

import { Section } from "@shared/ui/Section";
import { MainContainer } from "@shared/ui/MainContainer/MainContainer";
import { useAppSelector } from "@/shared/lib/hooks/redux";
import { getUser } from "@/entities/user/model/userSlice";
import { useWebSocket } from "@/shared/lib/hooks/useWebSocker";
import { LoaderComponent } from "@/shared/ui/LoaderComponent";
import styles from "./Agreement.module.scss";
import { AgreementMessage } from "@/shared/ui/AgreementMessage";

export const Agreement = ({ className }: { className?: string }) => {
  const user = useAppSelector(getUser);
  const userId = user?.id;
  const isAdmin = user?.role === "admin";

  const { agreements, loading } = useWebSocket(userId, isAdmin);

  if (loading)
    return (
      <Section className={className}>
        <MainContainer title="Согласование">
          <LoaderComponent />
        </MainContainer>
      </Section>
    );

  return (
    <Section className={className}>
      <MainContainer title="Согласование">
        <ul className={styles.agreement__list}>
          {agreements.map((agreement) => (
            <li key={agreement.id}>
              <AgreementMessage data={agreement} />
            </li>
          ))}
        </ul>
      </MainContainer>
    </Section>
  );
};

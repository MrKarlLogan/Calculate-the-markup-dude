"use client";

import { Section } from "@shared/ui/Section";
import styles from "./Agreement.module.scss";
import { GroupeContainer } from "@/shared/ui/GroupeContainer";

export const Agreement = ({ className }: { className?: string }) => (
  <Section className={className}>
    <GroupeContainer title="Согласование" className={styles.container}>
      <p>В разработке</p>
    </GroupeContainer>
  </Section>
);

// if (loading)
//   return (
//     <Section>
//       <GroupeContainer title="НЕ ЗАБЫТЬ ДОБАВИТЬ" className={styles.container}>
//         <LoaderComponent />
//       </GroupeContainer>
//     </Section>
//   );

"use client";

import { Section } from "@shared/ui/Section";
import { MainContainer } from "@shared/ui/MainContainer/MainContainer";

export const Agreement = ({ className }: { className?: string }) => (
  <Section className={className}>
    <MainContainer title="Согласование">
      <p>В разработке</p>
    </MainContainer>
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

import { Section } from "@shared/ui/Section";
import styles from "./Notification.module.scss";
import { GroupeContainer } from "@/shared/ui/GroupeContainer";

export const Notification = ({ className }: { className?: string }) => (
  <Section className={className}>
    <GroupeContainer title="Информация" className={styles.container}>
      <p>В разработке</p>
    </GroupeContainer>
  </Section>
);

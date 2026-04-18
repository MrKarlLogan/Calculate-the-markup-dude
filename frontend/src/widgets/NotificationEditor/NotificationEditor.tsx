import { GroupeContainer } from "@shared/ui/GroupeContainer";
import { Section } from "@shared/ui/Section";
import styles from "./NotificationEditor.module.scss";

export const NotificationEditor = ({ className }: { className?: string }) => (
  <Section className={className}>
    <GroupeContainer
      title="Информационный редактор"
      className={styles.container}
    >
      <p>В разработке</p>
    </GroupeContainer>
  </Section>
);

import { GroupeContainer } from "@shared/ui/GroupeContainer";
import { Section } from "@shared/ui/Section";
import styles from "./UsersEditor.module.scss";

export const UsersEditor = ({ className }: { className?: string }) => (
  <Section className={className}>
    <GroupeContainer
      title="Управление пользователями"
      className={styles.container}
    >
      <p>В разработке</p>
    </GroupeContainer>
  </Section>
);

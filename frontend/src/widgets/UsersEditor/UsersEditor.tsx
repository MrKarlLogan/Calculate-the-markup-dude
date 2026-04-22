import { GroupeContainer } from "@shared/ui/GroupeContainer";
import { Section } from "@shared/ui/Section";
import styles from "./UsersEditor.module.scss";
import { useEffect, useState } from "react";
import { IAuthData } from "@/entities/user/types/types";
import usersApi from "@/shared/api/usersApi";
import { LoaderComponent } from "@/shared/ui/LoaderComponent";
import { Paragraph } from "@/shared/ui/Paragraph";
import { UserCard } from "@/shared/ui/UserCard";
import { useAppSelector } from "@/shared/lib/hooks/redux";
import { getUserId } from "@/entities/user/model/userSlice";

export const UsersEditor = ({ className }: { className?: string }) => {
  const [users, setUsers] = useState<IAuthData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const id = useAppSelector(getUserId);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await usersApi.getAllusers();
        if (response.success) setUsers(response.data);
        else setError(response.message || "Ошибка при загрузке пользователей");
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Произошла неизвестная ошибка",
        );
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading)
    return (
      <Section className={className}>
        <GroupeContainer
          title="Управление пользователями"
          className={styles.container}
        >
          <LoaderComponent />
        </GroupeContainer>
      </Section>
    );

  if (error) {
    return (
      <Section className={className}>
        <GroupeContainer
          title="Управление пользователями"
          className={styles.container}
        >
          <Paragraph>{error}</Paragraph>
        </GroupeContainer>
      </Section>
    );
  }

  const sortedUsers =
    users &&
    [...users].sort((a, b) => {
      if (a.id === id) return -1;
      if (b.id === id) return 1;

      if (a.role === "admin" && b.role !== "admin") return -1;
      if (a.role !== "admin" && b.role === "admin") return 1;

      return a.name.localeCompare(b.name);
    });

  return (
    <Section className={className}>
      <GroupeContainer
        title="Управление пользователями"
        className={styles.container}
      >
        {users && users.length === 0 ? (
          <Paragraph>Пользователи не найдены</Paragraph>
        ) : (
          sortedUsers &&
          sortedUsers.map((user) => <UserCard key={user.id} user={user} />)
        )}
      </GroupeContainer>
    </Section>
  );
};

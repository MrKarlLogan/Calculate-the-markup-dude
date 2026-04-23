"use client";

import { GroupeContainer } from "@shared/ui/GroupeContainer";
import { Section } from "@shared/ui/Section";
import styles from "./UsersEditor.module.scss";
import { LoaderComponent } from "@/shared/ui/LoaderComponent";
import { Paragraph } from "@/shared/ui/Paragraph";
import { UserCard } from "@/shared/ui/UserCard";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks/redux";
import { getUserId } from "@/entities/user/model/userSlice";
import {
  getError,
  getLoading,
  getUsers,
} from "@/entities/user/model/usersSlice";
import { useEffect } from "react";
import { fetchUsersThunk } from "@/entities/user/api";

export const UsersEditor = ({ className }: { className?: string }) => {
  const id = useAppSelector(getUserId);
  const dispatch = useAppDispatch();

  const users = useAppSelector(getUsers);
  const loading = useAppSelector(getLoading);
  const error = useAppSelector(getError);

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

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

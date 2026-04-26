"use client";

import { Section } from "@shared/ui/Section";
import { LoaderComponent } from "@shared/ui/LoaderComponent";
import { Paragraph } from "@shared/ui/Paragraph";
import { UserCard } from "@shared/ui/UserCard";
import { useAppDispatch, useAppSelector } from "@shared/lib/hooks/redux";
import { getUser } from "@entities/user/model/userSlice";
import { getLoading, getUsers } from "@entities/user/model/usersSlice";
import { useEffect } from "react";
import { fetchUsersThunk } from "@entities/user/api";
import { MainContainer } from "@shared/ui/MainContainer/MainContainer";

export const UsersEditor = ({ className }: { className?: string }) => {
  const me = useAppSelector(getUser);
  const dispatch = useAppDispatch();

  const users = useAppSelector(getUsers);
  const loading = useAppSelector(getLoading);

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  if (loading)
    return (
      <Section className={className}>
        <MainContainer title="Управление пользователями">
          <LoaderComponent />
        </MainContainer>
      </Section>
    );

  const sortedUsers =
    users &&
    [...users].sort((a, b) => {
      if (a.id === me?.id) return -1;
      if (b.id === me?.id) return 1;

      if (a.role === "admin" && b.role !== "admin") return -1;
      if (a.role !== "admin" && b.role === "admin") return 1;

      return a.name.localeCompare(b.name);
    });

  return (
    <Section className={className}>
      <MainContainer title="Управление пользователями">
        {users && users.length === 0 ? (
          <Paragraph>Пользователи не найдены</Paragraph>
        ) : (
          sortedUsers &&
          sortedUsers.map((user) => <UserCard key={user.id} user={user} />)
        )}
      </MainContainer>
    </Section>
  );
};

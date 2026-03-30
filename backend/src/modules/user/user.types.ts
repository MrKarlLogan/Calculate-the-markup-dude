type TRoles = "admin" | "others";

export interface IUser {
  id: string;
  login: string;
  password: string;
  name: string;
  role: TRoles;
}

export type TRegisterBody = Pick<
  IUser,
  "login" | "password" | "name" | "role"
> & {
  registrationPassword: string;
};

export type TLoginUser = Pick<IUser, "login" | "password">;

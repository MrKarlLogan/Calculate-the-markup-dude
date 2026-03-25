type TRoles = "admin" | "others";

export interface IUser {
  id: string;
  login: string;
  password: string;
  name: string;
  role: TRoles;
}

export interface IAuthUser {
  id: string;
  role: TRoles;
}

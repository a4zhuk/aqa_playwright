import { IUser } from "types/salesPortal/user.type";

export function getUserData(data?: Partial<IUser>): IUser {
  return {
    email: "a.zhuk",
    password: "12345678",
    ...data,
  };
}

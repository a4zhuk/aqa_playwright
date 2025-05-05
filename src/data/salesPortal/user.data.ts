import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { IUser } from "types/salesPortal/user.type";

export function getUserData(data?: Partial<IUser>): IUser {
  return {
    email: USER_LOGIN,
    password: USER_PASSWORD,
    ...data,
  };
}

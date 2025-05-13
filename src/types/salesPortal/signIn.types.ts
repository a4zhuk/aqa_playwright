import { IResponseFields } from "./api.types";

export interface ICredentials {
  username: string;
  password: string;
}
export interface IUserFromResponse {
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
  createdOn: string;
  roles: string[];
}
export interface ISignInResponse extends IResponseFields {
  User: IUserFromResponse;
}

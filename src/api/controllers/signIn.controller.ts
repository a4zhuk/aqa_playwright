import { RequestApi } from "api/apiClients/request";
import { apiConfig } from "config/api-config";
import { IRequestOptions } from "types/salesPortal/api.types";
import { ICredentials, ISignInResponse } from "types/salesPortal/signIn.types";

export class SingInContorller {
  constructor(private request = new RequestApi()) {}
  async signIn(credentials: ICredentials) {
    const options: IRequestOptions = {
      url: apiConfig.ENDPOINTS.LOGIN,
      method: "post",
      data: credentials,
      headers: {
        "Content-Type": "application/json",
      },
    };
    return await this.request.send<ISignInResponse>(options);
  }
}

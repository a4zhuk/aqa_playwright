import { RequestApi } from "api/apiClients/request";
import { APIRequestContext } from "@playwright/test";
import { IRequestOptions } from "types/salesPortal/api.types";
import { apiConfig } from "config/api-config";
import { IProductResponse } from "types/salesPortal/product.type";

export class ProductsController {
  private request: RequestApi;
  constructor(context: APIRequestContext) {
    this.request = new RequestApi(context);
  }

  async getById(id: string, token: string) {
    const options: IRequestOptions = {
      url: apiConfig.ENDPOINTS.PRODUCTS_BY_ID(id),
      method: "get",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await this.request.send<IProductResponse>(options);
  }

  async delete(id: string, token: string) {
    const options: IRequestOptions = {
      url: apiConfig.ENDPOINTS.PRODUCTS_BY_ID(id),
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await this.request.send<null>(options);
  }
}

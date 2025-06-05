import { APIRequestContext, expect } from "@playwright/test";
import { CustomersController } from "api/controllers/customers.controller";
import { generateCustomerData } from "data/salesPortal/customers/generateCustomer.data";
import { STATUS_CODES } from "data/salesPortal/statusCodes";
import { ICustomer } from "types/salesPortal/customer.types";
import { validateResponse } from "utils/salesPortal/validations/responseValidation";

export class CustomersApiService {
  controller: CustomersController;
  constructor(request: APIRequestContext) {
    this.controller = new CustomersController(request);
  }

  async create(token: string, customData?: ICustomer) {
    const body = generateCustomerData(customData);
    const response = await this.controller.create(body, token);
    validateResponse(response, STATUS_CODES.CREATED, true, null);
    return response.body.Customer;
  }
}
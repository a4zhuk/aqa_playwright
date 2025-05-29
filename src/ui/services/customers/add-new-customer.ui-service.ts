import { expect } from "@playwright/test";
import { apiConfig } from "config/api-config";
import { generateCustomerData } from "data/salesPortal/customers/generateCustomer.data";
import { STATUS_CODES } from "data/salesPortal/statusCodes";
import { ICustomer, ICustomerResponse } from "types/salesPortal/customer.types";
import { AddNewCustomerPage } from "ui/pages/customers/add-new-customer.page";
import { CustomersPage } from "ui/pages/customers/customers.page";
import _ from "lodash";
import { PageHolder } from "types/salesPortal/pageHolder.holder";

export class AddNewCustomerUiService extends PageHolder{
  private addNewCustomerPage: AddNewCustomerPage  = new AddNewCustomerPage(this.page);
  private customersPage: CustomersPage = new CustomersPage(this.page)

  async create(customData?: ICustomer) {
    const data = generateCustomerData(customData);
    await this.addNewCustomerPage.fillInputs(data);
    const response = await this.addNewCustomerPage.interceptResponse<
      ICustomerResponse,
      any
    >(
      apiConfig.ENDPOINTS.CUSTOMERS,
      this.addNewCustomerPage.clickSaveNewCustomer.bind(this.addNewCustomerPage)
    );
    expect(response.status).toBe(STATUS_CODES.CREATED);
    expect(_.omit(response.body.Customer, "_id", "createdOn")).toEqual({
      ...data,
    });
    await this.customersPage.waitForOpened();
    return response.body.Customer;
  }
}

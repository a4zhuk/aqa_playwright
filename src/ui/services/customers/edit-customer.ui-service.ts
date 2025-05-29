import { expect } from "@playwright/test";
import { apiConfig } from "config/api-config";
import { generateCustomerData } from "data/salesPortal/customers/generateCustomer.data";
import { STATUS_CODES } from "data/salesPortal/statusCodes";
import { ICustomer, ICustomerResponse } from "types/salesPortal/customer.types";
import { CustomersPage } from "ui/pages/customers/customers.page";
import _ from "lodash";
import { EditCustomerPage } from "ui/pages/customers/edit-customer.page";
import { PageHolder } from "types/salesPortal/pageHolder.holder";

export class EditCustomerUiService extends PageHolder {
  private editCustomerPage: EditCustomerPage = new EditCustomerPage(this.page);
  private customersPage: CustomersPage = new CustomersPage(this.page);

  async edit(customData?: ICustomer) {
    const data = generateCustomerData(customData);
    await this.editCustomerPage.fillInputs(data);
    const response = await this.editCustomerPage.interceptResponse<
      ICustomerResponse,
      any
    >(
      apiConfig.ENDPOINTS.CUSTOMERS,
      this.editCustomerPage.clickSaveChanges.bind(this.editCustomerPage)
    );
    expect(response.status).toBe(STATUS_CODES.OK);
    expect(_.omit(response.body.Customer, "_id", "createdOn")).toEqual({
      ...data,
    });
    await this.customersPage.waitForOpened();
    return response.body.Customer;
  }
}

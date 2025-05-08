import { de } from "@faker-js/faker/.";
import test, { expect } from "@playwright/test";
import { apiConfig } from "config/api-config";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { generateCustomerData } from "data/salesPortal/customers/generateCustomer.data";
import { customersSchema } from "data/salesPortal/schemas/customers/customers.schema";
import { STATUS_CODES } from "data/salesPortal/statusCodes";
import _ from "lodash";
import { ICustomer } from "types/salesPortal/customer.types";
import { validateSchema } from "utils/salesPortal/validations/schemaValidation";

test.describe("[API], [Smoke], [Get all customers]", () => {
  test("Check receiving all customers", async ({ request }) => {
    const loginResponse = await request.post(
      apiConfig.BASE_URL + apiConfig.ENDPOINTS.LOGIN,
      {
        data: { username: USER_LOGIN, password: USER_PASSWORD },
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const loginHeaders = loginResponse.headers();
    const token = loginHeaders["authorization"];
    expect.soft(loginResponse.status()).toBe(STATUS_CODES.OK);

    const customerData: ICustomer = generateCustomerData();
    const createCustomerResponse = await request.post(
      apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMERS,
      {
        data: customerData,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect.soft(createCustomerResponse.status()).toBe(STATUS_CODES.CREATED);
    
    const allCustomersResponse = await request.get(
      apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMERS,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect.soft(allCustomersResponse.status()).toBe(STATUS_CODES.OK);
    const createdCustomerResponseBody = await createCustomerResponse.json();
    const allCustomersResponsBody = await allCustomersResponse.json();
    validateSchema(customersSchema, allCustomersResponsBody);
    expect.soft(allCustomersResponsBody.ErrorMessage).toBe(null);
    expect.soft(allCustomersResponsBody.IsSuccess).toBe(true);
    expect
      .soft(
        _.omit(allCustomersResponsBody.Customers.find(
          (customer: ICustomer) => customer.email === customerData.email
        ), ['_id', 'createdOn'])
      )
      .toEqual(customerData);

    const deleteCustomerResponse = await request.delete(
      apiConfig.BASE_URL +
        apiConfig.ENDPOINTS.CUSTOMERS +
        `/${createdCustomerResponseBody.Customer["_id"]}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect.soft(deleteCustomerResponse.status()).toBe(STATUS_CODES.DELETED);
  });
});

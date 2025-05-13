import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { generateCustomerData } from "data/salesPortal/customers/generateCustomer.data";
import { createCustomerNegativeData } from "data/salesPortal/customers/negative.data";
import { STATUS_CODES } from "data/salesPortal/statusCodes";
import { test, expect } from "fixtures/controllets.fixture";
import { ICustomer } from "types/salesPortal/customer.types";
import { ICredentials } from "types/salesPortal/signIn.types";
import { validateResponse } from "utils/salesPortal/validations/responseValidation";

test.describe("[API] [Negative] [Create]", () => {
  createCustomerNegativeData.forEach((testData) => {
    test(
      testData.testName,
      async ({ singInController, customersController }) => {
        const credentials: ICredentials = {
          username: USER_LOGIN,
          password: USER_PASSWORD,
        };
        const signInResponse = await singInController.signIn(credentials);
        const token = signInResponse.headers["authorization"];

        const customerResponse = await customersController.create(
          testData.data as ICustomer,
          token
        );
        expect(customerResponse.body.IsSuccess).toBeFalsy();
        expect(customerResponse.body.ErrorMessage).toMatch(
          testData.errorMessage!
        );
        validateResponse(
          customerResponse,
          customerResponse.status,
          customerResponse.body.IsSuccess,
          customerResponse.body.ErrorMessage
        );
        expect(customerResponse.status).toBe(testData.statusCode);
      }
    );
  });
  test("Check customer creation using existing email", async ({
    singInController,
    customersController,
  }) => {
    const credentials: ICredentials = {
      username: USER_LOGIN,
      password: USER_PASSWORD,
    };
    const signInResponse = await singInController.signIn(credentials);
    const token = signInResponse.headers["authorization"];
    const firstCustomer = generateCustomerData();
    const secondCustomer = generateCustomerData({ email: firstCustomer.email });

    const firstCustomerResponse = await customersController.create(
      firstCustomer,
      token
    );
    expect.soft(firstCustomerResponse.status).toBe(STATUS_CODES.CREATED);

    const secondCustomerResponse = await customersController.create(
      secondCustomer,
      token
    );
    expect.soft(secondCustomerResponse.status).toBe(STATUS_CODES.CONFLICT);
    expect.soft(secondCustomerResponse.body.IsSuccess).toBeFalsy();
    expect
      .soft(secondCustomerResponse.body.ErrorMessage)
      .toMatch(
        `Customer with email '${firstCustomerResponse.body.Customer.email}' already exists`
      );
    validateResponse(
      secondCustomerResponse,
      secondCustomerResponse.status,
      secondCustomerResponse.body.IsSuccess,
      secondCustomerResponse.body.ErrorMessage
    );
    if (!firstCustomerResponse.body.Customer._id) {
      return;
    } else {
      const response = await customersController.delete(
        firstCustomerResponse.body.Customer._id,
        token
      );
      expect.soft(response.status).toBe(STATUS_CODES.DELETED);
    }
  });
});

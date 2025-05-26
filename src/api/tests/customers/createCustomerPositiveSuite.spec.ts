import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { createCustomerPositiveData } from "data/salesPortal/customers/positive.data";
import { customerSchema } from "data/salesPortal/schemas/customers/customer.schema";
import { STATUS_CODES } from "data/salesPortal/statusCodes";
import { test, expect } from "fixtures/controllers.fixture";
import { ICustomer } from "types/salesPortal/customer.types";
import { ICredentials } from "types/salesPortal/signIn.types";
import { validateResponse } from "utils/salesPortal/validations/responseValidation";
import { validateSchema } from "utils/salesPortal/validations/schemaValidation";

test.describe("[API] [Customers] [Create]", () => {
  let signInResponse;
  let token = "";
  test.beforeEach(async ({ singInController }) => {
    const credentials: ICredentials = {
      username: USER_LOGIN,
      password: USER_PASSWORD,
    };
    signInResponse = await singInController.signIn(credentials);
    token = signInResponse.headers["authorization"];
    expect(signInResponse.status).toBe(STATUS_CODES.OK);
  });
  createCustomerPositiveData.forEach((testData) => {
    test(testData.testName, async ({ customersController }) => {
      // Create customer step
      const customerResponse = await customersController.create(
        testData.data as ICustomer,
        token
      );

      validateSchema(customerSchema, customerResponse.body);
      validateResponse(customerResponse, STATUS_CODES.CREATED, true, null);
      expect
        .soft(customerResponse.body.Customer)
        .toMatchObject({ ...testData.data });

      if (!customerResponse.body.Customer._id) {
        return;
      } else {
        const response = await customersController.delete(
          customerResponse.body.Customer._id,
          token
        );
        expect.soft(response.status).toBe(STATUS_CODES.DELETED);
      }
    });
  });
});

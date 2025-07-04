import { test, expect } from "fixtures/controllers.fixture";
import { apiConfig } from "config/api-config";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { generateCustomerData } from "data/salesPortal/customers/generateCustomer.data";
import { customerSchema } from "data/salesPortal/schemas/customers/customer.schema";
import { STATUS_CODES } from "data/salesPortal/statusCodes";
import { validateSchema } from "utils/salesPortal/validations/schemaValidation";
import { ICredentials } from "types/salesPortal/signIn.types";

test.describe("[API] [Customers] [Get By Id]", () => {
  test("Should get created customer by id", async ({
    request,
    singInController,
  }) => {
    const credential: ICredentials = {
      username: USER_LOGIN,
      password: USER_PASSWORD,
    };
    const loginResponse = await singInController.signIn(credential);
    const token = loginResponse.headers["authorization"];
    expect.soft(loginResponse.status).toBe(STATUS_CODES.OK);

    const customerData = generateCustomerData();
    const customerResponse = await request.post(
      apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMERS,
      {
        data: customerData,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const customerBody = await customerResponse.json();
    expect.soft(customerResponse.status()).toBe(STATUS_CODES.CREATED);

    const getResponse = await request.get(
      apiConfig.BASE_URL +
        apiConfig.ENDPOINTS.CUSTOMER_BY_ID(customerBody.Customer._id),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      }
    );

    const body = await getResponse.json();
    validateSchema(customerSchema, body);
    expect.soft(getResponse.status()).toBe(STATUS_CODES.OK);
    expect.soft(body.Customer).toMatchObject({ ...customerBody.Customer });
    expect.soft(body.ErrorMessage).toBe(null);
    expect.soft(body.IsSuccess).toBe(true);

    const response = await request.delete(
      apiConfig.BASE_URL +
        apiConfig.ENDPOINTS.CUSTOMER_BY_ID(customerBody.Customer._id),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect.soft(response.status()).toBe(STATUS_CODES.DELETED);
  });
});

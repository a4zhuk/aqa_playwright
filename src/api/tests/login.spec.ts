import test, { expect } from "@playwright/test";
import { apiConfig } from "config/api-config";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { logInSchema } from "data/salesPortal/schemas/logIn/logIn.schema";
import { STATUS_CODES } from "data/salesPortal/statusCodes";
import { validateSchema } from "utils/salesPortal/validations/schemaValidation";

test.describe("[API] [SMOKE] [LOGIN]", () => {
  test("Check login with valid dat", async ({ request }) => {
    const loginResponse = await request.post(
      apiConfig.BASE_URL + apiConfig.ENDPOINTS.LOGIN,
      {
        data: { username: USER_LOGIN, password: USER_PASSWORD },
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const responseBody = await loginResponse.json();
    const responseHeaders = loginResponse.headers();
    const authToken = responseHeaders["authorization"];
    expect.soft(authToken).toBeTruthy();
    expect.soft(loginResponse.status()).toBe(STATUS_CODES.OK);
    validateSchema(logInSchema, responseBody);
    expect.soft(responseBody.ErrorMessage).toBe(null);
    expect.soft(responseBody.IsSuccess).toBe(true);
  });
});

import { test, expect } from "fixtures/controllets.fixture";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { logInSchema } from "data/salesPortal/schemas/logIn/logIn.schema";
import { STATUS_CODES } from "data/salesPortal/statusCodes";
import { validateSchema } from "utils/salesPortal/validations/schemaValidation";
import { ICredentials } from "types/salesPortal/signIn.types";
import { validateResponse } from "utils/salesPortal/validations/responseValidation";

test.describe("[API] [SMOKE] [LOGIN]", () => {
  test("Check login with valid data and controller", async ({
    singInController,
  }) => {
    const credential: ICredentials = {
      username: USER_LOGIN,
      password: USER_PASSWORD,
    };
    const loginResponse = await singInController.signIn(credential);
    const responseBody = loginResponse.body;
    const token = loginResponse.headers["authorization"];
    expect.soft(token).toBeTruthy();
    expect.soft(loginResponse.status).toBe(STATUS_CODES.OK);
    validateSchema(logInSchema, responseBody);
    validateResponse(
      loginResponse,
      loginResponse.status,
      loginResponse.body.IsSuccess,
      loginResponse.body.ErrorMessage
    );
    expect.soft(responseBody.ErrorMessage).toBe(null);
    expect.soft(responseBody.IsSuccess).toBe(true);
  });
});

import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { test as base } from "fixtures/controllets.fixture";

interface IBusinessSteps {
  loginAsLocalUser(): Promise<void>;
}

export const test = base.extend<IBusinessSteps>({
  loginAsLocalUser: async ({ homePage, loginPage }, use) => {
    await use(async () => {
      await loginPage.openPortal();
      await loginPage.fillCredentials({ email: USER_LOGIN, password: USER_PASSWORD });
      await loginPage.clickLoginButton();
      await homePage.waitForOpened();
    });
  },
});

export { expect } from "@playwright/test";
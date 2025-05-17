import { test as base } from "fixtures/pages.fixture";
import { CustomersController } from "api/controllers/customers.controller";
import { SingInContorller } from "api/controllers/signIn.controller";

interface ISalesPortalControllers {
  customersController: CustomersController;
  singInController: SingInContorller;
}

export const test = base.extend<ISalesPortalControllers>({
  customersController: async ({}, use) => {
    await use(new CustomersController());
  },
  singInController: async ({}, user) => {
    await user(new SingInContorller());
  },
});
export { expect } from "@playwright/test";

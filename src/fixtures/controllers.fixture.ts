import { test as base } from "fixtures/pages.fixture";
import { CustomersController } from "api/controllers/customers.controller";
import { SingInContorller } from "api/controllers/signIn.controller";
import { ProductsController } from "api/controllers/products.controller";

interface ISalesPortalControllers {
  customersController: CustomersController;
  singInController: SingInContorller;
  productsController: ProductsController;
}

export const test = base.extend<ISalesPortalControllers>({
  customersController: async ({ request }, use) => {
    await use(new CustomersController(request));
  },
  singInController: async ({ request }, use) => {
    await use(new SingInContorller());
  },
  productsController: async ({ request }, use) => {
    await use(new ProductsController(request));
  },
});
export { expect } from "@playwright/test";

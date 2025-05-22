import { test as base } from "fixtures/mock.fixture";
import { AddNewCustomerPage } from "ui/pages/customers/add-new-customer.page";
import { CustomerDetailsPage } from "ui/pages/customers/customer-details.page";
import { CustomersPage } from "ui/pages/customers/customers.page";
import { EditCustomerPage } from "ui/pages/customers/edit-customer.page";
import { HomePage } from "ui/pages/home.page";
import { LoginPage } from "ui/pages/login.page";
import { SideMenuComponent } from "ui/pages/side.menu";

interface ISalesPortalPages {
  homePage: HomePage;
  customersPage: CustomersPage;
  addNewCustomerPage: AddNewCustomerPage;
  loginPage: LoginPage;
  editCustomerPage: EditCustomerPage;
  sideMenu: SideMenuComponent;
  customerDetailsPage: CustomerDetailsPage;
}
export const test = base.extend<ISalesPortalPages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  customersPage: async ({ page }, use) => {
    await use(new CustomersPage(page));
  },
  addNewCustomerPage: async ({ page }, use) => {
    await use(new AddNewCustomerPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  editCustomerPage: async ({ page }, use) => {
    await use(new EditCustomerPage(page));
  },
  sideMenu: async ({ page }, use) => {
    await use(new SideMenuComponent(page));
  },
  customerDetailsPage: async ({ page }, use) => {
    await use(new CustomerDetailsPage(page));
  },
});
export { expect } from "@playwright/test";

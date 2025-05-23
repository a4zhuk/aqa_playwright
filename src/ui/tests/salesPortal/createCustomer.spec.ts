import { test, expect } from "@playwright/test";
import { LoginPage } from "ui/pages/login.page";
import { generateCustomerData } from "data/salesPortal/customers/generateCustomer.data";
import { NOTIFICATIONS } from "data/salesPortal/notification.data";
import { AddNewCustomerPage } from "ui/pages/customers/add-new-customer.page";
import { CustomersPage } from "ui/pages/customers/customers.page";
import { HomePage } from "ui/pages/home.page";
import { getUserData } from "data/salesPortal/user.data";
import { SALES_PORTAL_URL } from "config/environment";

test.describe("[UI] [Sales Portal] [Customers]", () => {
  test("Create customer", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const customerPage = new CustomersPage(page);
    const addNewCustomerPage = new AddNewCustomerPage(page);

    await page.goto(SALES_PORTAL_URL);
    await loginPage.waitForOpenWithoutSpiner();

    const userData = getUserData();
    await loginPage.fillCredentials(userData);
    await loginPage.checkRememberMe(false);
    await loginPage.clickLoginButton();

    await homePage.waitForOpened();
    await homePage.clickModuleButton("Customers");

    await customerPage.waitForOpened();
    await customerPage.clickAddNewCustomer();

    await addNewCustomerPage.waitForOpened();
    const customer = generateCustomerData();
    await addNewCustomerPage.fillInputs(customer);
    await addNewCustomerPage.clickSaveNewCustomer();
    await addNewCustomerPage.waitForNotification(
      NOTIFICATIONS.CUSTOMER_CREATED
    );
    await expect(page.locator("//*/tbody/tr[1]/td[1]")).toHaveText(
      customer.email
    );
    await expect(page.locator("//*/tbody/tr[1]/td[2]")).toHaveText(
      customer.name
    );
    await expect(page.locator("//*/tbody/tr[1]/td[3]")).toHaveText(
      customer.country
    );
  });
});

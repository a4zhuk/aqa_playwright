import { getUserData } from "data/salesPortal/user.data";
import { test, expect} from "../../../fixtures/pages.fixture";
import { SALES_PORTAL_URL } from "config/environment";
import { generateCustomerData } from "data/salesPortal/customers/generateCustomer.data";
import _ from "lodash";
import { NOTIFICATIONS } from "data/salesPortal/notification.data";

test.describe("[UI] [Sales Portal] [Customers]", async () => {
  test("Check user deletion", async ({
    page,
    homePage,
    customersPage,
    addNewCustomerPage,
    loginPage,
  }) => {
    await page.goto(SALES_PORTAL_URL);
    await loginPage.waitForOpenWithoutSpiner();
    const loginData = getUserData();
    await loginPage.fillCredentials(loginData);
    await loginPage.clickLoginButton();
    await homePage.waitForOpened();
    await homePage.clickModuleButton("Customers");
    await customersPage.waitForOpened();
    await customersPage.clickAddNewCustomer();
    await addNewCustomerPage.waitForOpened();
    const customerData = generateCustomerData();
    await addNewCustomerPage.fillInputs(customerData);
    await addNewCustomerPage.clickSaveNewCustomer();
    await customersPage.waitForOpened();
    const actualCustomersTable = await customersPage.getTabeData();
    expect(
      actualCustomersTable.some(
        (customer) => customer.email === customerData.email
      )
    ).toBe(true);
    await customersPage.clickDeleteCustomer(customerData.email);
    await customersPage.deleteModal.waitForOpened();
    await customersPage.deleteModal.clickDelete();
    await customersPage.deleteModal.waitForClosed();
    await customersPage.waitForOpened();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_DELETED)
    const actualCustomersTableAfterDeletion = await customersPage.getTabeData();
    expect(
      actualCustomersTableAfterDeletion.some(
        (customer) => customer.email === customerData.email
      )
    ).toBe(false);
  });
});

import { generateCustomerData } from "data/salesPortal/customers/generateCustomer.data";
import { EMPTY_TABLE_ROW_TEXT, NOTIFICATIONS } from "data/salesPortal/notification.data";
import { expect, test } from "fixtures/businessSteps.fixture";

test.describe("[UI] [Sales Portal] [Customers]", async () => {
  test("Should delete customer on Edit Customer page", async ({
    loginAsLocalUser,
    homePage,
    customersPage,
    addNewCustomerPage,
    editCustomerPage,
  }) => {
    await loginAsLocalUser();
    await homePage.waitForOpened();
    await homePage.clickModuleButton("Customers");
    await customersPage.waitForOpened();
    await customersPage.clickAddNewCustomer();
    await addNewCustomerPage.waitForOpened();
    const data = generateCustomerData();
    await addNewCustomerPage.fillInputs(data);
    await addNewCustomerPage.clickSaveNewCustomer();
    await customersPage.waitForOpened();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);

    await customersPage.clickTableAction(data.email, "edit");
    await editCustomerPage.waitForOpened();
    await editCustomerPage.clickDeleteCustomer();
    await editCustomerPage.deleteCustomerModal.waitForOpened();
    await editCustomerPage.deleteCustomerModal.clickDelete();
    await editCustomerPage.deleteCustomerModal.waitForClosed();
    await editCustomerPage.waitForOpened();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_DELETED);
    await expect(customersPage.tableRowByEmail(data.email)).not.toBeVisible();
    await customersPage.search(data.email);
    await expect(customersPage.emptyTableRow).toHaveText(EMPTY_TABLE_ROW_TEXT);
  });

  test("Should delete customer on Customers page", async ({
    loginAsLocalUser,
    homePage,
    customersPage,
    addNewCustomerPage,
    editCustomerPage,
  }) => {
    await loginAsLocalUser();
    await homePage.waitForOpened();
    await homePage.clickModuleButton("Customers");
    await customersPage.waitForOpened();
    await customersPage.clickAddNewCustomer();
    await addNewCustomerPage.waitForOpened();
    const data = generateCustomerData();
    await addNewCustomerPage.fillInputs(data);
    await addNewCustomerPage.clickSaveNewCustomer();
    await customersPage.waitForOpened();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);

    await customersPage.clickTableAction(data.email, "delete");
    await customersPage.deleteModal.waitForOpened();
    await customersPage.deleteModal.clickDelete();
    await customersPage.deleteModal.waitForClosed();
    await customersPage.waitForOpened();
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_DELETED);
    await expect(customersPage.tableRowByEmail(data.email)).not.toBeVisible();
    await customersPage.search(data.email);
    await expect(customersPage.emptyTableRow).toHaveText(EMPTY_TABLE_ROW_TEXT);
  });
});
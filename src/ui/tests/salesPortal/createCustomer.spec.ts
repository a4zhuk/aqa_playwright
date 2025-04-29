import {test, expect} from "@playwright/test"
import { LoginPage } from "ui/pages/login.page"
import { COUNTRIES } from "data/salesPortal/customers/countries.data";
import { generateCustomerData } from "data/salesPortal/customers/generateCustomer.data";
import { NOTIFICATIONS } from "data/salesPortal/notification.data";
import { AddNewCustomerPage } from "ui/pages/customers/add-new-customer.page";
import { CustomersPage } from "ui/pages/customers/customers.page";
import { HomePage } from "ui/pages/home.page";
import { setUser } from "data/salesPortal/user.data";

test.describe("[UI] [Sales Portal] [Customers]", () =>{
    test('Create customer', async ({page}) => {
        const loginPage = new LoginPage(page)
        const homePage = new HomePage(page)
        const customerPage = new CustomersPage(page)
        const addNewCustomerPage = new AddNewCustomerPage (page)

        await page.goto("https://anatoly-karpovich.github.io/aqa-course-project/#")
        await loginPage.waitForOpenWithoutSpiner()

        const userData = setUser()
        await loginPage.fillCredentials(userData)
        await loginPage.clickLoginButton()

        await homePage.waitForOpened()
        await homePage.clickModuleButton("Customers")

        await customerPage.waitForOpened()
        await customerPage.clickAddNewCustomer()
        
        await addNewCustomerPage.waitForOpened();
        const customer = generateCustomerData();
        await addNewCustomerPage.fillInputs(customer)
        await addNewCustomerPage.clickSaveNewCustomer()
        await addNewCustomerPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED)
        await expect(page.locator("//*/tbody/tr[1]/td[1]")).toHaveText(customer.email)
    })
})
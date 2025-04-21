import test, { expect } from "@playwright/test";
test.describe("[UI] [Smoke] Register", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://anatoly-karpovich.github.io/demo-login-form/");
        await page.locator("#registerOnLogin").click();
    })
    test("Check the oppening of the registration form", async ({ page }) => {
       const registrationForm = page.locator("#registerForm")
       await expect(registrationForm).toContainText("Registration");
    });
    
    test("Check registration page content", async ({ page }) => {
        await expect(page.locator("#registerForm")).toContainText("Registration");
        await expect(page.locator("#userNameOnRegister")).toBeVisible();
        await expect(page.locator("#passwordOnRegister")).toBeVisible();
        await expect(page.locator("#register")).toBeVisible();
        await expect(page.locator('#backOnRegister')).toBeVisible();
    });

    test("Check registration with valid data", async ({ page }) => {
        let username = 'testusername';
        let password = 'SafePassword1234'
        const registerNotification = page.locator('#errorMessageOnRegister');
        await page.locator("#userNameOnRegister").fill(username);
        await page.locator("#passwordOnRegister").fill(password);
        await page.locator("#register").click();
        await expect(registerNotification).toContainText("Successfully registered! Please, click Back to return on login page");
    })

    test("Check that back button opens login form", async ({ page }) =>{
        await page.locator("#backOnRegister").click();
        await expect(page.locator("#loginForm")).toContainText("Login")
    })
})
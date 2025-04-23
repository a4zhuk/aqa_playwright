/*
Разработать тест со следующими шагами:
 - Открыть url https://anatoly-karpovich.github.io/aqa-course-project/#
 - Войти в приложения используя учетные данные test@gmail.com / 12345678 при этом:
 - дождаться исчезновения спиннеров
 - проверить действительно ли пользователь с логином Anatoly вошел в систему
 - Проверить скриншотом боковое навигационное меню с выбранной страницей Home
 */
import test, { expect } from "@playwright/test"

test.describe("[UI] Login", () => {
    test("Check login", async ({page}) => {
        let email = "test@gmail.com"
        let password = "12345678"
        await page.goto("https://anatoly-karpovich.github.io/aqa-course-project/#");
        await page.getByPlaceholder("Enter a valid email address").fill(email);
        await page.getByPlaceholder("Enter password").fill(password);
        await page.getByRole("button", {name: "Login"}).click();
        await expect(page.getByRole('link', { name: 'Anatoly' })).toContainText("Anatoly")
        await expect(page.locator(".spinner-border")).toHaveCount(0, {timeout: 10000})
    })
})
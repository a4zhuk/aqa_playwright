import test, { expect } from "@playwright/test";

  test.describe("[UI] [Heroku] Dynamic Controls", () => {
    test("Check Dynamic Controls page", async ({page}) => {
        await page.goto("https://the-internet.herokuapp.com/");
        await page.getByRole("link", {name: 'Dynamic Controls'}).click();
        await expect(page.getByRole("button", {name : "Remove"})).toBeVisible({timeout:10000});
        await expect(page.getByRole("heading", {name : "Dynamic Controls"})).toHaveText('Dynamic Controls');
        await page.locator("//div/form/div/input[@type='checkbox']").check();
        await page.getByRole("button", {name : "Remove"}).click();
        await expect(page.locator("//div/form/div/input[@type='checkbox']")).toBeHidden()
        await expect(page.getByRole("button", {name: 'Add'})).toBeVisible();
        await expect(page.locator("//form/p[@id='message']")).toHaveText("It's gone!")
        await page.getByRole("button", {name: 'Add'}).click()
        await expect(page.locator("//div/form/div/input[@type='checkbox']")).toBeVisible({timeout:10000})
        await expect(page.locator("//*[@id='message']")).toHaveText("It's back!")
    })
  })
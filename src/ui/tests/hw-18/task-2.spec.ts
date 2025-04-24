import test, { expect } from "@playwright/test";
test.describe("[UI] [Smoke] Register", () => {
    test("Check Registration with valid data", async ({ page }) =>{
        let username = 'testname';
        let lastname = 'lastnametest';
        let useraddress ='test address';
        let email = "example@test.com"
        let phone ='1234567890'
        let gender = 'male';
        let language = 'Russian';
        let password = 'SafePassword123'
        await page.goto("https://anatoly-karpovich.github.io/demo-registration-form/");
        await page.locator('#firstName').fill(username);
        await page.locator("#lastName").fill(lastname);
        await page.locator("#address").fill(useraddress);
        await page.locator("#email").fill(email)
        await page.locator("#phone").fill(phone);
        await page.locator("#country").selectOption("Canada")
        await page.locator(`//div/input[@type='radio'][@value='${gender}']`).check()
        await page.locator("//div/input[@type='checkbox'][@value='Movies']").check()
        await page.locator("#language").fill(language);
        await page.locator("//option[@value='JavaScript']").click()
        await page.locator("#year").selectOption('1996')
        await page.locator("#month").selectOption('May')
        await page.locator("#day").selectOption('11')
        await page.locator("#password").fill(password)
        await page.locator("#password-confirm").fill(password)
        await page.locator("//button[@type='submit']").click()
        await expect(page.locator("//h2[@class='text-center']")).toHaveText('Registration Details')
        await expect(page.locator("#fullName")).toHaveText(`${username} ${lastname}`)
        await expect(page.locator("#address")).toHaveText(useraddress)
        await expect(page.locator("#email")).toHaveText(email)
        await expect(page.locator("#phone")).toHaveText(phone)
        await expect(page.locator("#country")).toHaveText("Canada")
        await expect(page.locator("#gender")).toHaveText(gender)
        await expect(page.locator("#language")).toHaveText(language)
        await expect(page.locator("#skills")).toHaveText(`JavaScript`)
        await expect(page.locator("#hobbies")).toHaveText(`Movies`)
        await expect(page.locator("#dateOfBirth")).toHaveText(`11 May 1996`)
        await  expect(page.locator("#password")).toHaveText("*".repeat(password.length))
    })
})
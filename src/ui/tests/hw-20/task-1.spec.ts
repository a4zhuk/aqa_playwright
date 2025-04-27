import { test, expect} from "@playwright/test";
import {registrationInvalodData} from '../../../data/demo_login_form/negative_data'


test.describe("[UI] [Login Form] [Negative] Registration", () => {
  registrationInvalodData.forEach(({testName, username, password, message}) => {
    test(testName, async ({page}) => {
      await page.goto("https://anatoly-karpovich.github.io/demo-login-form/"),
      await page.locator("#registerOnLogin").click(),
      await page.evaluate(() => {
        document.getElementById("userNameOnRegister")?.setAttribute("maxlength", "41");
        document.getElementById("passwordOnRegister")?.setAttribute("maxlength", "21")
      })
      await page.locator("#userNameOnRegister").fill(username);
      await page.locator("#passwordOnRegister").fill(password);
      await page.locator("#register").click();
      await expect(page.locator('#errorMessageOnRegister')).toHaveText(message);
    })
  })
})
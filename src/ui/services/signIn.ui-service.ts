import { Page } from "@playwright/test";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { HomePage } from "ui/pages/home.page";
import { LoginPage } from "ui/pages/login.page";

export class SignInUIService {
  private logInPage: LoginPage;
  private homePage: HomePage;
  constructor(private page: Page) {
    this.logInPage = new LoginPage(page);
    this.homePage = new HomePage(page);
  }

  async signInAsLocalUser() {
    await this.logInPage.openPortal();
    await this.logInPage.fillCredentials({ email: USER_LOGIN, password: USER_PASSWORD });
    await this.logInPage.clickLoginButton();
    await this.homePage.waitForOpened();
    const token = (await this.page.context().cookies()).find((c) => c.name === "Authorization")!.value;
    return token;
  }
}
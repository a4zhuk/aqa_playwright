import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { PageHolder } from "ui/pages/pageHolder.page";
import { HomePage } from "ui/pages/home.page";
import { LoginPage } from "ui/pages/login.page";

export class SignInUIService extends PageHolder {
  private logInPage: LoginPage = new LoginPage(this.page);
  private homePage: HomePage = new HomePage(this.page);

  async signInAsLocalUser() {
    await this.logInPage.openPortal();
    await this.logInPage.fillCredentials({
      email: USER_LOGIN,
      password: USER_PASSWORD,
    });
    await this.logInPage.clickLoginButton();
    await this.homePage.waitForOpened();
    const token = (await this.page.context().cookies()).find(
      (c) => c.name === "Authorization"
    )!.value;
    return token;
  }
}

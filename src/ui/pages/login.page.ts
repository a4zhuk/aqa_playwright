import { IUser } from "types/salesPortal/user.type";
import { SalesPortalPage } from "./salesPortal.page";

export class LoginPage extends SalesPortalPage {
  readonly loginButton = this.page.getByRole("button", { name: "Login" });
  readonly emailInput = this.page.locator("#emailinput");
  readonly passwordInput = this.page.locator("#passwordinput");
  readonly rememberMeCheckBox = this.page.locator("#remembermecheckbox");

  readonly uniqueElement = this.loginButton;

  async fillCredentials(userData: IUser) {
    await this.emailInput.fill(userData.email);
    await this.passwordInput.fill(userData.password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }
  async checkRememberMe(souldBeChecked: boolean = true) {
    souldBeChecked
      ? await this.rememberMeCheckBox.check()
      : await this.rememberMeCheckBox.uncheck();
  }
}

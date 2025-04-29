import { IUser } from "types/salesPortal/user.type";
import { SalesPortalPage } from "./salesPortal.page";

export class LoginPage extends SalesPortalPage {
  loginButton = this.page.getByRole("button", { name: "Login" });
  emailInput = this.page.locator("#emailinput");
  passwordInput = this.page.locator("#passwordinput");
  rememberMeCheckBox = this.page.locator("#remembermecheckbox");

  uniqueElement = this.loginButton;

 async fillCredentials(userData: IUser) {
    await this.emailInput.fill(userData.email)
    await this.passwordInput.fill(userData.password);
  }

 async clickLoginButton() {
    await this.loginButton.click();
  }
}

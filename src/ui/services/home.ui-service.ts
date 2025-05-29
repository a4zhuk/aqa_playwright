import { ModuleName, Pages } from "types/salesPortal/home.types";
import { PageHolder } from "types/salesPortal/pageHolder.holder";
import { CustomersPage } from "ui/pages/customers/customers.page";
import { HomePage } from "ui/pages/home.page";
import { ProductsPage } from "ui/pages/products/products.page";

export class HomeUIService extends PageHolder {
  private homePage: HomePage = new HomePage(this.page);
  private customersPage: CustomersPage = new CustomersPage(this.page);
  private productsPage: ProductsPage = new ProductsPage(this.page);

  async openModule(moduleName: ModuleName) {
    await this.homePage.clickModuleButton(moduleName);
    const page = (moduleName.toLowerCase() + "Page") as Pages;
    await this[`${page}`].waitForOpened();
  }
}

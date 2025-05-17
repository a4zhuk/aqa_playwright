import { Locator, Page } from "@playwright/test";
import { ModuleName } from "types/salesPortal/home.types";
import { SalesPortalPage } from "ui/pages/salesPortal.page";

export class HomePage extends SalesPortalPage {
  readonly title = this.page.locator(".welcome-text");
  readonly customersButton = this.page.getByRole("link", { name: "Customer" });
  readonly productsButton = this.page.getByRole("link", { name: "Products" });
  readonly ordersButton = this.page.getByRole("link", { name: "Orders" });
  readonly numberOfOrdersThisYear = this.page.locator(
    "//*[@id='total-orders-container']//p"
  );
  readonly numberOfTotalCustomers = this.page.locator(
    "//*[@id='total-customers-container']//p"
  );
  readonly numberOfCanceledOrders = this.page.locator(
    "//*[@id='canceled-orders-container']//p"
  );
  readonly sumOfTotalRevenue = this.page.locator(
    "//*[@id='total-revenue-container']//p"
  );
  readonly sumOfAvgOrdersValue = this.page.locator(
    "//*[@id='avg-orders-value-container']//p"
  );

  readonly uniqueElement = this.title;

  async clickModuleButton(moduleName: ModuleName) {
    const moduleButtons: Record<ModuleName, Locator> = {
      Customers: this.customersButton,
      Products: this.productsButton,
      Orders: this.ordersButton,
    };

    await moduleButtons[moduleName].click();
  }
}

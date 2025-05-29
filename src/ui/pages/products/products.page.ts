import { buffer } from "stream/consumers";
import { SalesPortalPage } from "../salesPortal.page";
import { Locator } from "@playwright/test";
import { Name } from "ajv";

export class ProductsPage extends SalesPortalPage {
  private readonly addProductButton = this.page.getByRole("button", {
    name: "+ Add Product",
  });
  readonly title = this.page.getByText("Products List ");
  readonly uniqueElement = this.title;

  //Table
  readonly table = this.page.locator("#table-products");

  //Table Headers
  readonly tableHeader = this.page.locator("#table-products thead");
  readonly nameHeader = this.tableHeader.filter({ hasText: "Name" });
  readonly priceHeaerd = this.tableHeader.filter({ hasText: "Price" });
  readonly manufacturerHeader = this.tableHeader.filter({
    hasText: "Manufacturer",
  });
  readonly createdOnHeader = this.tableHeader.filter({ hasText: "Created On" });

  //Table Body
  readonly tableRow = this.page.locator("#table-products tbody tr");
  readonly tableRowByName = (name: string) =>
    this.tableRow.filter({ has: this.page.getByText(name) });
  readonly nameCell = (name: string) =>
    this.tableRowByName(name).locator("td").nth(1);
  readonly priceCell = (name: string) =>
    this.tableRowByName(name).locator("td").nth(2);
  readonly manufacturerCell = (name: string) =>
    this.tableRowByName(name).locator("td").nth(3);
  readonly createdOnCell = (name: string) =>
    this.tableRowByName(name).locator("td").nth(4);
  readonly editButton = (name: string) =>
    this.tableRowByName(name).getByTitle("Edit");
  readonly detailsButton = (name: string) =>
    this.tableRowByName(name).getByTitle("Details");
  readonly deleteButton = (name: string) =>
    this.tableRowByName(name).getByTitle("Delete");

  async addNewProduct() {
    await this.addProductButton.click();
  }
}

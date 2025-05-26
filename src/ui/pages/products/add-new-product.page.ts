import { SalesPortalPage } from "../salesPortal.page";
import { IProduct } from "types/salesPortal/product.type";

export class AddNewProduct extends SalesPortalPage {
  private title = this.page.locator(".page-title-text");
  private name = this.page.locator("#inputName");
  private manufacturer = this.page.locator("#inputManufacturer");
  private price = this.page.locator("#inputPrice");
  private amount = this.page.locator("#inputAmount");
  private notes = this.page.locator("#textareaNotes");
  uniqueElement = this.title;
  private saveProductButton = this.page.locator("#save-new-product");
  private clearButton = this.page.getByRole("button", { name: "Clear all" });
  async fillInputs(product: Partial<IProduct>) {
    product.name && (await this.name.fill(product.name)),
      product.amount && (await this.amount.fill(product.amount.toString()));
    product.price && (await this.price.fill(product.price.toString())),
      product.manufacturer &&
        (await this.manufacturer.selectOption(product.manufacturer)),
      product.notes && (await this.notes.fill(product.notes));
  }

  async clickSave() {
    await this.saveProductButton.click();
  }
}

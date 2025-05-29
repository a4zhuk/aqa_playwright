import { Page } from "@playwright/test";
import { AddNewProduct } from "ui/pages/products/add-new-product.page";
import { ProductsPage } from "ui/pages/products/products.page";

export class ProductsUISetvice {
  private productPage: ProductsPage;
  private addProduct: AddNewProduct;
  constructor(private page: Page) {
    this.productPage = new ProductsPage(page);
    this.addProduct = new AddNewProduct(page);
  }
  async OpenAddProductPage() {
    await this.productPage.addNewProduct();
    await this.addProduct.waitForOpened();
  }
}

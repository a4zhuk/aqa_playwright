import { expect, Page } from "@playwright/test";
import { apiConfig } from "config/api-config";
import { generateProductData } from "data/salesPortal/products/generateProduct.data";
import { STATUS_CODES } from "data/salesPortal/statusCodes";
import _ from "lodash";
import { IProductResponse } from "types/salesPortal/product.type";
import { IProduct } from "types/shopping_cart/type";
import { AddNewProduct } from "ui/pages/products/add-new-product.page";
import { ProductsPage } from "ui/pages/products/products.page";

export class AddNewProductUISetvice {
  private addNewProductPage: AddNewProduct;
  private productsPage: ProductsPage;
  constructor(private page: Page) {
    this.addNewProductPage = new AddNewProduct(page);
    this.productsPage = new ProductsPage(page);
  }

  async create(productData?: IProduct) {
    const data = generateProductData(productData);
    await this.addNewProductPage.fillInputs(data);
    const response = await this.addNewProductPage.interceptResponse<
      IProductResponse,
      any
    >(
      apiConfig.ENDPOINTS.PRODUCTS,
      this.addNewProductPage.clickSave.bind(this.addNewProductPage)
    );
    expect(response.status).toBe(STATUS_CODES.CREATED);
    expect(_.omit(response.body.Product, "_id", "createdOn")).toEqual({
      ...data,
    });
    await this.productsPage.waitForOpened();
    return response.body.Product;
  }
}

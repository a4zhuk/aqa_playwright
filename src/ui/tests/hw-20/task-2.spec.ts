import { test, expect, Page } from "@playwright/test";
import * as helpers from "../../../helpers/shopping_cart/shopping_cart_helpers";
import { listOfProductsToAdd } from "../../../data/shopping_cart/products";
import { promocodeListWithAllCodes } from "../../../data/shopping_cart/promocodes";
test.describe("[UI] [Shopping Cart] e2e with all promocodes", () => {
  test("Successfull buing", async ({ page }) => {
    page.goto("https://anatoly-karpovich.github.io/demo-shopping-cart/");
    for (const product of listOfProductsToAdd) {
      await helpers.getAddToCardButton(product.productName, page).click();
    }
    const prices = await Promise.all(
      listOfProductsToAdd.map((product) =>
        helpers.getProductPrice(product.productName, page)
      )
    );
    const totalPrice = prices.reduce((total, price) => total + price, 0);
    await expect(page.locator("#badge-number")).toHaveText(
      `${listOfProductsToAdd.length}`
    );
    await page.locator("#badge-number").click();
    const cradsItemLocator = page.locator("h5.my-0.fw-bold");
    await expect(cradsItemLocator).toHaveCount(listOfProductsToAdd.length);
    await expect(page.locator("#total-price")).toHaveText(
      helpers.checkTotalPriceForDicaml(totalPrice)
    );
    await helpers.activetePromocode(promocodeListWithAllCodes, page);
    await expect(page.locator("#total-price")).toHaveText(
      helpers.calculateTotamPriceWithPromocode(
        totalPrice,
        promocodeListWithAllCodes
      )
    );
    await page.locator("#continue-to-checkout-button").click();
    await expect(page.locator(".text-muted")).toHaveText(
      `$${helpers.calculateTotalPriceWithDiscount(totalPrice)}`
    );
  });
});

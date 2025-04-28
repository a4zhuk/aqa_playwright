import { Page, expect } from "@playwright/test";
import { PromocodeList } from "../../types/shopping_cart/type";

function getAddToCardButton(productNumber: string, page: Page) {
  return page
    .locator("div.card-body")
    .filter({ has: page.getByText(productNumber, { exact: true }) })
    .getByRole("button", { name: "Add to card" });
}

function getProductPriceSpan(productNumber: string, page: Page) {
  return page
    .locator("div.card-body")
    .filter({ has: page.getByText(productNumber, { exact: true }) })
    .locator("span");
}
async function getProductPrice(
  productName: string,
  page: Page
): Promise<number> {
  const productPriceSpan = getProductPriceSpan(productName, page);
  const priceText = await productPriceSpan.innerText();
  const price = priceText.replace("$", "");
  return +price;
}
function checkTotalPriceForDicaml(totalAmount: number): string {
  if (totalAmount % 1 === 0) {
    return `$${totalAmount}.00`;
  } else return `$${totalAmount}`;
}

async function activetePromocode(promocodes: PromocodeList, page: Page) {
  for (const promocode of promocodes) {
    await page.locator("#rebate-input").fill(promocode["code"]);
    await page.getByRole("button", { name: "Redeem" }).click();
    await page.locator(".spinner-border").waitFor({ state: "hidden" });
  }
}

function calculateTotamPriceWithPromocode(
  totalAmount: number,
  listOfPromocodes: PromocodeList
): string {
  let fullDiscount = listOfPromocodes.reduce(
    (total, promocode) => total + promocode["discount"],
    0
  );
  let totalPrice = calculateTotalPriceWithDiscount(totalAmount);
  let discountAmount = totalAmount * (fullDiscount / 100);
  return `$${totalPrice} (-$${parseFloat(discountAmount.toString())})`;
}

function calculateTotalPriceWithDiscount(totalAmount: number): string {
  let fullDiscount = 75;
  let totalPrice = totalAmount * ((100 - fullDiscount) / 100);
  return totalPrice.toFixed(2);
}
export {
  getAddToCardButton,
  getProductPrice,
  getProductPriceSpan,
  checkTotalPriceForDicaml,
  activetePromocode,
  calculateTotamPriceWithPromocode,
  calculateTotalPriceWithDiscount,
};

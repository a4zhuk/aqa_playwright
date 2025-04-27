import {Page, expect} from '@playwright/test'

function getAddToCardButton (productNumber: string, page: Page){
   return page
    .locator('div.card-body')
    .filter({has: page.getByText(productNumber, {exact: true})})
    .getByRole('button', {name: 'Add to card'})
};

function getProductPriceSpan(productNumber: string, page: Page){
    return page
    .locator("div.card-body")
    .filter({has: page.getByText(productNumber, {exact: true})})
    .locator("span")
};
async function getProductPrice(productName: string, page: Page): Promise<number> {
    const productPriceSpan = getProductPriceSpan(productName, page);
    const priceText = await productPriceSpan.innerText();
    const price = priceText.replace("$", "");
    return +price;
  }
function validateTotalPriceWithoutPromocode(totalAmount: number): string{
    if(totalAmount % 1 === 0){
        return `$${totalAmount}.00`
    } else return `$${totalAmount}`
}

async function activetePromocode(promocode: string[], page: Page){
    for (const code of promocode){
        await page.locator("#rebate-input").fill(code)
        await page.getByRole("button", {name: "Redeem"}).click()
        await page.locator(".spinner-border").waitFor({state: 'hidden'})
    }
}

function validateTotalPriceWithPromocode(totalAmount: number): string{
    let fullDiscount = 75
    let totalPrice= calculateTotalPriceWithDiscount(totalAmount)
    let discountAmount = totalAmount * (fullDiscount / 100)
    return `$${totalPrice} (-$${parseFloat(discountAmount.toString())})`
}

function calculateTotalPriceWithDiscount(totalAmount: number): string{
    let fullDiscount = 75
    let totalPrice = totalAmount * ((100 - fullDiscount) / 100)
    return totalPrice.toFixed(2)
}
export {getAddToCardButton, getProductPrice, getProductPriceSpan, validateTotalPriceWithoutPromocode, activetePromocode, validateTotalPriceWithPromocode, calculateTotalPriceWithDiscount}
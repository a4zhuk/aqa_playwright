import { STATUS_CODES } from "data/salesPortal/statusCodes";
import { test, expect } from "fixtures/ui-services.fixture";

test.describe("[E2E] [UI] [Products] [Create]", () => {
  let token = "";
  let id = "";
  test("Create customer wtih smoke data", async ({
    productsController,
    signInUIService,
    homeUIService,
    productsUIService,
    addNewProductUIService,
  }) => {
    token = await signInUIService.signInAsLocalUser();
    await homeUIService.openModule("Products"),
      await productsUIService.OpenAddProductPage();
    const newProduct = await addNewProductUIService.create();
    const response = await productsController.getById(newProduct._id, token);
    id = newProduct._id;
    expect(response.status).toBe(STATUS_CODES.OK);
  });

  test.afterEach(async ({productsController})=> {
    await productsController.delete(id, token)
  })
});

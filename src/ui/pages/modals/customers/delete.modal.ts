import { Modal } from "../modal.page";

export class DeleteCustomerModal extends Modal {
  readonly uniqueElement = this.page.locator("div[role='dialog']");
  readonly title = this.page.locator(" Delete Customer");
  readonly warningText = this.page.locator(".modal-body");
  readonly closeButton = this.page.locator("button[aria-label='Close']");
  readonly deleteButton = this.page.getByRole("button", { name: "Yes, Delete" });
  readonly cancelButton = this.page.getByRole("button", { name: "Cancel" });

  async closeModal() {
    await this.closeButton.click();
  }
  async clickDelete() {
    await this.deleteButton.click();
  }
  async clickCancelButton() {
    await this.cancelButton.click();
  }
}

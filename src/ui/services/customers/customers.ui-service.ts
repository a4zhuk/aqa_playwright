import { PageHolder } from "types/salesPortal/pageHolder.holder";
import { AddNewCustomerPage } from "ui/pages/customers/add-new-customer.page";
import { CustomerDetailsPage } from "ui/pages/customers/customer-details.page";
import { CustomersPage } from "ui/pages/customers/customers.page";
import { EditCustomerPage } from "ui/pages/customers/edit-customer.page";

export class CustomersUIService extends PageHolder {
  private customersPage: CustomersPage = new CustomersPage(this.page);
  private addNewCustomerPage: AddNewCustomerPage = new AddNewCustomerPage(
    this.page
  );
  private editCustomerPage: EditCustomerPage = new EditCustomerPage(this.page);
  private customerDetailsPage: CustomerDetailsPage = new CustomerDetailsPage(
    this.page
  );

  async openAddPage() {
    await this.customersPage.clickAddNewCustomer();
    await this.addNewCustomerPage.waitForOpened();
  }

  async openEditPage(email: string) {
    await this.customersPage.clickTableAction(email, "edit");
    await this.editCustomerPage.waitForOpened();
  }

  async openDetailsPage(email: string) {
    await this.customersPage.clickTableAction(email, "details");
    await this.customerDetailsPage.waitForOpened();
  }
}

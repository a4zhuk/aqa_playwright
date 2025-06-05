import { Page } from "@playwright/test";

export class PageHolder {
  constructor( readonly page: Page) {}
}

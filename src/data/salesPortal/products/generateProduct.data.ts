import { IProduct } from "types/salesPortal/product.type";
import { Manufacturer } from "data/salesPortal/products/manufacturer.data";
import { getRandromEnumValue } from "utils/salesPortal/enum.utils";
import { faker } from "@faker-js/faker";

export function generateProductData(params?: Partial<IProduct>): IProduct {
  return {
    name: `zhuk${Date.now()}`,
    manufacturer: getRandromEnumValue(Manufacturer),
    price: faker.number.int(99999),
    amount: faker.number.int(999),
    notes: `Notes ${faker.string.alpha(244)}`,
    ...params,
  };
}

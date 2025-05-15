import { IPositiveCustomer } from "types/salesPortal/customer.types";
import { generateCustomerData } from "./generateCustomer.data";
import _, { toNumber } from "lodash";

export const createCustomerPositiveData: IPositiveCustomer[] = [
  {
    testName: "Check customer creation using only required fields",
    data: _.omit(generateCustomerData(), ["notes"]),
  },
  {
    testName: "Check customer creation using reuqired and optional fields",
    data: generateCustomerData(),
  },
  {
    testName: "Check customer creation using short name",
    data: generateCustomerData({ name: "q" }),
  },
  {
    testName: "Check customer creation using short city",
    data: generateCustomerData({ city: "q" }),
  },
  {
    testName: "Check customer creation using short street",
    data: generateCustomerData({ street: "z" }),
  },
  {
    testName: "Check customer creation using short house",
    data: generateCustomerData({ house: 1 }),
  },
  {
    testName: "Check customer creation using short flat",
    data: generateCustomerData({ flat: 5 }),
  },
  {
    testName: "Check customer creation using short phone",
    data: generateCustomerData({ phone: "+" + "2".repeat(10) }),
  },
  {
    testName: "Check customer creation using long name",
    data: generateCustomerData({ name: "ab".repeat(20) }),
  },
  {
    testName: "Check customer creation using long city",
    data: generateCustomerData({ city: "hi".repeat(10) }),
  },
  {
    testName: "Check customer creation using long street",
    data: generateCustomerData({ street: "xo".repeat(10) }),
  },
  {
    testName: "Check customer creation using long house",
    data: generateCustomerData({ house: toNumber("9".repeat(3)) }),
  },
  {
    testName: "Check customer creation using long flat",
    data: generateCustomerData({ flat: +"9".repeat(4) }),
  },
  {
    testName: "Check customer creation using long phone",
    data: generateCustomerData({ phone: "+" + "1".repeat(19) }),
  },
  {
    testName: "Check customer creation using long notes",
    data: generateCustomerData({ notes: "q".repeat(250) }),
  },
];

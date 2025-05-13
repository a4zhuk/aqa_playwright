import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { IPositiveCustomer } from "types/salesPortal/customer.types";
import { generateCustomerData } from "./generateCustomer.data";
import _, { toNumber } from "lodash";

export const createCustomerPositiveData: IPositiveCustomer[] = [
  {
    testName: "Check customer creation using only required fields",
    username: USER_LOGIN,
    password: USER_PASSWORD,
    data: _.omit(generateCustomerData(), ["notes"]),
  },
  {
    testName: "Check customer creation using reuqired and optional fields",
    username: USER_LOGIN,
    password: USER_PASSWORD,
    data: generateCustomerData(),
  },
  {
    testName: "Check customer creation using short name",
    username: USER_LOGIN,
    password: USER_PASSWORD,
    data: generateCustomerData({ name: "q" }),
  },
  {
    testName: "Check customer creation using short city",
    username: USER_LOGIN,
    password: USER_PASSWORD,
    data: generateCustomerData({ city: "q" }),
  },
  {
    testName: "Check customer creation using short street",
    username: USER_LOGIN,
    password: USER_PASSWORD,
    data: generateCustomerData({ street: "z" }),
  },
  {
    testName: "Check customer creation using short house",
    username: USER_LOGIN,
    password: USER_PASSWORD,
    data: generateCustomerData({ house: 1 }),
  },
  {
    testName: "Check customer creation using short flat",
    username: USER_LOGIN,
    password: USER_PASSWORD,
    data: generateCustomerData({ flat: 5 }),
  },
  {
    testName: "Check customer creation using short phone",
    username: USER_LOGIN,
    password: USER_PASSWORD,
    data: generateCustomerData({ phone: "+" + "2".repeat(10) }),
  },
  {
    testName: "Check customer creation using long name",
    username: USER_LOGIN,
    password: USER_PASSWORD,
    data: generateCustomerData({ name: "ab".repeat(20) }),
  },
  {
    testName: "Check customer creation using long city",
    username: USER_LOGIN,
    password: USER_PASSWORD,
    data: generateCustomerData({ city: "hi".repeat(10) }),
  },
  {
    testName: "Check customer creation using long street",
    username: USER_LOGIN,
    password: USER_PASSWORD,
    data: generateCustomerData({ street: "xo".repeat(10) }),
  },
  {
    testName: "Check customer creation using long house",
    username: USER_LOGIN,
    password: USER_PASSWORD,
    data: generateCustomerData({ house: toNumber("9".repeat(3)) }),
  },
  {
    testName: "Check customer creation using long flat",
    username: USER_LOGIN,
    password: USER_PASSWORD,
    data: generateCustomerData({ flat: +"9".repeat(4) }),
  },
  {
    testName: "Check customer creation using long phone",
    username: USER_LOGIN,
    password: USER_PASSWORD,
    data: generateCustomerData({ phone: "+" + "1".repeat(19) }),
  },
  {
    testName: "Check customer creation using long notes",
    username: USER_LOGIN,
    password: USER_PASSWORD,
    data: generateCustomerData({ notes: "q".repeat(250) }),
  },
];

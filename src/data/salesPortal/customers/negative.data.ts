import { INegativeCustomer } from "types/salesPortal/customer.types";
import { generateCustomerData } from "./generateCustomer.data";
import _, { at } from "lodash";
import { STATUS_CODES } from "../statusCodes";

export const createCustomerNegativeData: INegativeCustomer[] = [
  {
    testName: "Check customer creation without email",
    data: _.omit(generateCustomerData(), ["email"]),
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: "Incorrect request body",
  },
  {
    testName: "Check customer creation with empty email",
    data: generateCustomerData({ email: "" }),
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: "Incorrect request body",
  },
  {
    testName: "Check customer creation using email without @ symbol",
    data: generateCustomerData({ email: "test.test" }),
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: "Incorrect request body",
  },
  {
    testName: "Check customer creation using email without dot",
    data: generateCustomerData({ email: "test@test" }),
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: "Incorrect request body",
  },
  {
    testName: "Check customer creation without customer name",
    data: _.omit(generateCustomerData(), ["name"]),
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: "Incorrect request body",
  },
  {
    testName: "Check customer creation using empty name",
    data: generateCustomerData({ name: "" }),
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: "Incorrect request body",
  },
  {
    testName: "Check customer creation using name with max_length+1",
    data: generateCustomerData({ name: "a".repeat(41) }),
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: "Incorrect request body",
  },
  {
    testName: "Check customer creation without Country",
    data: _.omit(generateCustomerData(), ["country"]),
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: "Incorrect request body",
  },
  {
    testName: "Check customer creation without city",
    data: _.omit(generateCustomerData(), ["city"]),
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: "Incorrect request body",
  },
  {
    testName: "Check customer creation using empty city",
    data: generateCustomerData({ city: "" }),
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: "Incorrect request body",
  },
  {
    testName: "Check customer creation using city with max_lenth+1 ",
    data: generateCustomerData({ city: "z".repeat(21) }),
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: "Incorrect request body",
  },
  {
    testName: "Check customer creation without street",
    data: _.omit(generateCustomerData(), ["street"]),
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: "Incorrect request body",
  },
  {
    testName: "Check customer creation using empty street",
    data: generateCustomerData({ street: "" }),
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: "Incorrect request body",
  },
  {
    testName: "Check customer creation using street with max_lenth+1 ",
    data: generateCustomerData({ street: "q".repeat(41) }),
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: "Incorrect request body",
  },
  {
    testName: "Check customer creation without house",
    data: _.omit(generateCustomerData(), ["house"]),
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: "Incorrect request body",
  },
  {
    testName: "Check customer creation using house with max_lenth+1 ",
    data: generateCustomerData({ house: +"2".repeat(4) }),
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: "Incorrect request body",
  },
  {
    testName: "Check customer creation without flat",
    data: _.omit(generateCustomerData(), ["flat"]),
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: "Incorrect request body",
  },
  {
    testName: "Check customer creation using flat with max_lenth+1 ",
    data: generateCustomerData({ flat: +"4".repeat(5) }),
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: "Incorrect request body",
  },
  {
    testName: "Check customer creation without phone",
    data: _.omit(generateCustomerData(), ["phone"]),
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: "Incorrect request body",
  },
  {
    testName: "Check customer creation using empty phone",
    data: generateCustomerData({ phone: "" }),
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: "Incorrect request body",
  },
  {
    testName: "Check customer creation using phone without '+' ",
    data: generateCustomerData({ phone: "1".repeat(11) }),
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: "Incorrect request body",
  },
  {
    testName: "Check customer creation using phone with min_lenth-1 ",
    data: generateCustomerData({ phone: "+" + "2".repeat(9) }),
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: "Incorrect request body",
  },
  {
    testName: "Check customer creation using phone with max_lenth+1 ",
    data: generateCustomerData({ phone: "+" + "5".repeat(21) }),
    statusCode: STATUS_CODES.BAD_REQUEST,
    errorMessage: "Incorrect request body",
  },
];

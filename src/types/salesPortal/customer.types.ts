import { COUNTRIES } from "data/salesPortal/customers/countries.data";
import {
  customersSortField,
  IResponseFields,
  sortDirection,
} from "types/salesPortal/api.types";

export interface ICustomer {
  email: string;
  name: string;
  country: COUNTRIES;
  city: string;
  street: string;
  house: number;
  flat: number;
  phone: string;
  notes?: string;
}
export type ICustomerInTable = Pick<ICustomer, "email" | "country" | "name">;
export interface ICustomerFromResponse extends ICustomer {
  _id: string;
  createdOn: string;
}

export interface ICustomerResponse extends IResponseFields {
  Customer: ICustomerFromResponse;
}

export interface ICustomersResponse extends IResponseFields {
  Customers: ICustomerFromResponse[];
  sorting: {
    sortField: customersSortField;
    sortOrder: sortDirection;
  };
}

export interface INegativeCustomer {
  testName: string;
  data?: object;
  token?: string;
  statusCode: number;
  errorMessage: string | null;
}
export interface IPositiveCustomer {
  testName: string;
  data: object;
}

import { Manufacturer } from "data/salesPortal/products/manufacturer.data";
import {
  IResponseFields,
  ProductSortingFields,
  sortDirection,
} from "./api.types";
import { types } from "util";

export interface IProduct {
  name: string;
  amount: number;
  price: number;
  notes?: string;
  manufacturer: Manufacturer;
}

export interface IProductFromResponse extends IProduct {
  _id: string;
  createdOn: string;
}

export interface IProductResponse extends IResponseFields {
  Product: IProductFromResponse;
  sorting: {
    sortOrder: sortDirection;
    sortField: ProductSortingFields;
  };
  total: number;
}

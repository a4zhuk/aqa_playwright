import { IResponseFields } from "./api.types";

interface ICustomerMetrics {
  customerGrowth: object[];
  topCustomers: object[];
  totalNewCustomers: number;
}

interface IOrdersMetrics {
  averageOrderValue: number;
  ordersCountPerDay: object[];
  recentOrders: object[];
  totalCanceledOrders: number;
  totalOrders: number;
  totalRevenue: number;
}

interface IProductsMetrics {
  topProducts: object[];
}
interface IMetrics {
  customers: ICustomerMetrics;
  orders: IOrdersMetrics;
  products: IProductsMetrics;
}

export interface IMetricsResponse extends IResponseFields {
  Metrics: IMetrics;
}

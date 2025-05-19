import { test, expect } from "fixtures/businessSteps.fixture";
import { ordersMetric, testMetricsData } from "data/salesPortal/metrics.data";
import numeral from "numeral";
import { Locator } from "@playwright/test";

test.describe("[UI] [Home] [Metrics]", async () => {
//   const totalOrderExpected = 100;
//   const totalNewCustomersExpected = 50000;
//   const totalCanceledOrdersExpected = 1234;
//   const totalRevenueExpected = 5500000;
//   const AvgOrdersValueExpected = 12300000;
//   test("Should display valid totalOrders metric", async ({
//     loginAsLocalUser,
//     homePage,
//     mock,
//   }) => {
//     await mock.metric({
//       Metrics: {
//         ...ordersMetric,
//         orders: { ...ordersMetric.orders, totalOrders: totalOrderExpected },
//       },
//       ErrorMessage: null,
//       IsSuccess: true,
//     });
//     await loginAsLocalUser();
//     expect(homePage.numberOfOrdersThisYear).toHaveText(
//       totalOrderExpected.toString()
//     );
//   });
//   test("Should display valid NewCustomers metric", async ({
//     loginAsLocalUser,
//     homePage,
//     mock,
//   }) => {
//     await mock.metric({
//       Metrics: {
//         ...ordersMetric,
//         customers: {
//           ...ordersMetric.customers,
//           totalNewCustomers: +totalNewCustomersExpected,
//         },
//       },
//       ErrorMessage: null,
//       IsSuccess: true,
//     });
//     await loginAsLocalUser();
//     expect(homePage.numberOfTotalCustomers).toHaveText(
//       totalNewCustomersExpected.toString()
//     );
//   });
//   test("Should display valid CanceledOrders metric", async ({
//     loginAsLocalUser,
//     homePage,
//     mock,
//   }) => {
//     await mock.metric({
//       Metrics: {
//         ...ordersMetric,
//         orders: {
//           ...ordersMetric.orders,
//           totalCanceledOrders: +totalCanceledOrdersExpected,
//         },
//       },
//       ErrorMessage: null,
//       IsSuccess: true,
//     });
//     await loginAsLocalUser();
//     expect(homePage.numberOfCanceledOrders).toHaveText(
//       totalCanceledOrdersExpected.toString()
//     );
//   });
//   test("Should display valid TotalRevenue metric", async ({
//     loginAsLocalUser,
//     homePage,
//     mock,
//   }) => {
//     await mock.metric({
//       Metrics: {
//         ...ordersMetric,
//         orders: { ...ordersMetric.orders, totalRevenue: totalRevenueExpected },
//       },
//       ErrorMessage: null,
//       IsSuccess: true,
//     });
//     await loginAsLocalUser();
//     expect(homePage.sumOfTotalRevenue).toHaveText(
//       "$" + numeral(totalRevenueExpected).format("0.0a")
//     );
//   });
//   test("Should display valid AvgOrdersValue metric", async ({
//     loginAsLocalUser,
//     homePage,
//     mock,
//   }) => {
//     await mock.metric({
//       Metrics: {
//         ...ordersMetric,
//         orders: {
//           ...ordersMetric.orders,
//           averageOrderValue: AvgOrdersValueExpected,
//         },
//       },
//       ErrorMessage: null,
//       IsSuccess: true,
//     });
//     await loginAsLocalUser();
//     expect(homePage.sumOfAvgOrdersValue).toHaveText(
//       "$" + numeral(AvgOrdersValueExpected).format("0.0a")
//     );
//   });
  testMetricsData.forEach((metrics) => {
    test(metrics.testName, async ({ loginAsLocalUser, homePage, mock }) => {
      await mock.metric(metrics.data);
      await loginAsLocalUser();
      expect(homePage[metrics.locator] as Locator).toHaveText(
        metrics.expected
      );
    });
  });
});

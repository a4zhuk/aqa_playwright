import { test, expect } from "fixtures/businessSteps.fixture";
import { ordersMetric } from "data/salesPortal/metrics.data";
import numeral from "numeral";

test.describe("[UI] [Home] [Metrics]", async () => {
  const totalOrderExpected = "100";
  const totalNewCustomersExpected = "50000";
  const totalCanceledOrdersExpected = "1234";
  const totalRevenueExpected = 5500000;
  const AvgOrdersValueExpected = 12300000;
  test("Should display valid totalOrders metric", async ({
    loginAsLocalUser,
    homePage,
    mock,
  }) => {
    await mock.metric({
      Metrics: {
        ...ordersMetric,
        orders: { ...ordersMetric.orders, totalOrders: +totalOrderExpected },
      },
      ErrorMessage: null,
      IsSuccess: true,
    });
    await loginAsLocalUser();

    await homePage.waitForOpened();
    expect(homePage.numberOfOrdersThisYear).toHaveText(totalOrderExpected);
  });
  test("Should display valid NewCustomers metric", async ({
    loginAsLocalUser,
    homePage,
    mock,
  }) => {
    await mock.metric({
      Metrics: {
        ...ordersMetric,
        customers: {
          ...ordersMetric.customers,
          totalNewCustomers: +totalNewCustomersExpected,
        },
      },
      ErrorMessage: null,
      IsSuccess: true,
    });
    await loginAsLocalUser();

    await homePage.waitForOpened();
    expect(homePage.numberOfTotalCustomers).toHaveText(
      totalNewCustomersExpected
    );
  });
  test("Should display valid CanceledOrders metric", async ({
    loginAsLocalUser,
    homePage,
    mock,
  }) => {
    await mock.metric({
      Metrics: {
        ...ordersMetric,
        orders: {
          ...ordersMetric.orders,
          totalCanceledOrders: +totalCanceledOrdersExpected,
        },
      },
      ErrorMessage: null,
      IsSuccess: true,
    });
    await loginAsLocalUser();

    await homePage.waitForOpened();
    expect(homePage.numberOfCanceledOrders).toHaveText(
      totalCanceledOrdersExpected
    );
  });
  test("Should display valid TotalRevenue metric", async ({
    loginAsLocalUser,
    homePage,
    mock,
  }) => {
    await mock.metric({
      Metrics: {
        ...ordersMetric,
        orders: { ...ordersMetric.orders, totalRevenue: totalRevenueExpected },
      },
      ErrorMessage: null,
      IsSuccess: true,
    });
    await loginAsLocalUser();

    await homePage.waitForOpened();
    expect(homePage.sumOfTotalRevenue).toHaveText(
      "$" + numeral(totalRevenueExpected).format("0.0a")
    );
  });
  test("Should display valid AvgOrdersValue metric", async ({
    loginAsLocalUser,
    homePage,
    mock,
  }) => {
    await mock.metric({
      Metrics: {
        ...ordersMetric,
        orders: {
          ...ordersMetric.orders,
          averageOrderValue: AvgOrdersValueExpected,
        },
      },
      ErrorMessage: null,
      IsSuccess: true,
    });
    await loginAsLocalUser();

    await homePage.waitForOpened();
    expect(homePage.sumOfAvgOrdersValue).toHaveText(
      "$" + numeral(AvgOrdersValueExpected).format("0.0a")
    );
  });
});

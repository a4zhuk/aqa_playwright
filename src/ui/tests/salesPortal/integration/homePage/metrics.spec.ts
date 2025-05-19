import { test, expect } from "fixtures/businessSteps.fixture";
import { ordersMetric, testMetricsData } from "data/salesPortal/metrics.data";
import numeral from "numeral";
import { Locator } from "@playwright/test";

test.describe("[UI] [Home] [Metrics]", async () => {
  testMetricsData.forEach((metrics) => {
    test(metrics.testName, async ({ loginAsLocalUser, homePage, mock }) => {
      await mock.metric(metrics.data);
      await loginAsLocalUser();
      expect(homePage[metrics.locator] as Locator).toHaveText(metrics.expected);
    });
  });
});

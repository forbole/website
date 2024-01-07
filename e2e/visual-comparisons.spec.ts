import type { Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

const slowlyScrollToBottom = async (page: Page) => {
  await page.evaluate(
    () =>
      new Promise((resolve) => {
        const distance = 1000;
        const delay = 100;

        const timer = setInterval(() => {
          document.scrollingElement!.scrollTop =
            (document.scrollingElement?.scrollTop || 0) + distance;

          if (
            (document.scrollingElement?.scrollTop || 0) + window.innerHeight >=
            (document.scrollingElement?.scrollHeight || 0)
          ) {
            clearInterval(timer);
            resolve(true);
          }
        }, delay);
      }),
  );
};

const scrollToTop = async (page: Page) => {
  await page.evaluate(
    () =>
      new Promise((resolve) => {
        document.scrollingElement!.scrollTop = 0;

        resolve(true);
      }),
  );
};

test.describe.parallel("Main Pages", () => {
  const paths = [
    "/",
    "/about",
    "/analytics-tools",
    "/author/daisy",
    "/blog",
    "/blog/big-dipper-bi-weekly-review-2023-nov-1-15",
    "/contact",
    "/developer-tools",
    "/enterprise-solution",
    "/infrastructure",
    "/privacy-policy",
    "/products",
    "/staking",
    "/staking-service",
    "/staking/how-to-stake-akt-on-akash",
    "/tag/likecoin",
    "/terms-and-conditions",
    "/zh-HK",
  ];

  paths.forEach((path) => {
    test(`Path: ${path}`, async ({ page }) => {
      await page.goto("/");

      await page.evaluate(() => {
        document.cookie = "is_e2e_test=true";
      }, []);

      await page.reload();

      await page.goto(path);

      await slowlyScrollToBottom(page);
      await scrollToTop(page);
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot({
        fullPage: true,
      });
    });
  });
});

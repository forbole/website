import { expect, test } from "@playwright/test";

test.describe.parallel("Main Pages", () => {
  test.describe.parallel("Home Page", () => {
    test("Titles i18n", async ({ page }) => {
      await page.goto("/");
      await expect(page).toHaveTitle("Safekeeping You On-chain");

      await page.goto("/zh-HK");
      await expect(page).toHaveTitle("堅實基建，硅步千里");

      await page.goto("/zh-CN");
      await expect(page).toHaveTitle("坚实基建，跬步千里");
    });

    test("Main components", async ({ page }) => {
      await page.goto("/");

      await page.waitForTimeout(200);

      await expect(page.locator('[data-test="footer"]')).toBeVisible();
      await expect(page.locator('[data-test="nav"]')).toBeVisible();
    });
  });

  test.describe.parallel("Contact Page", () => {
    test("Main components", async ({ page }) => {
      await page.goto("/contact");

      await page.waitForTimeout(200);

      await expect(page.locator('[data-test="contact-submit"]')).toBeVisible();
    });
  });

  test.describe.parallel("DevTools Page", () => {
    test("Main components", async ({ page }) => {
      await page.goto("/developer-tools");

      await page.waitForTimeout(200);

      await expect(page.locator('[data-test="devtools-cta"]')).toBeVisible();
    });
  });
});

test.describe.parallel("Blog", () => {
  test("Main components", async ({ page }) => {
    await page.goto("/blog");

    await page.waitForTimeout(200);

    expect(
      await page.locator('[data-test="post-summary-item"]').count(),
    ).toBeGreaterThan(1);
  });
});

test.describe.parallel("Staking", () => {
  test("Main components", async ({ page }) => {
    await page.goto("/staking");

    await page.waitForTimeout(200);

    expect(
      await page.locator('[data-test="network-item"]').count(),
    ).toBeGreaterThan(1);

    expect(await page.locator('[data-test="stats-cards"]').count()).toEqual(1);
  });
});

test.describe.parallel("Staking Details", () => {
  test("Main components", async ({ page }) => {
    await page.goto("/staking/how-to-stake-bld-on-agoric");

    await page.waitForTimeout(200);

    await expect(
      page.locator('[data-test="staking-guide-info"]'),
    ).toBeVisible();
  });
});

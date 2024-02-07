import type { Page } from "@playwright/test";

export const prepareEnv = async (page: Page) => {
  await page.goto("/");

  await page.evaluate(() => {
    document.cookie = "is_e2e_test=true";
  }, []);

  await page.reload();
};

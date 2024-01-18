import { expect, test } from "@playwright/test";

import { StakingPage } from "./poms/staking_page";
import { prepareEnv } from "./utils/prepare_env";

test.beforeEach(async ({ page }) => {
  await prepareEnv(page);
});

test.describe.parallel("Staking", () => {
  test("Can see the staking banner in the expected cards", async ({ page }) => {
    const stakingPage = new StakingPage(page);

    await stakingPage.navigate();

    const networksKeysWithStaking = ["akash", "cosmos", "dydx", "celestia"].map(
      (n) => [n, 1],
    ) as [string, number][];

    const networksKeysWithoutStaking = ["sui", "agoric"].map((n) => [n, 0]) as [
      string,
      number,
    ][];

    await networksKeysWithStaking
      .concat(networksKeysWithoutStaking)
      .reduce(async (promise, [network, count]) => {
        await promise;

        await expect(
          page.locator(
            [
              StakingPage.selectors.networkCard(network),
              StakingPage.selectors.stakingCardLabel,
            ].join(" >> "),
          ),
        ).toHaveCount(count);
      }, Promise.resolve());
  });
});

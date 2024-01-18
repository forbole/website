import { expect, test } from "@playwright/test";

import { StakingPage } from "./poms/staking_page";
import { prepareEnv } from "./utils/prepare_env";

test.beforeEach(async ({ page }) => {
  await prepareEnv(page);
});

test.describe.parallel("Staking Page", () => {
  test("Can see the staking banner in the expected cards", async ({ page }) => {
    const stakingPage = new StakingPage(page);

    await stakingPage.navigate();

    const stakingCount = StakingPage.networksWithStaking.map((n) => [n, 1]) as [
      string,
      number,
    ][];

    const noStakingCount = StakingPage.networksWithoutStaking.map((n) => [
      n,
      0,
    ]) as [string, number][];

    await stakingCount.concat(noStakingCount).reduce(
      async (p, [network, count]) =>
        p.then(async () => {
          await expect(
            page.locator(
              [
                StakingPage.selectors.networkCard(network),
                StakingPage.selectors.stakingCardLabel,
              ].join(" >> "),
            ),
          ).toHaveCount(count);
        }),
      Promise.resolve(),
    );
  });
});

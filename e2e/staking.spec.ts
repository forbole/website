import { expect, test } from "@playwright/test";

import { StakingNetworkId } from "@src/screens/staking/lib/staking_sdk/core";
import type { NetworkKey } from "@src/utils/network_info";

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
      NetworkKey,
      number,
    ][];

    const noStakingCount = StakingPage.networksWithoutStaking.map((n) => [
      n,
      0,
    ]) as [NetworkKey, number][];

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

  test("The staking card has the stake button when the user has an account", async ({
    page,
  }) => {
    const stakingPage = new StakingPage(page);

    await stakingPage.navigate();

    const buttonLocator = [
      StakingPage.selectors.networkCard("akash"),
      StakingPage.selectors.popoverStakeButton,
    ].join(" >> ");

    // Before adding the account, there is no staking button
    await page.hover(StakingPage.selectors.networkCard("akash"));
    await expect(page.locator(buttonLocator)).toHaveCount(0);

    await stakingPage.setNetworkAccount(StakingNetworkId.Akash);

    // After adding the account, there should be a staking button
    await page.hover(StakingPage.selectors.networkCard("akash"));
    await expect(page.locator(buttonLocator)).toHaveCount(1);
  });
});

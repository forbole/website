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

  test("The staking card has the stake button regardless if the user connected a wallet", async ({
    page,
  }) => {
    const stakingPage = new StakingPage(page);

    await stakingPage.navigate();

    const buttonLocator = [
      StakingPage.selectors.networkCard("akash"),
      StakingPage.selectors.popoverStakeButton,
    ].join(" >> ");

    // Even before adding the account, there is a staking button
    await stakingPage.showPopover("akash");
    await expect(page.locator(buttonLocator)).toHaveCount(1);

    await stakingPage.setNetworkAccount(StakingNetworkId.Akash);

    // After adding the account, there should be a staking button
    await stakingPage.showPopover("akash");
    await expect(page.locator(buttonLocator)).toHaveCount(1);
  });

  test("There is a validation error when trying to stake an incorrect amount", async ({
    page,
  }) => {
    const stakingPage = new StakingPage(page);

    await stakingPage.navigate();

    await stakingPage.setNetworkAccount(StakingNetworkId.Akash, {
      balances: {
        amount: "10",
        denom: "akt",
      },
    });

    await stakingPage.openStakingModal("akash");

    const performCheck = async (hasError: boolean) => {
      if (hasError) {
        await expect(
          page.locator(StakingPage.selectors.stakingModalAmountError),
        ).toHaveText("You have to input a valid amount");
      } else {
        await expect(
          page.locator(StakingPage.selectors.stakingModalAmountError),
        ).toHaveCount(0);
      }
    };

    await performCheck(false);

    await stakingPage.fillStakingAmount("20");
    await performCheck(true);

    await stakingPage.fillStakingAmount("0");
    await performCheck(true);

    await stakingPage.fillStakingAmount("1");
    await performCheck(false);
  });
});

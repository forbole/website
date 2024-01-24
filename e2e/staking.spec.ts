import { expect, test } from "@playwright/test";

import {
  StakingNetworkId,
  WalletId,
} from "@src/screens/staking/lib/staking_sdk/core";
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

    await stakingPage.clickNetworkStakeButton("akash");

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

  test("The user can choose between Leap and Keplr when both are available", async ({
    page,
  }) => {
    const stakingPage = new StakingPage(page);

    await stakingPage.navigate();

    const setupAccount = (wallet: WalletId) =>
      stakingPage.setNetworkAccount(StakingNetworkId.Akash, {
        balances: {
          amount: "10",
          denom: "akt",
        },
        wallet,
      });

    await setupAccount(WalletId.Keplr);

    const performCheck = async (hasLeap: boolean) => {
      await stakingPage.clickNetworkStakeButton("akash");

      await page.locator(`[data-test="networks-select-wallet-keplr"]`).click();

      await expect(
        page.locator(`[data-test="networks-select-wallet-keplr"]`),
        // If it has leap it means it is a dropdown with kepler two times (the
        // selected one and the one in the select box)
      ).toHaveCount(hasLeap ? 2 : 1);

      await expect(
        page.locator(`[data-test="networks-select-wallet-leap"]`),
      ).toHaveCount(hasLeap ? 1 : 0);
    };

    await performCheck(false);

    await page.reload();

    await setupAccount(WalletId.Keplr);
    await setupAccount(WalletId.Leap);

    await performCheck(true);
  });

  test("when the user didn't connect any wallet, when clicking the stake button it opens the wallets connection modal", async ({
    page,
  }) => {
    const stakingPage = new StakingPage(page);

    await stakingPage.navigate();

    await expect(
      page.locator(`[data-test="connect-wallet-modal"]`),
    ).toHaveCount(0);

    await stakingPage.clickNetworkStakeButton("akash");

    await expect(
      page.locator(`[data-test="connect-wallet-modal"]`),
    ).toHaveCount(1);
  });
});

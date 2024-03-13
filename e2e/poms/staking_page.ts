import type { Page } from "@playwright/test";

import type { TStakingContext } from "@src/screens/staking/lib/staking_sdk/context";
import type {
  Account,
  Wallet,
} from "@src/screens/staking/lib/staking_sdk/core";
import type {
  Coin,
  StakingNetworkId,
} from "@src/screens/staking/lib/staking_sdk/core/base";
import { WalletId } from "@src/screens/staking/lib/staking_sdk/core/base";
import type { NetworkKey } from "@src/utils/network_info";

const networkCard = (network: NetworkKey) =>
  `[data-test="network-card-${network}"]`;

const selectors = {
  networkCard,
  popoverStakeButton: '[data-test="popover-stake-button"]',
  stakingCardLabel: '[data-test="staking-card-label"]',
  stakingModalAmountError: '[data-test="staking-modal-amount-error"]',
};

const networksWithoutStaking: NetworkKey[] = ["sui", "agoric"];

const networksWithStaking: NetworkKey[] = [
  "akash",
  "cosmos",
  "dydx",
  "celestia",
];

type AccountOpts = {
  balances?: Coin;
  wallet?: WalletId;
};

export class StakingPage {
  static networksWithoutStaking = networksWithoutStaking;
  static networksWithStaking = networksWithStaking;
  static selectors = selectors;

  constructor(private page: Page) {}

  async clickNetworkStakeButton(network: NetworkKey) {
    await this.showPopover("akash");

    await this.page
      .locator(
        [
          StakingPage.selectors.networkCard(network),
          StakingPage.selectors.popoverStakeButton,
        ].join(" >> "),
      )
      .click();
  }

  async fillStakingAmount(amount: string) {
    const { page } = this;

    await page.locator('[data-test="staking-modal-amount-input"]').fill(amount);
    await page.locator('[data-test="staking-modal-amount-input"]').blur();
  }

  navigate() {
    return this.page.goto("/staking");
  }

  async setNetworkAccount(network: StakingNetworkId, aOpts?: AccountOpts) {
    await this.page.evaluate(
      (opts) => {
        const { setState, state } = (window as any)
          .stakingContext as TStakingContext;

        const newWallets = {
          ...state.wallets,
          [opts.wallet]: {
            ...state.wallets.keplr,
            networks: {
              ...state.wallets.keplr?.networks,
              [opts.network]: {
                accounts: [
                  {
                    address: "test-address",
                    info: {
                      account_number: 0,
                      address: "test-address",
                      balances: opts.balances ?? {
                        amount: "10",
                        denom: "utest",
                      },
                      delegation: {
                        amount: "0",
                        denom: "utest",
                      },
                      network: opts.network,
                      sequence: 0,
                      unbonding: [],
                    },
                    networkId: opts.network,
                    wallet: opts.wallet,
                  },
                ] satisfies Account[],
                wallet: opts.network,
              },
            },
            wallet: opts.wallet,
          } satisfies Wallet,
        };

        setState({
          wallets: newWallets,
        });
      },
      {
        balances: aOpts?.balances,
        network,
        wallet: aOpts?.wallet || WalletId.Keplr,
      },
    );
  }

  async showPopover(network: NetworkKey) {
    const isMobile = await this.page.evaluate(() => window.innerWidth < 500);

    if (isMobile) {
      await this.page.click(StakingPage.selectors.networkCard(network));
    } else {
      await this.page.hover(StakingPage.selectors.networkCard(network));
    }
  }
}

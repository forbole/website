import type { Page } from "@playwright/test";

import type {
  StakingNetworkId,
  TStakingContext,
} from "@src/screens/staking/lib/staking_sdk/core";
import { WalletId } from "@src/screens/staking/lib/staking_sdk/core";
import type { NetworkKey } from "@src/utils/network_info";

const networkCard = (network: NetworkKey) =>
  `[data-test="network-card-${network}"]`;

const selectors = {
  networkCard,
  popoverStakeButton: '[data-test="popover-stake-button"]',
  stakingCardLabel: '[data-test="staking-card-label"]',
};

const networksWithoutStaking: NetworkKey[] = ["sui", "agoric"];

const networksWithStaking: NetworkKey[] = [
  "akash",
  "cosmos",
  "dydx",
  "celestia",
];

export class StakingPage {
  static networksWithoutStaking = networksWithoutStaking;
  static networksWithStaking = networksWithStaking;
  static selectors = selectors;

  constructor(private page: Page) {}

  navigate() {
    return this.page.goto("/staking");
  }

  async setNetworkAccount(network: StakingNetworkId) {
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
                    networkId: opts.network,
                    walletId: opts.wallet,
                  },
                ],
                networkId: opts.network,
              },
            },
            wallet: opts.wallet,
          },
        };

        setState({
          wallets: newWallets,
        });
      },
      { network, wallet: WalletId.Keplr },
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

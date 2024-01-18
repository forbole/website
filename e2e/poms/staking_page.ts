import type { Page } from "@playwright/test";

const networkCard = (network: string) =>
  `[data-test="network-card-${network}"]`;

const selectors = {
  networkCard,
  stakingCardLabel: '[data-test="staking-card-label"]',
};

const networksWithoutStaking = ["sui", "agoric"];
const networksWithStaking = ["akash", "cosmos", "dydx", "celestia"];

export class StakingPage {
  static networksWithoutStaking = networksWithoutStaking;
  static networksWithStaking = networksWithStaking;
  static selectors = selectors;

  constructor(private page: Page) {}

  navigate() {
    return this.page.goto("/staking");
  }
}

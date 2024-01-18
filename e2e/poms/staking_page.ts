import type { Page } from "@playwright/test";

const networkCard = (network: string) =>
  `[data-test="network-card-${network}"]`;

const selectors = {
  networkCard,
  stakingCardLabel: '[data-test="staking-card-label"]',
};

export class StakingPage {
  static selectors = selectors;

  constructor(private page: Page) {}

  navigate() {
    return this.page.goto("/staking");
  }
}

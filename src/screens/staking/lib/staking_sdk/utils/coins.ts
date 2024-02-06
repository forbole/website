import type { Coin } from "@cosmjs/stargate";
import BigNumber from "bignumber.js";

import { CoinDenom, StakingNetworkId } from "../core";

export const networkToUnnormalisedDenom = {
  [StakingNetworkId.Akash]: "UAKT",
  [StakingNetworkId.Celestia]: "UTIA",
  [StakingNetworkId.CelestiaTestnet]: "UTIA",
  [StakingNetworkId.ComposableFinance]: "UPICA",
  [StakingNetworkId.CosmosHub]: "UATOM",
  [StakingNetworkId.CosmosHubTestnet]: "UATOM",
  [StakingNetworkId.DyDx]: "ADYDX",
  [StakingNetworkId.Osmosis]: "UOSMO",
  [StakingNetworkId.Regen]: "UREGEN",
} as const satisfies Record<StakingNetworkId, string>;

type DenomToNormalise = (typeof networkToUnnormalisedDenom)[StakingNetworkId];

const uExp = 6;
const aExp = 18;

const denomMap: Record<DenomToNormalise, [CoinDenom, number]> = {
  ADYDX: [CoinDenom.DYDX, aExp],
  UAKT: [CoinDenom.AKT, uExp],
  UATOM: [CoinDenom.ATOM, uExp],
  UOSMO: [CoinDenom.OSMO, uExp],
  UPICA: [CoinDenom.PICA, uExp],
  UREGEN: [CoinDenom.REGEN, uExp],
  UTIA: [CoinDenom.TIA, uExp],
};

export const normaliseCoin = (coin: Coin): Coin => {
  const compared = coin.denom?.toUpperCase();

  const parseNum = (exp: number) =>
    new BigNumber(coin.amount).dividedBy(new BigNumber(10).pow(exp)).toString();

  const [denom, exp] = denomMap[compared as DenomToNormalise] || [
    coin.denom,
    0,
  ];

  if (!denom) {
    throw new Error(`Unknown denom ${coin}`);
  }

  let { amount } = coin;

  if (compared !== denom.toUpperCase()) {
    amount = parseNum(exp);
  }

  return {
    amount,
    denom: denom.toUpperCase(),
  };
};

export const normaliseDenom = (denom: string): string =>
  normaliseCoin({ amount: "0", denom }).denom;

export const getEmptyCoin = (denom = ""): Coin => ({ amount: "0", denom });

export const sumCoins = (coinA?: Coin, coinB?: Coin): Coin =>
  [coinA, coinB]
    .filter((c): c is Coin => !!c?.denom)
    .map((c) => normaliseCoin(c))
    .reduce((acc, coin) => {
      const { amount } = acc;
      const { amount: amountB } = coin;

      if (acc.denom && coin.denom && acc.denom !== coin.denom) {
        console.error("Unexpected sum of different denoms", acc, coin);

        // Don't throw here for now
        return acc;
      }

      const newAmount = new BigNumber(amount).plus(amountB).toString();
      const denom = [acc.denom, coin.denom].find(Boolean) || "";

      return {
        amount: newAmount,
        denom,
      };
    }, getEmptyCoin());

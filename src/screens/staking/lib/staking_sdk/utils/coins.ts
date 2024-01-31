import type { Coin } from "@cosmjs/stargate";
import BigNumber from "bignumber.js";

import { CoinDenom, StakingNetworkId } from "../core";

export const networkToUnnormalisedDenom = {
  [StakingNetworkId.Akash]: "UAKT",
  [StakingNetworkId.Celestia]: "UTIA",
  [StakingNetworkId.CelestiaTestnet]: "UTIA",
  [StakingNetworkId.CosmosHub]: "UATOM",
  [StakingNetworkId.CosmosHubTestnet]: "UATOM",
  [StakingNetworkId.DyDx]: "ADYDX",
  [StakingNetworkId.Nois]: "UNOIS",
} as const satisfies Record<StakingNetworkId, string>;

type DenomToNormalise = (typeof networkToUnnormalisedDenom)[StakingNetworkId];

const uatomExp = 6;
const uaktExp = 6;
const utiaExp = 6;
const adydxExp = 18;
const unoisExp = 6;

const denomMap: Record<DenomToNormalise, [CoinDenom, number]> = {
  ADYDX: [CoinDenom.DYDX, adydxExp],
  UAKT: [CoinDenom.AKT, uaktExp],
  UATOM: [CoinDenom.ATOM, uatomExp],
  UNOIS: [CoinDenom.NOIS, unoisExp],
  UTIA: [CoinDenom.TIA, utiaExp],
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

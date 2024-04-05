import BigNumber from "bignumber.js";

import type { Coin } from "../core/base";
import { CoinDenom, StakingNetworkId } from "../core/base";

export const networkToUnnormalisedDenom = {
  [StakingNetworkId.Akash]: "UAKT",
  [StakingNetworkId.Celestia]: "UTIA",
  [StakingNetworkId.CelestiaTestnet]: "UTIA",
  [StakingNetworkId.ComposableFinance]: "PPICA",
  [StakingNetworkId.CosmosHub]: "UATOM",
  [StakingNetworkId.CosmosHubTestnet]: "UATOM",
  [StakingNetworkId.DyDx]: "ADYDX",
  [StakingNetworkId.Kava]: "UKAVA",
  [StakingNetworkId.KavaTestnet]: "UKAVA",
  [StakingNetworkId.Osmosis]: "UOSMO",
  [StakingNetworkId.Solana]: "LAMPORTS",
  [StakingNetworkId.SolanaDevnet]: "LAMPORTS",
  [StakingNetworkId.SolanaTestnet]: "LAMPORTS",
  [StakingNetworkId.Stargaze]: "USTARS",
  [StakingNetworkId.StargazeTestnet]: "USTARS",
} as const satisfies Record<StakingNetworkId, string>;

type DenomToNormalise = (typeof networkToUnnormalisedDenom)[StakingNetworkId];

export const unnormalisedDenomToNetwork = Object.entries(
  networkToUnnormalisedDenom,
).reduce(
  (acc, [k, v]) => {
    acc[v] = k as StakingNetworkId;

    return acc;
  },
  {} as Record<string, StakingNetworkId>,
);

const aExp = 18;
const pExp = 12;
const nExp = 9;
const uExp = 6;

const denomMap: Record<DenomToNormalise, [CoinDenom, number]> = {
  ADYDX: [CoinDenom.DYDX, aExp],
  LAMPORTS: [CoinDenom.SOL, nExp],
  PPICA: [CoinDenom.PICA, pExp],
  UAKT: [CoinDenom.AKT, uExp],
  UATOM: [CoinDenom.ATOM, uExp],
  UKAVA: [CoinDenom.KAVA, uExp],
  UOSMO: [CoinDenom.OSMO, uExp],
  USTARS: [CoinDenom.STARS, uExp],
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

export const getIsCoin = (val?: unknown): val is Coin =>
  typeof val === "object" &&
  val !== null &&
  "amount" in val &&
  "denom" in val &&
  typeof val.amount === "string" &&
  typeof val.denom === "string";

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

export const sumAllCoins = (coins: Coin[]): Coin =>
  (coins || []).reduce((acc, coin) => sumCoins(acc, coin), getEmptyCoin());

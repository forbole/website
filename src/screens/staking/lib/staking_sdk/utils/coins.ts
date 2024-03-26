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
  [StakingNetworkId.Dymension]: "ADYM",
  [StakingNetworkId.Evmos]: "AEVMOS",
  [StakingNetworkId.Injective]: "inj", // This is important to be lowercase, since inj != INJ
  [StakingNetworkId.IslamicCoin]: "AISLM",
  [StakingNetworkId.Kava]: "UKAVA",
  [StakingNetworkId.KavaTestnet]: "UKAVA",
  [StakingNetworkId.Osmosis]: "UOSMO",
  [StakingNetworkId.Stargaze]: "USTARS",
  [StakingNetworkId.StargazeTestnet]: "USTARS",
} as const satisfies Record<StakingNetworkId, string>;

type DenomToNormalise = (typeof networkToUnnormalisedDenom)[StakingNetworkId];

const uExp = 6;
const pExp = 12;
const aExp = 18;
const exp0 = 0;

const denomMap: Record<DenomToNormalise, [CoinDenom, number]> = {
  ADYDX: [CoinDenom.DYDX, aExp],
  ADYM: [CoinDenom.DYM, aExp],
  AEVMOS: [CoinDenom.EVMOS, aExp],
  AISLM: [CoinDenom.ISLM, aExp],
  // Because inj != INJ, this needs to keep the lower case, it is handled when
  // normalising the coin
  inj: [CoinDenom.INJ, exp0],
  PPICA: [CoinDenom.PICA, pExp],
  UAKT: [CoinDenom.AKT, uExp],
  UATOM: [CoinDenom.ATOM, uExp],
  UKAVA: [CoinDenom.KAVA, uExp],
  UOSMO: [CoinDenom.OSMO, uExp],
  USTARS: [CoinDenom.STARS, uExp],
  UTIA: [CoinDenom.TIA, uExp],
};

export const normaliseCoin = (coin: Coin): Coin => {
  // Special case where INJ != inj
  if (coin.denom === "inj") {
    return {
      amount: new BigNumber(coin.amount)
        .div(new BigNumber(10).pow(18))
        .toString(),
      denom: CoinDenom.INJ,
    };
  }

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

export const sumAllCoins = (coins: Coin[]): Coin =>
  (coins || []).reduce((acc, coin) => sumCoins(acc, coin), getEmptyCoin());

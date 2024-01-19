import type { Coin } from "@cosmjs/stargate";
import BigNumber from "bignumber.js";

import { CoinDenom, StakingNetworkId } from "../core";

const networkToUnnormalisedDenom = {
  [StakingNetworkId.Akash]: "uakt",
  [StakingNetworkId.Celestia]: "utia",
  [StakingNetworkId.CelestiaTestnet]: "utia",
  [StakingNetworkId.CosmosHub]: "uatom",
  [StakingNetworkId.CosmosHubTestnet]: "uatom",
  [StakingNetworkId.DyDx]: "adydx",
} as const satisfies Record<StakingNetworkId, string>;

type DenomToNormalise = (typeof networkToUnnormalisedDenom)[StakingNetworkId];

const uatomExp = 6;
const uaktExp = 6;
const utiaExp = 6;
const adydxExp = 18;

const denomMap: Record<DenomToNormalise, [CoinDenom, number]> = {
  adydx: [CoinDenom.DYDX, adydxExp],
  uakt: [CoinDenom.AKT, uaktExp],
  uatom: [CoinDenom.ATOM, uatomExp],
  utia: [CoinDenom.TIA, utiaExp],
};

export const normaliseCoin = (coin: Coin): Coin => {
  const compared = coin.denom?.toLowerCase() as DenomToNormalise;

  const parseNum = (exp: number) =>
    new BigNumber(coin.amount).dividedBy(new BigNumber(10).pow(exp)).toString();

  const [denom, exp] = denomMap[compared] || [coin.denom, 0];

  let { amount } = coin;

  if (compared !== denom.toLowerCase()) {
    amount = parseNum(exp);
  }

  return {
    amount,
    denom: denom.toUpperCase(),
  };
};

// @TODO: Improve multiple denoms handling, also maybe use bigint here
export const sumCoins = (coinA?: Coin, coinB?: Coin): Coin => ({
  amount: (Number(coinA?.amount || 0) + Number(coinB?.amount || 0)).toString(),
  denom: coinA?.denom || coinB?.denom || "",
});

export const getEmptyCoin = (denom = ""): Coin => ({ amount: "0", denom });

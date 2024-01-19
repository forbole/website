import type { Coin } from "@cosmjs/stargate";
import BigNumber from "bignumber.js";

import { CoinDenom, StakingNetworkId } from "../core";

const networkToResolvedDenom = {
  [StakingNetworkId.Akash]: "uakt",
  [StakingNetworkId.Celestia]: "utia",
  [StakingNetworkId.CelestiaTestnet]: "utia",
  [StakingNetworkId.CosmosHub]: "uatom",
  [StakingNetworkId.CosmosHubTestnet]: "uatom",
  [StakingNetworkId.DyDx]: "adydx",
} as const satisfies Record<StakingNetworkId, string>;

type DenomToResolve = (typeof networkToResolvedDenom)[StakingNetworkId];

export const uatomExp = 6;
export const uaktExp = 6;
export const utiaExp = 6;
export const adydxExp = 18;

const denomMap: Record<DenomToResolve, [CoinDenom, number]> = {
  adydx: [CoinDenom.DYDX, adydxExp],
  uakt: [CoinDenom.AKT, uaktExp],
  uatom: [CoinDenom.ATOM, uatomExp],
  utia: [CoinDenom.TIA, utiaExp],
};

export const resolveCoin = (coin: Coin): Coin => {
  const compared = coin.denom?.toLowerCase() as DenomToResolve;

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

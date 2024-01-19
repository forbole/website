import type { Coin } from "@cosmjs/stargate";
import BigNumber from "bignumber.js";

import { StakingNetworkId } from "../core";

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

export const resolveCoin = (coin: Coin): Coin => {
  const compared = coin.denom?.toLowerCase() as DenomToResolve;

  const parseNum = (exp: number) =>
    new BigNumber(coin.amount).dividedBy(new BigNumber(10 ** exp)).toString();

  switch (compared) {
    case "uatom": {
      return {
        amount: parseNum(uatomExp),
        denom: "ATOM",
      };
    }

    case "utia": {
      return {
        amount: parseNum(utiaExp),
        denom: "TIA",
      };
    }

    case "adydx": {
      return {
        amount: parseNum(adydxExp),
        denom: "DYDX",
      };
    }

    case "uakt": {
      return {
        amount: parseNum(uaktExp),
        denom: "AKT",
      };
    }

    default: {
      compared satisfies never;
    }
  }

  return {
    ...coin,
    denom: coin.denom?.toUpperCase(),
  };
};

// @TODO: Improve multiple denoms handling, also maybe use bigint here
export const sumCoins = (coinA?: Coin, coinB?: Coin): Coin => ({
  amount: (Number(coinA?.amount || 0) + Number(coinB?.amount || 0)).toString(),
  denom: coinA?.denom || coinB?.denom || "",
});

export const getEmptyCoin = (): Coin => ({ amount: "0", denom: "" });

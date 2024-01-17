import type { Coin } from "@cosmjs/stargate";

import type { Network } from "@src/utils/network_info";

import type { Account, NetworkInfo } from "./types";
import { networkNameToChainId } from "./types";

const uatomExp = 6;
const utiaExp = 6;
const adydxExp = 18;

type Denom = "adydx" | "uatom" | "utia";

export const resolveCoin = (coin: Coin): Coin => {
  const num = Number(coin.amount);

  if (Number.isNaN(num)) {
    return coin;
  }

  const compared = coin.denom?.toLowerCase() as Denom;

  switch (compared) {
    case "uatom": {
      return {
        amount: (num / 10 ** uatomExp).toString(),
        denom: "ATOM",
      };
    }

    case "utia": {
      return {
        amount: (num / 10 ** utiaExp).toString(),
        denom: "TIA",
      };
    }

    case "adydx": {
      return {
        amount: (num / 10 ** adydxExp).toString(),
        denom: "DYDX",
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

export const resolveDenom = (denom: string): string =>
  resolveCoin({ amount: "0", denom }).denom;

export const formatDenom = (coin: Coin): string => {
  if (!coin?.denom) {
    return "";
  }

  const resolvedCoin = resolveCoin(coin);
  const num = Number(resolvedCoin?.amount);

  if (Number.isNaN(num)) {
    return `- ${coin.denom.toUpperCase()}`;
  }

  const formatNum = (n: number): string =>
    n.toLocaleString("en-US", {
      maximumFractionDigits: 6,
      maximumSignificantDigits: 6,
      minimumFractionDigits: 1,
    });

  return `${formatNum(num)} ${resolvedCoin.denom}`;
};

export const sortAccounts = (a: Account, b: Account) => {
  if (a.chainId !== b.chainId) {
    return a.chainId.localeCompare(b.chainId);
  }

  return a.address.localeCompare(b.address);
};

export const sortNetworks = (a: Network, b: Network) => {
  const chainIdA = networkNameToChainId[a.graphql];
  const chainIdB = networkNameToChainId[b.graphql];

  if (chainIdA && !chainIdB) {
    return -1;
  }

  if (!chainIdA && chainIdB) {
    return 1;
  }

  return a.name.localeCompare(b.name);
};

export const getUnbondingTimeForNetwork = (
  networkInfo: NetworkInfo | null,
  locale?: string,
) => {
  if (!networkInfo) {
    return null;
  }

  const { unbonding_period: unbondingPeriod } = networkInfo;

  if (!unbondingPeriod) {
    return null;
  }

  const now = new Date();
  const days = Math.ceil(unbondingPeriod / 86400);
  const nextDate = new Date(now.getTime() + unbondingPeriod * 1000);

  const nextDateStr = nextDate.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return {
    date: nextDateStr,
    days,
  };
};

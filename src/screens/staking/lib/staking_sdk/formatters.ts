import type { Coin } from "@cosmjs/stargate";

import type { Network } from "@src/utils/network_info";

import type { NetworkInfo } from "./core";
import { networkNameToNetworkId } from "./core";
import { resolveCoin } from "./utils/coins";

export const resolveDenom = (denom: string): string =>
  resolveCoin({ amount: "0", denom }).denom;

export const formatCoin = (coin: Coin): string => {
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

export const sortNetworks = (a: Network, b: Network) => {
  const networkIdA = networkNameToNetworkId[a.graphql];
  const networkIdB = networkNameToNetworkId[b.graphql];

  if (networkIdA && !networkIdB) {
    return -1;
  }

  if (!networkIdA && networkIdB) {
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

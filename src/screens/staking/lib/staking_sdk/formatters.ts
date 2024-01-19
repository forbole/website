import type { Coin } from "@cosmjs/stargate";

import type { Network, NetworkKey } from "@src/utils/network_info";

import type { NetworkInfo } from "./core";
import { networkKeyToNetworkId } from "./core";
import { normaliseCoin } from "./utils/coins";
import { getCanStakeToAnyWallet } from "./wallet_operations";

export const normaliseDenom = (denom: string): string =>
  normaliseCoin({ amount: "0", denom }).denom;

export const formatCoin = (coin: Coin): string => {
  if (!coin?.denom) {
    return "";
  }

  const normalisedCoin = normaliseCoin(coin);
  const num = Number(normalisedCoin?.amount);

  if (Number.isNaN(num)) {
    return `- ${coin.denom.toUpperCase()}`;
  }

  const formatNum = (n: number): string =>
    n.toLocaleString("en-US", {
      maximumFractionDigits: 6,
      minimumFractionDigits: 2,
    });

  return `${formatNum(num)} ${normalisedCoin.denom}`;
};

export const sortNetworks = () => {
  const canStake = getCanStakeToAnyWallet();

  return (a: Network, b: Network) => {
    if (canStake) {
      const networkIdA = networkKeyToNetworkId[a.key as NetworkKey];
      const networkIdB = networkKeyToNetworkId[b.key as NetworkKey];

      if (networkIdA && !networkIdB) {
        return -1;
      }

      if (!networkIdA && networkIdB) {
        return 1;
      }
    }

    return a.name.localeCompare(b.name);
  };
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

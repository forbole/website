import type { Network, NetworkKey } from "@src/utils/network_info";

import type { NetworkInfo } from "../core";
import { networkKeyToNetworkId } from "../core";

export const sortNetworksByName = (a: Network, b: Network) => {
  const networkIdA = networkKeyToNetworkId[a.key as NetworkKey];
  const networkIdB = networkKeyToNetworkId[b.key as NetworkKey];

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
  const unbondingPeriodSeconds = parseInt(unbondingPeriod, 10);
  const days = Math.ceil(unbondingPeriodSeconds / 86400);
  const nextDate = new Date(now.getTime() + unbondingPeriodSeconds * 1000);

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

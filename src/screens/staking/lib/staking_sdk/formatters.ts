import type { Network } from "@src/utils/network_info";

import type { Account, NetworkInfo } from "./types";
import { networkNameToChainId } from "./types";

const uatomExp = 6;
const utiaExp = 6;
const adydxExp = 18;

export const resolveDenom = (denom: string): string => {
  if (!denom) {
    return "";
  }

  switch (denom?.toLowerCase()) {
    case "uatom": {
      return "ATOM";
    }

    case "utia": {
      return "TIA";
    }

    case "adydx": {
      return "DYDX";
    }
  }

  return denom.toUpperCase();
};

export const formatDenom = ({
  amount,
  denom,
}: {
  amount: string;
  denom: string;
}): string => {
  const num = Number(amount);

  const formatNum = (n: number): string =>
    n.toLocaleString("en-US", {
      maximumFractionDigits: 6,
      maximumSignificantDigits: 6,
      minimumFractionDigits: 1,
    });

  if (!denom) {
    return "";
  }

  if (Number.isNaN(num)) {
    return `- ${denom.toUpperCase()}`;
  }

  switch (denom?.toLowerCase()) {
    case "uatom": {
      return `${formatNum(num / 10 ** uatomExp)} ATOM`;
    }

    case "utia": {
      return `${formatNum(num / 10 ** utiaExp)} TIA`;
    }

    case "adydx": {
      return `${formatNum(num / 10 ** adydxExp)} DYDX`;
    }
  }

  return `${formatNum(num)} ${denom.toUpperCase()}`;
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

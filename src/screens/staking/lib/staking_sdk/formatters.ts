import type { Network } from "@src/utils/network_info";

import type { Account } from "./types";
import { networkNameToChainId } from "./types";

const formatNum = (num: number): string =>
  num.toLocaleString("en-US", {
    maximumFractionDigits: 6,
    minimumFractionDigits: 0,
  });

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

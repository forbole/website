import type { Network } from "@src/utils/network_info";

import type { Account } from "./types";
import { networkNameToChainId } from "./types";

const formatNum = (num: number): string =>
  num.toLocaleString("en-US", {
    maximumFractionDigits: 6,
    minimumFractionDigits: 0,
  });

const uatomExp = 6;

export const resolveDenom = (denom: string): string => {
  if (!denom) {
    return "";
  }

  switch (denom) {
    case "uatom": {
      return "ATOM";
    }
  }

  return denom.toUpperCase();
};

export const formatDenom = (denom: string, value: string): string => {
  const num = Number(value);

  if (!denom) {
    return "";
  }

  if (Number.isNaN(num)) {
    return `- ${denom.toUpperCase()}`;
  }

  switch (denom) {
    case "uatom": {
      return `${formatNum(num / 10 ** uatomExp)} ATOM`;
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

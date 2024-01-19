import type { Coin } from "@cosmjs/stargate";

import type { Account } from "../core";
import { normaliseCoin } from "./coins";

export const accountHasDelegations = (account?: Account): boolean =>
  !!account?.info?.delegation &&
  Object.keys(account.info.delegation).length > 0;

export const accountHasRewards = (account?: Account): boolean =>
  !!account?.rewards &&
  Array.isArray(account.rewards) &&
  account.rewards.length > 0;

export const filterUniqueAddresses = () => {
  const usedAddresses = new Set<string>();

  return (account: Account) => {
    if (usedAddresses.has(account.address)) {
      return false;
    }

    usedAddresses.add(account.address);

    return true;
  };
};

type NormalisedInfo = { coin: Coin; num: null | number } | null;

export const getAccountNormalisedDelegation = (
  account?: Account,
): NormalisedInfo => {
  if (!account?.info?.delegation) return null;

  const available = normaliseCoin(account.info.delegation);
  const availableNum = Number(available.amount);

  return {
    coin: available,
    num: Number.isNaN(availableNum) ? null : availableNum,
  };
};

export const getAccountNormalisedBalance = (
  account?: Account,
): NormalisedInfo => {
  if (!account?.info?.balances) return null;

  const balance = normaliseCoin(account.info.balances);
  const balanceNum = Number(balance.amount);

  return {
    coin: balance,
    num: Number.isNaN(balanceNum) ? null : balanceNum,
  };
};

export const sortAccounts = (a: Account, b: Account) => {
  if (a.networkId !== b.networkId) {
    return a.networkId.localeCompare(b.networkId);
  }

  return a.address.localeCompare(b.address);
};

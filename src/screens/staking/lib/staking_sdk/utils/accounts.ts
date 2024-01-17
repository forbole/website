import type { Coin } from "@cosmjs/stargate";

import type { Account } from "../types";
import { resolveCoin } from "./coins";

export const accountHasDelegations = (account?: Account): boolean =>
  !!account?.info?.delegation;

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

export const getAccountResolvedDelegation = (account?: Account) => {
  if (!account?.info) return null;

  const available = resolveCoin(account.info.delegation);
  const availableNum = Number(available.amount);

  return Number.isNaN(availableNum) ? null : availableNum;
};

export const getAccountResolvedBalance = (
  account?: Account,
): { coin: Coin; num: null | number } | null => {
  if (!account?.info) return null;

  const balance = resolveCoin(account.info.balances);
  const balanceNum = Number(balance.amount);

  return {
    coin: balance,
    num: Number.isNaN(balanceNum) ? null : balanceNum,
  };
};

export const sortAccounts = (a: Account, b: Account) => {
  if (a.chainId !== b.chainId) {
    return a.chainId.localeCompare(b.chainId);
  }

  return a.address.localeCompare(b.address);
};

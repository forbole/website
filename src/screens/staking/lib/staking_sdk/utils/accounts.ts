import type { Coin } from "@cosmjs/stargate";
import BigNumber from "bignumber.js";

import type { Account } from "../core";
import { testnetNetworks } from "../core";
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
    if (usedAddresses.has(account.address + account.networkId)) {
      return false;
    }

    usedAddresses.add(account.address + account.networkId);

    return true;
  };
};

export const filterOutTestnets = (account: Account) =>
  !testnetNetworks.has(account.networkId);

type NormalisedInfo = { coin: Coin; num: BigNumber } | null;

export const getAccountNormalisedDelegation = (
  account?: Account,
): NormalisedInfo => {
  if (!account?.info?.delegation) return null;

  const available = normaliseCoin(account.info.delegation);

  return {
    coin: available,
    num: new BigNumber(available.amount),
  };
};

export const getAccountNormalisedBalance = (
  account?: Account,
): NormalisedInfo => {
  if (!account?.info?.balances) return null;

  const balance = normaliseCoin(account.info.balances);

  return {
    coin: balance,
    num: new BigNumber(balance.amount),
  };
};

export const sortAccounts = (a: Account, b: Account) => {
  if (a.networkId !== b.networkId) {
    return a.networkId.localeCompare(b.networkId);
  }

  return a.address.localeCompare(b.address);
};
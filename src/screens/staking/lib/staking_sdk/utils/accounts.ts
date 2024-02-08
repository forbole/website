import type { Coin } from "@cosmjs/stargate";
import BigNumber from "bignumber.js";

import { getNetworkInfo } from "@src/utils/network_info";

import type { Account } from "../core";
import { networkIdToNetworkKey, testnetNetworks } from "../core";
import { normaliseCoin, sumAllCoins, sumCoins } from "./coins";
import { sortNetworksByName } from "./networks";

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
  const delegationProp = account?.info?.delegation;

  const delegation = Array.isArray(delegationProp)
    ? sumAllCoins(delegationProp)
    : delegationProp;

  if (!delegation?.denom) return null;

  const available = normaliseCoin(delegation);

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

export const getClaimableRewardsForAccount = (start: Coin, account: Account) =>
  (Array.isArray(account.rewards) ? account.rewards : []).reduce(
    (acc2, reward) => {
      if (start.denom?.toUpperCase() === reward.denom?.toUpperCase()) {
        return sumCoins(acc2, reward);
      }

      return acc2;
    },
    start,
  );

export const sortAccountsByNetworkName = (a: Account, b: Account) => {
  if (a.networkId === b.networkId) {
    return a.address.localeCompare(b.address);
  }

  const networkAKey = networkIdToNetworkKey[a.networkId];
  const networkBKey = networkIdToNetworkKey[b.networkId];

  const networkA = getNetworkInfo(networkAKey);
  const networkB = getNetworkInfo(networkBKey);

  return sortNetworksByName(networkA, networkB);
};

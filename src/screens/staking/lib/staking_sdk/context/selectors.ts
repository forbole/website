import type { Coin } from "@cosmjs/proto-signing";
import BigNumber from "bignumber.js";

import type {
  Account,
  CoinDenom,
  StakingNetworkId,
  State,
  WalletId,
} from "../core";
import { mainNetworkDenom, walletsSupported } from "../core";
import {
  filterOutTestnets,
  filterUniqueAddresses,
  sortAccounts,
} from "../utils/accounts";
import { getEmptyCoin, normaliseCoin, sumCoins } from "../utils/coins";
import { doesWalletSupportNetwork } from "../wallet_operations";

// This functions are only intended to be used for extracting data, so they
// should not be setting the state. Also they should be synchronous functions.

export const getSelectedAccount = (state: State) => {
  const { selectedAccount } = state;

  if (!selectedAccount) {
    return undefined;
  }

  const { address, networkId, wallet } = selectedAccount;

  return state?.wallets?.[wallet]?.networks?.[networkId]?.accounts?.find(
    (a) => a.address === address,
  );
};

export const getWalletAccounts = (
  state: State,
  walletId: WalletId,
): Account[] => {
  const wallet = state.wallets[walletId];

  return Object.values(wallet?.networks || {})
    .reduce((acc, chain) => {
      acc.push(...chain.accounts);

      return acc;
    }, [] as Account[])
    .sort(sortAccounts);
};

export const getCanAddWallet = (state: State) => {
  const { wallets } = state;

  const connectedWallets = new Set(Object.keys(wallets));

  return (
    Array.from(walletsSupported).filter(
      (wallet) => !connectedWallets.has(wallet),
    ).length > 0
  );
};

export const getAccountsForNetwork = (
  state: State,
  network: StakingNetworkId,
) => {
  const wallets = Object.values(state.wallets);

  return wallets.reduce(
    (acc, wallet) => [
      ...acc,
      ...(wallet.networks?.[network]?.accounts || []).filter(filterOutTestnets),
    ],
    [] as Account[],
  );
};

export const getStakedDataForNetwork = (
  state: State,
  network: StakingNetworkId,
): Coin | null => {
  const accountsForNetwork = getAccountsForNetwork(state, network);

  if (!accountsForNetwork.length) {
    return null;
  }

  const mainDenom = mainNetworkDenom[network];

  return accountsForNetwork
    .filter(filterUniqueAddresses())
    .reduce(
      (acc, account) => sumCoins(acc, account.info?.delegation),
      getEmptyCoin(mainDenom || undefined),
    );
};

export type NetworkClaimableRewards = Coin | null;

// This assumes that the rewards coins have been normalized (which happens in
// the staking client)
export const getClaimableRewardsForNetwork = (
  state: State,
  network: StakingNetworkId,
): NetworkClaimableRewards => {
  const accountsForNetwork = getAccountsForNetwork(state, network);

  if (!accountsForNetwork.length) {
    return null;
  }

  const denom = mainNetworkDenom[network];

  if (!denom) {
    return null;
  }

  return accountsForNetwork.filter(filterUniqueAddresses()).reduce(
    (acc, account) =>
      (Array.isArray(account.rewards) ? account.rewards : []).reduce(
        (acc2, reward) => {
          if (denom?.toUpperCase() === reward.denom?.toUpperCase()) {
            const existingAmount = new BigNumber(acc2.amount);
            const amount = new BigNumber(reward.amount);

            return {
              amount: existingAmount.plus(amount).toString(),
              denom: acc2.denom,
            };
          }

          return acc2;
        },
        acc,
      ),
    getEmptyCoin(denom.toUpperCase()),
  );
};

export const getHasConnectedWallets = (state: State) =>
  Object.keys(state.wallets).length > 0;

export const getNetworkVotingPower = (
  state: State,
  network: StakingNetworkId,
): Coin | null => {
  const networkInfo = state.networksInfo[network];

  if (!networkInfo) return null;

  const mainDenom = mainNetworkDenom[network];

  if (!mainDenom) return null;

  const { voting_power: votingPower } = networkInfo;

  if (!votingPower) return null;

  return {
    amount: votingPower.toString(),
    denom: mainDenom,
  };
};

export const getHasNetworkSupportedWallet = (
  state: State,
  network: StakingNetworkId,
) =>
  Object.keys(state.wallets).some((walletId) =>
    doesWalletSupportNetwork(walletId as WalletId, network),
  );

export const getAllAccounts = (state: State) =>
  Object.values(state.wallets).reduce(
    (acc, wallet) => [
      ...acc,
      ...Object.values(wallet.networks).reduce(
        (acc2, network) => [...acc2, ...network.accounts],
        [] as Account[],
      ),
    ],
    [] as Account[],
  );

export const getAllStaked = (
  state: State,
  accountsProp?: Account[],
): number => {
  const accounts = accountsProp || getAllAccounts(state);

  const uniqueMainnetAccounts = accounts
    .filter(filterUniqueAddresses())
    .filter(filterOutTestnets);

  return uniqueMainnetAccounts.reduce((acc, account) => {
    const delegation = account.info?.delegation;

    if (!delegation) return acc;

    const normalised = normaliseCoin(delegation);

    const coinPrice = state.coinsPrices[normalised.denom as CoinDenom];

    if (!coinPrice || Number(coinPrice) < 0) return acc;

    const newValue = new BigNumber(normalised.amount)
      .times(coinPrice)
      .toNumber();

    return acc + newValue;
  }, 0);
};

export const getAllRewards = (state: State, accountsProp?: Account[]) => {
  const accounts = accountsProp || getAllAccounts(state);

  const uniqueMainnetAccounts = accounts
    .filter(filterUniqueAddresses())
    .filter(filterOutTestnets);

  return uniqueMainnetAccounts.reduce((acc, account) => {
    const { rewards } = account;

    if (!rewards) return acc;

    const newValue = rewards.reduce((acc2, reward) => {
      const normalised = normaliseCoin(reward);

      const coinPrice = state.coinsPrices[normalised.denom as CoinDenom];

      if (!coinPrice || Number(coinPrice) < 0) return acc2;

      return new BigNumber(normalised.amount).times(coinPrice).toNumber();
    }, 0);

    return acc + newValue;
  }, 0);
};

export const getCoinPriceForNetwork = (
  state: State,
  networkId: StakingNetworkId,
) => {
  const mainDenom = mainNetworkDenom[networkId];

  if (!mainDenom) return null;

  const coinPrice = state.coinsPrices[mainDenom];

  if (!coinPrice || Number(coinPrice) < 0) return null;

  return coinPrice;
};

import BigNumber from "bignumber.js";

import type { Account, StakingState } from "../core";
import { walletsSupported } from "../core";
import type { Coin, CoinDenom, StakingNetworkId, WalletId } from "../core/base";
import { mainNetworkDenom } from "../core/base";
import type { StakeAccount } from "../staking_client_types";
import {
  filterUniqueAddresses,
  getClaimableRewardsForAccount,
} from "../utils/accounts";
import {
  getEmptyCoin,
  networkToUnnormalisedDenom,
  normaliseCoin,
  sumAllCoins,
  sumCoins,
} from "../utils/coins";
import { doesWalletSupportNetwork } from "../wallet_operations";

// This functions are only intended to be used for extracting data, so they
// should not be setting the state. Also they should be synchronous functions.

export const getSelectedAccount = (state: StakingState) => {
  const { selectedAccount } = state;

  if (!selectedAccount) {
    return undefined;
  }

  const { address, networkId, wallet } = selectedAccount;

  return state?.wallets?.[wallet]?.networks?.[networkId]?.accounts?.find(
    (a) => a.address === address,
  );
};

export const getCanAddWallet = (state: StakingState) => {
  const { wallets } = state;

  const connectedWallets = new Set(Object.keys(wallets));

  return (
    Array.from(walletsSupported).filter(
      (wallet) => !connectedWallets.has(wallet),
    ).length > 0
  );
};

export const getAccountsForNetwork = (
  state: StakingState,
  network: StakingNetworkId,
) => {
  const wallets = Object.values(state.wallets);

  return wallets.reduce(
    (acc, wallet) => [...acc, ...(wallet.networks?.[network]?.accounts || [])],
    [] as Account[],
  );
};

export const getStakeAccountsForNetwork = (
  state: StakingState,
  network: StakingNetworkId,
  parentAddress?: string,
) => {
  const accounts = getAccountsForNetwork(state, network);
  const uniqueAccounts = new Set<string>();

  return accounts
    .filter(parentAddress ? (acc) => acc.address === parentAddress : () => true)
    .map((account) => account.info?.stakeAccounts)
    .flat()
    .filter((a): a is StakeAccount => !!a)
    .filter((a) => {
      if (uniqueAccounts.has(a.address)) {
        return false;
      }

      uniqueAccounts.add(a.address);

      return true;
    });
};

export const getStakedDataForNetwork = (
  state: StakingState,
  network: StakingNetworkId,
): Coin | null => {
  const accountsForNetwork = getAccountsForNetwork(state, network);

  if (!accountsForNetwork.length) {
    return null;
  }

  const mainDenom = mainNetworkDenom[network];

  return accountsForNetwork.filter(filterUniqueAddresses()).reduce(
    (acc, account) => {
      const delegationProp = account.info?.delegation;

      const delegation = Array.isArray(delegationProp)
        ? sumAllCoins(delegationProp)
        : delegationProp;

      return sumCoins(acc, delegation || undefined);
    },
    getEmptyCoin(mainDenom || undefined),
  );
};

export type NetworkClaimableRewards = Coin | null;

// This assumes that the rewards coins have been normalized (which happens in
// the staking client)
export const getClaimableRewardsForNetwork = (
  state: StakingState,
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

  return accountsForNetwork
    .filter(filterUniqueAddresses())
    .reduce(
      (acc, account) => getClaimableRewardsForAccount(acc, account),
      getEmptyCoin(denom.toUpperCase()),
    );
};

export type RewardMap = Record<string, Coin>;

export const getRewardsByAddressForNetwork = (
  state: StakingState,
  network: StakingNetworkId,
): null | RewardMap => {
  const accounts = getAccountsForNetwork(state, network);

  if (!accounts?.length) {
    return null;
  }

  return accounts.filter(filterUniqueAddresses()).reduce((acc, account) => {
    const { rewards } = account;

    if (Array.isArray(rewards)) {
      rewards.forEach((reward) => {
        if (!reward.address) return;

        acc[reward.address] = reward.coin;
      });
    }

    return acc;
  }, {} as RewardMap);
};

type UnbondingTokensResult = { coin: Coin; period: string } | null;

export const getUnbondingTokensForNetwork = (
  state: StakingState,
  network: StakingNetworkId,
): UnbondingTokensResult => {
  const accountsForNetwork = getAccountsForNetwork(state, network);

  return accountsForNetwork
    .filter(filterUniqueAddresses())
    .reduce((acc, account) => {
      if (!account.info?.unbonding?.length) {
        return acc;
      }

      const { unbonding } = account.info;

      const denom = networkToUnnormalisedDenom[account.networkId];

      return unbonding.reduce((acc2, unbondingInfo) => {
        const baseCoin = acc2 ? acc2.coin : getEmptyCoin(denom);
        const basePeriod = acc2 ? acc2.period : "";

        const newCoin = sumCoins(baseCoin, {
          amount: unbondingInfo.balance,
          denom,
        });

        if (!unbondingInfo.completion_time)
          return {
            coin: newCoin,
            period: basePeriod,
          };

        const itemPeriod = unbondingInfo.completion_time.seconds;

        const newPeriod = new BigNumber(basePeriod).isGreaterThan(itemPeriod)
          ? basePeriod
          : itemPeriod;

        return {
          coin: newCoin,
          period: newPeriod,
        };
      }, acc);
    }, null as UnbondingTokensResult);
};

export const getHasConnectedWallets = (state: StakingState) =>
  Object.keys(state.wallets).length > 0;

export const getHasConnectedWallet = (
  state: StakingState,
  walletId: WalletId,
) => state.wallets[walletId] !== undefined;

export const getNetworkVotingPower = (
  state: StakingState,
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

export const getNetworkTVL = (
  state: StakingState,
  network: StakingNetworkId,
): BigNumber | null => {
  const votingPower = getNetworkVotingPower(state, network);

  if (!votingPower) return null;

  const mainDenom = mainNetworkDenom[network];

  if (!mainDenom) return null;

  const coinPrice = state.coinsPrices[mainDenom];

  if (!coinPrice || Number(coinPrice) < 0) return null;

  return new BigNumber(votingPower.amount).times(coinPrice);
};

export const getHasNetworkSupportedWallet = (
  state: StakingState,
  network: StakingNetworkId,
) =>
  Object.keys(state.wallets).some((walletId) =>
    doesWalletSupportNetwork(walletId as WalletId, network),
  );

export const getAllAccounts = (state: StakingState) =>
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
  state: StakingState,
  accountsProp?: Account[],
): number => {
  const accounts = accountsProp || getAllAccounts(state);

  const uniqueAccounts = accounts.filter(filterUniqueAddresses());

  return uniqueAccounts.reduce((acc, account) => {
    const delegationProp = account.info?.delegation;

    const delegation = Array.isArray(delegationProp)
      ? sumAllCoins(delegationProp)
      : delegationProp;

    if (!delegation?.denom) return acc;

    const normalised = normaliseCoin(delegation);

    const coinPrice = state.coinsPrices[normalised.denom as CoinDenom];

    if (!coinPrice || Number(coinPrice) < 0) return acc;

    const newValue = new BigNumber(normalised.amount)
      .times(coinPrice)
      .toNumber();

    return acc + newValue;
  }, 0);
};

export const getAllRewards = (
  state: StakingState,
  accountsProp?: Account[],
) => {
  const accounts = accountsProp || getAllAccounts(state);

  const uniqueAccounts = accounts.filter(filterUniqueAddresses());

  return uniqueAccounts.reduce((acc, account) => {
    const { rewards } = account;

    if (!rewards) return acc;

    const newValue = rewards.reduce((acc2, reward) => {
      const normalised = normaliseCoin(reward.coin);

      const coinPrice = state.coinsPrices[normalised.denom as CoinDenom];

      if (!coinPrice || Number(coinPrice) < 0) return acc2;

      return new BigNumber(normalised.amount).times(coinPrice).toNumber();
    }, 0);

    return acc + newValue;
  }, 0);
};

export const getCoinPriceForNetwork = (
  state: StakingState,
  networkId: StakingNetworkId,
) => {
  const mainDenom = mainNetworkDenom[networkId];

  if (!mainDenom) return null;

  const coinPrice = state.coinsPrices[mainDenom];

  if (!coinPrice || Number(coinPrice) < 0) return null;

  return coinPrice;
};

export const getWalletCustomName = (state: StakingState, walletId: WalletId) =>
  state.wallets[walletId]?.name;

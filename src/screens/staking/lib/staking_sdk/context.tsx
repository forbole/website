import type { Coin } from "@cosmjs/stargate";
import BigNumber from "bignumber.js";
import type { PropsWithChildren } from "react";
import { createContext, useContext, useMemo, useRef, useState } from "react";

import {
  ENABLE_TESTNETS,
  WalletId,
  mainNetworkDenom,
  networksWithStaking,
  testnetNetworks,
  walletsSupported,
} from "./core";
import type {
  Account,
  CoinDenom,
  NetworkInfo,
  StakingNetworkId,
  State,
  Wallet,
} from "./core";
import { geckoClient } from "./gecko_client";
import { stakingClient } from "./staking_client";
import {
  filterOutTestnets,
  filterUniqueAddresses,
  sortAccounts,
} from "./utils/accounts";
import { getEmptyCoin, normaliseCoin, sumCoins } from "./utils/coins";
import { setConnectedWallet } from "./utils/storage";
import {
  disconnecKeplr,
  doesWalletSupportNetwork,
  useWalletsListeners,
} from "./wallet_operations";

type SetState = (state: ((s: State) => State) | Partial<State>) => void;

export type TStakingContext = {
  setState: SetState;
  state: State;
};

const defaultState: State = {
  coinsPrices: {},
  hasInit: false,
  networksInfo: {},
  selectedAccount: null,
  selectedAction: null,
  wallets: {},
};

const baseContext: TStakingContext = {
  setState: () => {},
  state: defaultState,
};

export const StakingContext = createContext(baseContext);

export const StakingProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<State>(baseContext.state);

  const contextValue = useMemo(() => {
    const wrappedSetState: SetState = (newState) => {
      if (typeof newState === "function") {
        setState(newState);

        return;
      }

      setState((prevState) => ({ ...prevState, ...newState }));
    };

    return {
      setState: wrappedSetState,
      state,
    };
  }, [state, setState]);

  useWalletsListeners(contextValue);

  return (
    <StakingContext.Provider value={contextValue}>
      {children}
    </StakingContext.Provider>
  );
};

export const useStakingRef = () => {
  const { setState, state } = useContext(StakingContext);

  const stakingRef = useRef({} as TStakingContext);

  stakingRef.current.state = state;
  stakingRef.current.setState = setState;

  return stakingRef;
};

// Actions

export const fetchNetworksInfo = async (setState: SetState) => {
  const stakingNetworksInfo = await Promise.all(
    Array.from(networksWithStaking)
      .filter(ENABLE_TESTNETS ? () => true : (n) => !testnetNetworks.has(n))
      .map((networkId) =>
        stakingClient.getStakingInfo(networkId).then((info) => ({
          info,
          networkId,
        })),
      ),
  );

  setState((state) => ({
    ...state,
    networksInfo: {
      ...state.networksInfo,
      ...stakingNetworksInfo.reduce(
        (acc, { info, networkId }) => ({
          ...acc,
          [networkId]: info,
        }),
        {},
      ),
    },
  }));
};

const networkInfoRequests: {
  [key in StakingNetworkId]?: Promise<NetworkInfo>;
} = {};

export const getNetworkStakingInfo = async (
  context: TStakingContext,
  networkId: StakingNetworkId,
) => {
  const { setState, state } = context;

  if (state.networksInfo[networkId])
    return state.networksInfo[networkId] as NetworkInfo;

  const request = networkInfoRequests[networkId];

  if (request) return request;

  const newRequest = stakingClient.getStakingInfo(networkId).then((newInfo) => {
    setState((prevState) => ({
      ...prevState,
      networksInfo: {
        ...prevState.networksInfo,
        [networkId]: newInfo,
      },
    }));

    networkInfoRequests[networkId] = undefined;

    return newInfo as NetworkInfo;
  });

  networkInfoRequests[networkId] = newRequest;

  return newRequest;
};

const coinPriceRequests: { [key in CoinDenom]?: Promise<string> } = {};

const getCoinPrice = async (
  context: TStakingContext,
  denom: CoinDenom,
): Promise<string> => {
  const { setState, state } = context;

  const coinPrice = state.coinsPrices[denom];

  if (coinPrice) return coinPrice;

  const coinRequest = coinPriceRequests[denom];

  if (coinRequest) return coinRequest;

  const newRequest = geckoClient.getCoinPrice(denom).then((price): string => {
    setState((prevState) => ({
      ...prevState,
      coinsPrices: {
        ...prevState.coinsPrices,
        [denom]: price,
      },
    }));

    coinPriceRequests[denom] = undefined;

    return price;
  });

  coinPriceRequests[denom] = newRequest;

  return newRequest;
};

export const getCoinPriceForNetwork = async (
  context: TStakingContext,
  networkId: StakingNetworkId | undefined,
) => {
  if (!networkId) return;

  const parsedDenom = mainNetworkDenom[networkId];

  const { coinsPrices } = context.state;

  if (parsedDenom && !coinsPrices[parsedDenom]) {
    (async () => {
      await getCoinPrice(context, parsedDenom);
    })();
  }
};

export const setUserWallet = (
  context: TStakingContext,
  walletName: WalletId,
  wallet: Wallet,
) => {
  const { setState, state } = context;

  setState({
    wallets: {
      ...state.wallets,
      [walletName]: wallet,
    },
  });
};

export const setSelectedAccount = (
  setState: SetState,
  selectedAction: State["selectedAction"],
  selectedAccount: State["selectedAccount"],
) => {
  setState({
    selectedAccount: selectedAccount
      ? {
          address: selectedAccount.address,
          networkId: selectedAccount.networkId,
          wallet: selectedAccount.wallet,
        }
      : selectedAccount,
    selectedAction,
  });
};

export const syncAccountData = async (
  context: TStakingContext,
  account: Account,
) => {
  const { setState, state } = context;
  const { address, networkId, wallet: walletId } = account;

  const [info, rewards] = await Promise.all([
    stakingClient.getAddressInfo(networkId, address),
    stakingClient.getRewardsInfo(networkId, address),
  ]);

  const newWallet: Wallet = {
    ...state.wallets[walletId],
    networks: {
      ...state.wallets[walletId]?.networks,
      [networkId]: {
        accounts: [
          ...(
            state.wallets[walletId]?.networks?.[networkId]?.accounts || []
          ).filter((a) => a.address !== address),
          {
            ...account,
            info,
            rewards,
          },
        ].sort(sortAccounts),
      },
    },
    wallet: walletId,
  };

  const newWallets = {
    ...state.wallets,
    [walletId]: newWallet,
  };

  setState({
    wallets: newWallets,
  });
};

export const disconnectWallet = async (
  context: TStakingContext,
  walletId: WalletId,
) => {
  const { setState, state } = context;

  if (state.wallets[walletId]) {
    const networks = Object.keys(
      state.wallets[WalletId.Keplr]?.networks || {},
    ) as StakingNetworkId[];

    switch (walletId) {
      case WalletId.Keplr: {
        await disconnecKeplr(networks);

        break;
      }

      default:
        walletId satisfies never;
    }

    const newWallets = { ...state.wallets };

    delete newWallets[walletId];

    setState({
      wallets: newWallets,
    });

    setConnectedWallet(Object.keys(walletId) as WalletId[]);
  }
};

// Selectors (don't set new state)

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
          if (denom?.toLowerCase() === reward.denom?.toLowerCase()) {
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

    const denom = normalised.denom.toLowerCase() as CoinDenom;
    const coinPrice = state.coinsPrices[denom];

    if (!coinPrice) return acc;

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

      const denom = normalised.denom.toLowerCase() as CoinDenom;
      const coinPrice = state.coinsPrices[denom];

      if (!coinPrice) return acc2;

      return new BigNumber(normalised.amount).times(coinPrice).toNumber();
    }, 0);

    return acc + newValue;
  }, 0);
};

import type { Coin } from "@cosmjs/stargate";
import { identity } from "ramda";
import type { PropsWithChildren } from "react";
import { createContext, useContext, useMemo, useRef, useState } from "react";

import type {
  Account,
  NetworkInfo,
  SetState,
  StakingNetworkId,
  State,
  TStakingContext,
  Wallet,
} from "./core";
import {
  ENABLE_TESTNETS,
  WalletId,
  defaultState,
  networksWithStaking,
  testnetNetworks,
  walletsSupported,
} from "./core";
import { stakingClient } from "./staking_client";
import { filterUniqueAddresses, sortAccounts } from "./utils/accounts";
import { getEmptyCoin, sumCoins } from "./utils/coins";
import { setConnectedWallet } from "./utils/storage";
import { useWalletsListeners } from "./wallet_operations";

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
      .filter(ENABLE_TESTNETS ? identity : (n) => !testnetNetworks.has(n))
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

export const getNetworkStakingInfo = async (
  setState: SetState,
  state: State,
  networkId: StakingNetworkId,
) => {
  if (state.networksInfo[networkId]) {
    return state.networksInfo[networkId] as NetworkInfo;
  }

  const newInfo = await stakingClient.getStakingInfo(networkId);

  setState((prevState) => ({
    ...prevState,
    networksInfo: {
      ...prevState.networksInfo,
      [networkId]: newInfo,
    },
  }));

  return newInfo as NetworkInfo;
};

export const setUserWallet = (
  state: State,
  setState: SetState,
  walletName: WalletId,
  wallet: Wallet,
) => {
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
  setState: SetState,
  state: State,
  account: Account,
) => {
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
  setState: SetState,
  state: State,
  walletId: WalletId,
) => {
  if (state.wallets[walletId]) {
    switch (walletId) {
      case WalletId.Keplr: {
        const networks = Object.keys(
          state.wallets[WalletId.Keplr]?.networks || {},
        );

        await window.keplr?.disable(networks).catch((err) => {
          // eslint-disable-next-line no-console
          console.log("Disable Error", err);
        });

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

// Selectors

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
    (acc, wallet) => [...acc, ...(wallet.networks?.[network]?.accounts || [])],
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

  return accountsForNetwork
    .filter(filterUniqueAddresses())
    .reduce(
      (acc, account) => sumCoins(acc, account.info?.delegation),
      getEmptyCoin(),
    );
};

export const getClaimableRewardsForNetwork = (
  state: State,
  network: StakingNetworkId,
): Coin | null => {
  const accountsForNetwork = getAccountsForNetwork(state, network);

  if (!accountsForNetwork.length) {
    return null;
  }

  return accountsForNetwork
    .filter(filterUniqueAddresses())
    .reduce(
      (acc, account) =>
        (Array.isArray(account.rewards) ? account.rewards : []).reduce(
          (acc2, reward) => sumCoins(acc2, reward),
          acc,
        ),
      getEmptyCoin(),
    );
};

export const getHasConnectedWallets = (state: State) =>
  Object.keys(state.wallets).length > 0;

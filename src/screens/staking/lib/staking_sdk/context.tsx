import type { Coin } from "@cosmjs/stargate";
import { identity } from "ramda";
import type { PropsWithChildren } from "react";
import { createContext, useContext, useMemo, useRef, useState } from "react";

import { stakingClient } from "./staking_client";
import type {
  Account,
  ChainId,
  NetworkInfo,
  SetState,
  State,
  TStakingContext,
  Wallet,
} from "./types";
import {
  ENABLE_TESTNETS,
  WalletId,
  defaultState,
  networksWithStaking,
  testnetNetworks,
  walletsSupported,
} from "./types";
import { filterUniqueAddresses, sortAccounts } from "./utils/accounts";
import { getEmptyCoin, sumCoins } from "./utils/coins";
import { clearConnectedWallets } from "./utils/storage";
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
      .map((chainId) =>
        stakingClient.getStakingInfo(chainId).then((info) => ({
          chainId,
          info,
        })),
      ),
  );

  setState((state) => ({
    ...state,
    networksInfo: {
      ...state.networksInfo,
      ...stakingNetworksInfo.reduce(
        (acc, { chainId, info }) => ({
          ...acc,
          [chainId]: info,
        }),
        {},
      ),
    },
  }));
};

export const getNetworkStakingInfo = async (
  setState: SetState,
  state: State,
  chainId: ChainId,
) => {
  if (state.networksInfo[chainId]) {
    return state.networksInfo[chainId] as NetworkInfo;
  }

  const newInfo = await stakingClient.getStakingInfo(chainId);

  setState((prevState) => ({
    ...prevState,
    networksInfo: {
      ...prevState.networksInfo,
      [chainId]: newInfo,
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
          chainId: selectedAccount.chainId,
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
  const { address, chainId, wallet: walletId } = account;

  const [info, rewards] = await Promise.all([
    stakingClient.getAddressInfo(chainId, address),
    stakingClient.getRewardsInfo(chainId, address),
  ]);

  const newWallet: Wallet = {
    ...state.wallets[walletId],
    networks: {
      ...state.wallets[walletId]?.networks,
      [chainId]: {
        accounts: [
          ...(
            state.wallets[walletId]?.networks?.[chainId]?.accounts || []
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

export const disconnectAllWallets = async (
  setState: SetState,
  state: State,
) => {
  const wallets = Object.keys(state.wallets) as WalletId[];

  await Promise.all(
    wallets.map(async (wallet) => {
      switch (wallet) {
        case WalletId.Keplr: {
          const networks = Object.keys(
            state.wallets[WalletId.Keplr]?.networks || {},
          );

          await window.keplr?.disable(networks).catch((err) => {
            // eslint-disable-next-line no-console
            console.log("Disable Error", err);
          });

          return;
        }

        default:
          wallet satisfies never;
      }
    }),
  );

  setState({
    wallets: {},
  });

  clearConnectedWallets();
};

// Selectors

export const getSelectedAccount = (state: State) => {
  const { selectedAccount } = state;

  if (!selectedAccount) {
    return undefined;
  }

  const { address, chainId, wallet } = selectedAccount;

  return state?.wallets?.[wallet]?.networks?.[chainId]?.accounts?.find(
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

export const getAccountsForNetwork = (state: State, network: ChainId) => {
  const wallets = Object.values(state.wallets);

  return wallets.reduce(
    (acc, wallet) => [...acc, ...(wallet.networks?.[network]?.accounts || [])],
    [] as Account[],
  );
};

export const getStakedDataForNetwork = (
  state: State,
  network: ChainId,
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
  network: ChainId,
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

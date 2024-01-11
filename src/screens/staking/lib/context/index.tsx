import type { PropsWithChildren } from "react";
import { createContext, useMemo, useState } from "react";

import { stakingClient } from "../../components/staking_section/utils/staking_client";
import { sortAccounts } from "./formatters";
import type {
  Account,
  NetworkInfo,
  SetState,
  State,
  TStakingContext,
  Wallet,
  WalletId,
} from "./types";
import { ChainId, defaultState } from "./types";

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

  return (
    <StakingContext.Provider value={contextValue}>
      {children}
    </StakingContext.Provider>
  );
};

// Actions

export const fetchNetworksInfo = async (setState: SetState) => {
  // @TODO: Prioritize here which networks to fetch
  const [cosmosTestnet, celestiaTestnet, cosmos, celestia] = await Promise.all(
    [
      ChainId.CosmosHubTestnet,
      ChainId.CelestiaTestnet,
      ChainId.CosmosHub,
      ChainId.Celestia,
    ].map((chainId) =>
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
      [celestia.chainId]: celestia.info,
      [celestiaTestnet.chainId]: celestiaTestnet.info,
      [cosmos.chainId]: cosmos.info,
      [cosmosTestnet.chainId]: cosmosTestnet.info,
    },
  }));
};

export const getNetworkInfo = async (
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
  selectedAccount: State["selectedAccount"] | undefined,
) => {
  setState({
    selectedAccount,
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

  const newWallets = {
    ...state.wallets,
    [walletId]: {
      ...state.wallets[walletId],
      [chainId]: {
        accounts: [
          ...(state.wallets[walletId]?.[chainId]?.accounts || []).filter(
            (a) => a.address !== address,
          ),
          {
            ...account,
            info,
            rewards,
          },
        ].sort(sortAccounts),
      },
    },
  };

  setState({
    wallets: newWallets,
  });
};

// Selectors

export const getUserAccountsForNetwork = (
  state: State,
  walletName: WalletId,
  userNetwork: ChainId,
) => state?.wallets?.[walletName]?.[userNetwork]?.accounts;

export const getSelectedAccount = (state: State) => {
  const { selectedAccount } = state;

  if (!selectedAccount) {
    return undefined;
  }

  const { address, chainId, wallet } = selectedAccount;

  return state?.wallets?.[wallet]?.[chainId]?.accounts?.find(
    (a) => a.address === address,
  );
};

// Utils

export const getConnectedWallets = (): WalletId[] => {
  const connectedWallets = window.localStorage.getItem("connectedWallets");

  if (!connectedWallets) {
    return [];
  }

  try {
    const parsedWallets = JSON.parse(connectedWallets);

    return parsedWallets;
  } catch (e) {
    return [];
  }
};

export const addToConnectedWallets = (wallet: WalletId) => {
  const connectedWallets = getConnectedWallets();

  const newWalletsSet = new Set([...connectedWallets, wallet]);
  const newWallets = Array.from(newWalletsSet);

  window.localStorage.setItem("connectedWallets", JSON.stringify(newWallets));
};

import type { PropsWithChildren } from "react";
import { createContext, useMemo, useState } from "react";

import { stakingClient } from "../../components/staking_section/utils/staking_client";
import { sortAccounts } from "./formatters";
import type {
  Account,
  ChainId,
  Context,
  SetState,
  State,
  Wallet,
  WalletId,
} from "./types";
import { defaultState } from "./types";

const baseContext: Context = {
  setState: () => {},
  state: defaultState,
};

export const StakingContext = createContext(baseContext);

export const StakingProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<State>(baseContext.state);

  const contextValue = useMemo(() => {
    const wrappedSetState = (newState: Partial<State>) => {
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

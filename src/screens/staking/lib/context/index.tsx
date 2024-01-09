import type { PropsWithChildren } from "react";
import { createContext, useMemo, useState } from "react";

import { networks } from "@src/utils/network_info";

import type {
  GetAddressInfoResponse,
  GetRewardsResponse,
} from "../../components/staking_section/utils/staking_client";

export const ENABLE_TESTNETS =
  process.env.NEXT_PUBLIC_STAKING_ENABLE_TESTNETS === "true";

export enum WalletId {
  Keplr = "keplr",
}

export enum ChainId {
  Celestia = "celestia",
  CelestiaTestnet = "mocha-4",
  CosmosHub = "cosmoshub",
  CosmosHubTestnet = "theta-testnet-001",
}

export const networkNameToChainId: Record<string, ChainId> = {
  // @TODO: Move from testnet to mainnet via env variable
  [networks.celestia.graphql]: ChainId.CelestiaTestnet,
  [networks.cosmos.graphql]: ChainId.CosmosHubTestnet,
};

export const networksWithStaking = new Set([
  networks.cosmos.graphql,
  networks.celestia.graphql,
]);

export type Account = {
  address: string;
  info?: GetAddressInfoResponse;
  rewards?: GetRewardsResponse;
};

type StakeAction = "claim_rewards" | "stake" | "unstake";

type Wallet = { [key in ChainId]?: { accounts: Account[] } };

type SelectedAccount = {
  address: string;
  chainId: ChainId;
  wallet: WalletId;
};

type State = {
  isConnectingWallet: boolean;
  selectedAccount: null | SelectedAccount;
  selectedAction: null | StakeAction;
  wallets: { [key in WalletId]?: Wallet };
};

type SetState = (state: Partial<State>) => void;

type Context = {
  setState: SetState;
  state: State;
};

const defaultState: State = {
  isConnectingWallet: false,
  selectedAccount: null,
  selectedAction: null,
  wallets: {},
};

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

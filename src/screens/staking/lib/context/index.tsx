import type { PropsWithChildren } from "react";
import { createContext, useMemo, useState } from "react";

export const ENABLE_TESTNETS =
  process.env.NEXT_PUBLIC_STAKING_ENABLE_TESTNETS === "true";

export enum WalletId {
  Keplr = "keplr",
}

export enum ChainId {
  Celestia = "celestia",
  CelestiaTestnet = "mocha-4",
  CosmosHub = "cosmoshub-4",
  CosmosHubTestnet = "theta-testnet-001",
}

export type Account = {
  address: string;
};

type Wallet = { [key in ChainId]?: { accounts: Account[] } };

type State = {
  wallets?: Record<WalletId, Wallet>;
};

type SetState = (state: Partial<State>) => void;

type Context = {
  setState: SetState;
  state: State;
};

const baseContext: Context = {
  setState: () => {},
  state: {},
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

export const getUserAccountsForNetwork = (
  context: Context,
  walletName: WalletId,
  userNetwork: ChainId,
) => context.state?.wallets?.[walletName]?.[userNetwork]?.accounts;

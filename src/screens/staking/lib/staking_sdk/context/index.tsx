import type { PostHog } from "posthog-js";
import { usePostHog } from "posthog-js/react";
import type { PropsWithChildren } from "react";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type { StakingState } from "../core";
import { useWalletsListeners } from "../wallet_operations";

type SetState = (
  state: ((s: StakingState) => StakingState) | Partial<StakingState>,
) => void;

export type TStakingContext = {
  postHog?: PostHog;
  setState: SetState;
  state: StakingState;
};

const defaultState: StakingState = {
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

const StakingContext = createContext(baseContext);

export const StakingProvider = ({ children }: PropsWithChildren) => {
  const postHog = usePostHog();

  const [state, setState] = useState<StakingState>(
    (typeof window !== "undefined" && window.stakingContext?.state) ||
      baseContext.state,
  );

  const contextValue = useMemo(() => {
    const wrappedSetState: SetState = (newState) => {
      if (typeof newState === "function") {
        setState(newState);

        return;
      }

      setState((prevState) => ({ ...prevState, ...newState }));
    };

    return {
      postHog,
      setState: wrappedSetState,
      state,
    };
  }, [postHog, state]);

  useEffect(() => {
    window.stakingContext = contextValue;
  }, [contextValue]);

  useWalletsListeners(contextValue);

  return (
    <StakingContext.Provider value={contextValue}>
      {children}
    </StakingContext.Provider>
  );
};

export const useStakingRef = () => {
  const { postHog, setState, state } = useContext(StakingContext);

  const stakingRef = useRef({} as TStakingContext);

  stakingRef.current.state = state;
  stakingRef.current.setState = setState;
  stakingRef.current.postHog = postHog;

  return stakingRef;
};

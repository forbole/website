import React from "react";

interface StakingState {
  networkNumber: number;
  setNetworkNumber: React.Dispatch<React.SetStateAction<number>>;
}

const initialState: StakingState = {
  networkNumber: 0,
  setNetworkNumber: () => {},
};

export interface Props {
  children: React.ReactNode;
}

const StakingContext = React.createContext<StakingState>(initialState);

const StakingContextProvider: React.FC<Props> = ({ children }) => {
  const [networkNumber, setNetworkNumber] = React.useState(
    initialState.networkNumber,
  );
  const stakingProviderValue = React.useMemo(
    () => ({ networkNumber, setNetworkNumber }),
    [networkNumber, setNetworkNumber],
  );
  return (
    <StakingContext.Provider value={stakingProviderValue}>
      {children}
    </StakingContext.Provider>
  );
};

const useStakingContext = (): StakingState => React.useContext(StakingContext);

export { StakingContextProvider, useStakingContext };

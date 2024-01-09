/* eslint-disable no-console */
import { useContext } from "react";

import {
  StakingContext,
  setSelectedAccount,
} from "@src/screens/staking/lib/context";

import ModalBase from "./modal_base";

const UnstakingModal = () => {
  const { setState: setStakingState, state: stakingState } =
    useContext(StakingContext);

  const { selectedAccount, selectedAction } = stakingState;

  const isOpen = !!selectedAccount && selectedAction === "unstake";

  return (
    <ModalBase
      onClose={() => setSelectedAccount(setStakingState, undefined)}
      open={isOpen}
    >
      <div>Unstaking Modal</div>
    </ModalBase>
  );
};

export default UnstakingModal;

/* eslint-disable no-console */
import { useContext } from "react";

import {
  StakingContext,
  setSelectedAccount,
} from "@src/screens/staking/lib/context";

import ModalBase from "./modal_base";
import NetworksSelect from "./networks_select";

const ClaimRewardsModal = () => {
  const { setState: setStakingState, state: stakingState } =
    useContext(StakingContext);

  const { selectedAccount, selectedAction } = stakingState;

  const isOpen = !!selectedAccount && selectedAction === "claim_rewards";

  return (
    <ModalBase
      onClose={() => setSelectedAccount(setStakingState, undefined)}
      open={isOpen}
    >
      <div>
        <NetworksSelect />
        <div
          style={{
            backgroundColor: "#fff",
            left: "50%",
            position: "absolute",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Claim Rewards Modal
        </div>
      </div>
    </ModalBase>
  );
};

export default ClaimRewardsModal;

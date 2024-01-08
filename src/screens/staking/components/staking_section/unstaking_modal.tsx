/* eslint-disable no-console */
import { Modal } from "@mui/material";
import { useContext } from "react";

import {
  StakingContext,
  setSelectedAccount,
} from "@src/screens/staking/lib/context";

const UnstakingModal = () => {
  const { setState: setStakingState, state: stakingState } =
    useContext(StakingContext);

  const { selectedAccount, selectedAction } = stakingState;

  const isOpen = !!selectedAccount && selectedAction === "unstake";

  if (!open) return null;

  return (
    <Modal
      onClose={() => setSelectedAccount(setStakingState, undefined)}
      open={isOpen}
      slotProps={{
        backdrop: {
          sx() {
            return {
              backdropFilter: "blur(8px)",
              background: "rgba(123, 123, 123, 0.20)",
            };
          },
        },
      }}
      sx={{
        overflow: "auto",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          left: "50%",
          position: "absolute",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        Unstaking Modal
      </div>
    </Modal>
  );
};

export default UnstakingModal;

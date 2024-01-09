/* eslint-disable no-console */
import { useContext, useEffect, useState } from "react";

import IconInfoCircle from "@src/components/icons/info-circle.svg";
import { tooltipId } from "@src/components/tooltip";
import {
  StakingContext,
  getSelectedAccount,
  setSelectedAccount,
} from "@src/screens/staking/lib/context";
import { stakeAmount } from "@src/screens/staking/lib/context/operations";

import ModalBase from "./modal_base";
import NetworksSelect from "./networks_select";
import { stakingClient } from "./utils/staking_client";

type ModalNetworkInfo = {
  rpc: string;
};

const StakingModal = () => {
  const { setState: setStakingState, state: stakingState } =
    useContext(StakingContext);

  const { selectedAccount, selectedAction } = stakingState;

  const [networkInfo, setNetworkInfo] = useState<ModalNetworkInfo | null>(null);
  const [memo, setMemo] = useState("");

  const isOpen = !!selectedAccount && selectedAction === "stake";

  useEffect(() => {
    if (isOpen) {
      setNetworkInfo(null);

      const { chainId } = selectedAccount;

      stakingClient.getStakingInfo(chainId).then((info) => {
        if (!info.rpc) {
          return;
        }

        setNetworkInfo({ rpc: info.rpc });
      });
    }
  }, [isOpen, selectedAccount]);

  const account = getSelectedAccount(stakingState);

  if (!account?.info?.balances) return null;

  const availableTokens = [
    account.info.balances.amount,
    account.info.balances.denom,
  ];

  return (
    <ModalBase
      onClose={() => setSelectedAccount(setStakingState, undefined)}
      open={isOpen}
    >
      <div>Stake with Forbole</div>
      <div>
        <NetworksSelect />
      </div>
      <div>
        <IconInfoCircle
          data-tooltip-content="Foo Tooltip"
          data-tooltip-id={tooltipId}
        />{" "}
        APY 12%
      </div>
      {availableTokens && (
        <div>
          Available: {availableTokens[0]} {availableTokens[1].toUpperCase()}
        </div>
      )}
      <div>
        <div>Token amount</div>
        <input /> {availableTokens && availableTokens[1].toUpperCase()}
      </div>
      <div>
        <div>Memo</div>
        <input
          onChange={(e) => {
            setMemo(e.target.value);
          }}
          value={memo}
        />{" "}
      </div>
      <div>
        <button
          onClick={() => {
            if (!selectedAccount || !networkInfo) return;

            const { address, chainId } = selectedAccount;

            stakeAmount({
              address,
              chainId,
              memo,
            });
          }}
        >
          Stake Now
        </button>
      </div>
    </ModalBase>
  );
};

export default StakingModal;

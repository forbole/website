/* eslint-disable no-console */
import useTranslation from "next-translate/useTranslation";
import { useContext, useState } from "react";

import {
  StakingContext,
  setSelectedAccount,
} from "@src/screens/staking/lib/context";

import ModalBase from "./modal_base";

const UnstakingModal = () => {
  const { setState: setStakingState, state: stakingState } =
    useContext(StakingContext);

  const { t } = useTranslation("staking");

  const defaultAmount = "1.000";

  const [memo, setMemo] = useState("");
  const [amount, setAmount] = useState(defaultAmount);

  const { selectedAccount, selectedAction } = stakingState;

  const isOpen = !!selectedAccount && selectedAction === "unstake";

  return (
    <ModalBase
      onClose={() => setSelectedAccount(setStakingState, undefined)}
      open={isOpen}
      title={t("unstakingModal.title")}
    >
      <div>Unstaking Modal</div>
      <div>
        <div>Unstake token amount</div>
        {/* @TODO */}
        <div>Staked: 1.000 ATOM</div>
        <input
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          placeholder="0.000"
          value={amount}
        />
      </div>
      <div>
        <div>Memo</div>
        <input
          onChange={(e) => {
            setMemo(e.target.value);
          }}
          placeholder="Optional"
          value={memo}
        />
      </div>
      <div>
        <div>
          We are sorry to hear that you are leaving. Before you go, please note
          the following:
        </div>
        <ul>
          {/* @TODO */}
          <li>
            Your staking will be locked in until 21 January, 2024 (21 days
            later).{" "}
          </li>
          <li>During this time, you won't receive staking rewards. </li>
          <li>
            However, if you change your mind, you can cancel the process at any
            time.{" "}
          </li>
          <li>
            To continue staking after this period, you'll need to stake again.
          </li>
        </ul>
      </div>
      <button>Unstake</button>
    </ModalBase>
  );
};

export default UnstakingModal;

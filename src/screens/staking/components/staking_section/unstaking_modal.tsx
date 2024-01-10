/* eslint-disable no-console */
import useTranslation from "next-translate/useTranslation";
import { useContext, useEffect, useState } from "react";

import LoadingSpinner from "@src/components/loading_spinner";
import { toastError } from "@src/components/notification";
import {
  StakingContext,
  setSelectedAccount,
} from "@src/screens/staking/lib/context";
import { unstake } from "@src/screens/staking/lib/context/operations";

import ModalBase from "./modal_base";
import { stakingClient } from "./utils/staking_client";

type ModalNetworkInfo = {
  unbondingPeriod: number;
};

const UnstakingModal = () => {
  const { setState: setStakingState, state: stakingState } =
    useContext(StakingContext);

  const { selectedAccount, selectedAction } = stakingState;
  const [networkInfo, setNetworkInfo] = useState<ModalNetworkInfo | null>(null);

  const isOpen = !!selectedAccount && selectedAction === "unstake";
  const chainId = selectedAccount?.chainId;

  useEffect(() => {
    if (isOpen && chainId) {
      stakingClient.getStakingInfo(chainId).then((info) => {
        setNetworkInfo({
          unbondingPeriod: Number(info.unbonding_period),
        });
      });
    }
  }, [isOpen, chainId]);

  const { t } = useTranslation("staking");

  const defaultAmount = "1.000";

  const [memo, setMemo] = useState("");
  const [amount, setAmount] = useState(defaultAmount);

  // @TODO: use the unbonding perdio
  const unlockedDate = networkInfo ? "21 January, 2024" : null;

  return (
    <ModalBase
      onClose={() => setSelectedAccount(setStakingState, undefined)}
      open={isOpen}
      title={t("unstakingModal.title")}
    >
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
        {networkInfo ? (
          <ul>
            {/* @TODO */}
            <li>
              Your staking will be locked in until {unlockedDate} (21 days
              later).{" "}
            </li>
            <li>During this time, you won't receive staking rewards. </li>
            <li>
              However, if you change your mind, you can cancel the process at
              any time.{" "}
            </li>
            <li>
              To continue staking after this period, you'll need to stake again.
            </li>
          </ul>
        ) : (
          <LoadingSpinner />
        )}
      </div>
      <button
        onClick={() => {
          if (!selectedAccount || !chainId) return;

          const { address } = selectedAccount;

          unstake({
            address,
            amount,
            chainId,
          }).catch(() => {
            toastError({
              title: "foo",
            });
          });
        }}
      >
        {t("unstakingModal.button")}
      </button>
    </ModalBase>
  );
};

export default UnstakingModal;

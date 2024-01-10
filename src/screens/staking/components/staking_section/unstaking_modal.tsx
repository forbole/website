/* eslint-disable no-console */
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import FormInput from "@src/components/form_input";
import HighlightButton from "@src/components/highlight-button";
import LoadingSpinner from "@src/components/loading_spinner";
import { toastError } from "@src/components/notification";
import {
  StakingContext,
  setSelectedAccount,
} from "@src/screens/staking/lib/context";
import { unstake } from "@src/screens/staking/lib/context/operations";

import Label from "./label";
import ModalBase from "./modal_base";
import * as styles from "./unstaking_modal.module.scss";
import { stakingClient } from "./utils/staking_client";

type ModalNetworkInfo = {
  unbondingPeriod: number;
};

const UnstakingModal = () => {
  const { setState: setStakingState, state: stakingState } =
    useContext(StakingContext);

  const { locale } = useRouter();
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

  const unlockedDate = (() => {
    if (!networkInfo) {
      return null;
    }

    const { unbondingPeriod } = networkInfo;

    console.log("debug: unstaking_modal.tsx: unbondingPeriod", unbondingPeriod);

    if (!unbondingPeriod) {
      return null;
    }

    const now = new Date();
    const nextDate = new Date(now.getTime() + unbondingPeriod * 1000);

    return nextDate.toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  })();

  return (
    <ModalBase
      onClose={() => setSelectedAccount(setStakingState, undefined)}
      open={isOpen}
      title={t("unstakingModal.title")}
    >
      <div className={styles.wrapper}>
        <Label>{t("unstakingModal.amount.label")}</Label>
        {/* @TODO */}
        <div>Staked: 1.000 ATOM</div>
        <FormInput
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          placeholder={t("unstakingModal.amount.placeholder")}
          rightText="ATOM"
          value={amount}
        />
        <Label>{t("unstakingModal.memo.label")}</Label>
        <FormInput
          onChange={(e) => {
            setMemo(e.target.value);
          }}
          placeholder={t("unstakingModal.memo.placeholder")}
          value={memo}
        />
        <div>
          <div>
            We are sorry to hear that you are leaving. Before you go, please
            note the following:
          </div>
          {networkInfo ? (
            <ul>
              {/* @TODO */}
              {unlockedDate && (
                <li>
                  Your staking will be locked in until {unlockedDate} (21 days
                  later).{" "}
                </li>
              )}
              <li>During this time, you won't receive staking rewards. </li>
              <li>
                However, if you change your mind, you can cancel the process at
                any time.{" "}
              </li>
              <li>
                To continue staking after this period, you'll need to stake
                again.
              </li>
            </ul>
          ) : (
            <LoadingSpinner />
          )}
        </div>
        <HighlightButton
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
          pinkShadow
          size="big"
        >
          {t("unstakingModal.button")}
        </HighlightButton>
      </div>
    </ModalBase>
  );
};

export default UnstakingModal;

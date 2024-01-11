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
  getSelectedAccount,
  setSelectedAccount,
} from "@src/screens/staking/lib/context";
import { formatDenom } from "@src/screens/staking/lib/context/formatters";
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

  const account = getSelectedAccount(stakingState);

  const unlockedDate = (() => {
    if (!networkInfo) {
      return null;
    }

    const { unbondingPeriod } = networkInfo;

    if (!unbondingPeriod) {
      return null;
    }

    const now = new Date();
    const days = Math.ceil(unbondingPeriod / 86400);
    const nextDate = new Date(now.getTime() + unbondingPeriod * 1000);

    const nextDateStr = nextDate.toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return {
      date: nextDateStr,
      days,
    };
  })();

  return (
    <ModalBase
      onClose={() => setSelectedAccount(setStakingState, undefined)}
      open={isOpen}
      title={t("unstakingModal.title")}
    >
      <div className={styles.wrapper}>
        <Label>{t("unstakingModal.amount.label")}</Label>
        {!!account?.info?.delegation?.amount && (
          <div>
            Staked:{" "}
            {formatDenom(
              account.info.delegation.denom,
              account.info.delegation.amount,
            )}
          </div>
        )}
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
          noMargin
          onChange={(e) => {
            setMemo(e.target.value);
          }}
          placeholder={t("unstakingModal.memo.placeholder")}
          value={memo}
        />
        <div>
          <div>{t("unstakingModal.infoTitle")}</div>
          {networkInfo ? (
            <ul>
              {/* @TODO */}
              {unlockedDate && (
                <li>
                  {t("unstakingModal.unlockedDate", {
                    date: unlockedDate.date,
                    days: unlockedDate.days,
                  })}
                </li>
              )}
              <li>{t("unstakingModal.info2")}</li>
              <li>{t("unstakingModal.info3")}</li>
              <li>{t("unstakingModal.info4")}</li>
            </ul>
          ) : (
            <LoadingSpinner className={styles.spinner} />
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

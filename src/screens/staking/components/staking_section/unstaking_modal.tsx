/* eslint-disable no-console */
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import FormInput from "@src/components/form_input";
import HighlightButton from "@src/components/highlight-button";
import LoadingSpinner from "@src/components/loading_spinner";
import { toastSuccess } from "@src/components/notification";
import {
  StakingContext,
  getSelectedAccount,
  setSelectedAccount,
  syncAccountData,
} from "@src/screens/staking/lib/context";
import {
  formatDenom,
  resolveDenom,
} from "@src/screens/staking/lib/context/formatters";
import { unstake } from "@src/screens/staking/lib/context/operations";
import { MAX_MEMO } from "@src/screens/staking/lib/context/types";
import { displayGenericError } from "@src/screens/staking/lib/error";

import Label from "./label";
import ModalBase, { ModalError } from "./modal_base";
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

  const [memo, setMemo] = useState("");
  const [memoError, setMemoError] = useState("");
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const account = getSelectedAccount(stakingState);

  useEffect(() => {
    if (isOpen) {
      return () => {
        setAmount("");
        setAmountError("");
        setMemo("");
        setMemoError("");
      };
    }
  }, [isOpen]);

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

  const amountNum = Number(amount);
  const isValidAmount = !Number.isNaN(amountNum);

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
          onBlur={() => {
            const newAmountError = (() => {
              if (!isValidAmount) {
                return t("stakingModal.amountError.invalid");
              }

              if (amountNum <= 0) {
                return t("stakingModal.amountError.positive");
              }
            })() as string;

            setAmountError(newAmountError);
          }}
          onChange={(e) => {
            if (amountError) {
              setAmountError("");
            }

            setAmount(e.target.value);
          }}
          placeholder={t("unstakingModal.amount.placeholder")}
          {...(account?.info?.delegation?.denom && {
            rightText: resolveDenom(account.info.delegation?.denom),
          })}
          value={amount}
        />
        {!!amountError && <ModalError>{amountError}</ModalError>}
        <Label>{t("unstakingModal.memo.label")}</Label>
        <FormInput
          className={styles.input}
          noMargin
          onBlur={() => {
            const newMemoError = (() => {
              if (!memo) return "";

              if (memo.length > MAX_MEMO) {
                return t("stakingModal.memoError.tooLongMemo");
              }
            })() as string;

            if (newMemoError !== memoError) {
              setMemoError(newMemoError);
            }
          }}
          onChange={(e) => {
            if (memoError) {
              setMemoError("");
            }

            setMemo(e.target.value);
          }}
          placeholder={t("unstakingModal.memo.placeholder")}
          value={memo}
        />
        {!!memoError && <ModalError>{memoError}</ModalError>}
        <div className={styles.info}>
          <div className={styles.title}>{t("unstakingModal.infoTitle")}</div>
          {networkInfo ? (
            <ul className={styles.desc}>
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
            if (!selectedAccount || amountError || memoError) return;

            setIsLoading(true);

            unstake({
              account: selectedAccount,
              amount,
            })
              .then(() => {
                syncAccountData(setStakingState, stakingState, selectedAccount);
                setSelectedAccount(setStakingState, null);

                toastSuccess({
                  subtitle: t("unstakingModal.success.subtitle"),
                  title: t("unstakingModal.success.title"),
                });
              })
              .catch(() => {
                displayGenericError(t);
              })
              .finally(() => {
                setIsLoading(false);
              });
          }}
          pinkShadow
          size="big"
        >
          {isLoading ? <LoadingSpinner /> : t("unstakingModal.button")}
        </HighlightButton>
      </div>
    </ModalBase>
  );
};

export default UnstakingModal;

/* eslint-disable no-console */
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import FormInput from "@src/components/form_input";
import HighlightButton from "@src/components/highlight-button";
import LoadingSpinner from "@src/components/loading_spinner";
import { toastSuccess } from "@src/components/notification";
import { displayGenericError } from "@src/screens/staking/lib/error";
import {
  getNetworkInfo,
  getSelectedAccount,
  setSelectedAccount,
  syncAccountData,
  useStakingRef,
} from "@src/screens/staking/lib/staking_sdk/context";
import {
  formatDenom,
  getUnbondingTimeForNetwork,
  resolveDenom,
} from "@src/screens/staking/lib/staking_sdk/formatters";
import type { NetworkInfo } from "@src/screens/staking/lib/staking_sdk/types";
import { MAX_MEMO } from "@src/screens/staking/lib/staking_sdk/types";
import { getAccountResolvedDelegation } from "@src/screens/staking/lib/staking_sdk/utils/accounts";
import { unstake } from "@src/screens/staking/lib/staking_sdk/wallet_operations";

import Label from "./label";
import ModalBase, { ModalError } from "./modal_base";
import * as styles from "./unstaking_modal.module.scss";

const UnstakingModal = () => {
  const stakingRef = useStakingRef();

  const { locale } = useRouter();
  const { selectedAccount, selectedAction } = stakingRef.current.state;
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo | null>(null);

  const isOpen = !!selectedAccount && selectedAction === "unstake";

  useEffect(() => {
    if (isOpen) {
      setNetworkInfo(null);

      const { chainId } = selectedAccount;

      getNetworkInfo(
        stakingRef.current.setState,
        stakingRef.current.state,
        chainId,
      ).then((info) => {
        setNetworkInfo(info);
      });
    }
  }, [isOpen, selectedAccount, stakingRef]);

  const { t } = useTranslation("staking");

  const [memo, setMemo] = useState("");
  const [memoError, setMemoError] = useState("");
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setState: setStakingState, state: stakingState } = stakingRef.current;

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

  const availableAmount = getAccountResolvedDelegation(account);

  const amountNum = Number(amount);

  const isValidAmount =
    !Number.isNaN(amountNum) &&
    !!availableAmount &&
    amountNum <= availableAmount;

  const unlockedDate = getUnbondingTimeForNetwork(networkInfo, locale);

  return (
    <ModalBase
      onClose={() => setSelectedAccount(setStakingState, null, null)}
      open={isOpen}
      title={t("unstakingModal.title")}
    >
      <div className={styles.wrapper}>
        <div className={styles.row}>
          <Label>{t("unstakingModal.amount.label")}</Label>
          <div>
            {!!account?.info && (
              <>
                <Label>{t("unstakingModal.available")}</Label>:{" "}
                <span className={styles.amount}>
                  {formatDenom(account.info.delegation)}
                </span>
              </>
            )}
          </div>
        </div>
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
          disabled={
            !selectedAccount || !!amountError || !!memoError || isLoading
          }
          onClick={() => {
            if (!selectedAccount || amountError || memoError || isLoading)
              return;

            setIsLoading(true);

            unstake({
              account: selectedAccount,
              amount,
            })
              .then(async (unstaked) => {
                if (unstaked.success) {
                  await syncAccountData(
                    setStakingState,
                    stakingState,
                    selectedAccount,
                  );

                  setSelectedAccount(setStakingState, null, null);

                  toastSuccess({
                    subtitle: t("unstakingModal.success.subtitle"),
                    title: t("unstakingModal.success.title", {
                      date: unlockedDate?.date,
                    }),
                  });
                } else if (unstaked.hasError) {
                  displayGenericError(t);
                }
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

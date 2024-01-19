import Trans from "next-translate/Trans";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import FormInput from "@src/components/form_input";
import HighlightButton from "@src/components/highlight-button";
import IconInfoCircle from "@src/components/icons/info_circle_blue.svg";
import LoadingSpinner from "@src/components/loading_spinner";
import { toastSuccess } from "@src/components/notification";
import { displayGenericError } from "@src/screens/staking/lib/error";
import {
  getNetworkStakingInfo,
  getSelectedAccount,
  setSelectedAccount,
  syncAccountData,
  useStakingRef,
} from "@src/screens/staking/lib/staking_sdk/context";
import type { NetworkInfo } from "@src/screens/staking/lib/staking_sdk/core";
import {
  formatCoin,
  getUnbondingTimeForNetwork,
  normaliseDenom,
} from "@src/screens/staking/lib/staking_sdk/formatters";
import { getAccountNormalisedDelegation } from "@src/screens/staking/lib/staking_sdk/utils/accounts";
import {
  MAX_MEMO,
  unstake,
} from "@src/screens/staking/lib/staking_sdk/wallet_operations";

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

      const { networkId } = selectedAccount;

      getNetworkStakingInfo(
        stakingRef.current.setState,
        stakingRef.current.state,
        networkId,
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

  const availableAmount = getAccountNormalisedDelegation(account);

  const amountNum = Number(amount);

  const isValidAmount =
    !Number.isNaN(amountNum) &&
    amountNum > 0 &&
    !!availableAmount?.num &&
    amountNum <= availableAmount.num;

  const unlockedDate = getUnbondingTimeForNetwork(networkInfo, locale);

  const newAmountError = (() => {
    if (!isValidAmount) {
      return t("stakingModal.amountError.invalid");
    }
  })() as string;

  const newMemoError = (() => {
    if (!memo) return "";

    if (memo.length > MAX_MEMO) {
      return t("stakingModal.memoError.tooLongMemo");
    }
  })() as string;

  const onSubmit = (e: any) => {
    e?.preventDefault();

    if (newAmountError) {
      setAmountError(newAmountError);
    }

    if (newMemoError !== memoError) {
      setMemoError(newMemoError);
    }

    if (
      !selectedAccount ||
      amountError ||
      memoError ||
      isLoading ||
      newAmountError ||
      newMemoError
    )
      return;

    setIsLoading(true);

    unstake({
      account: selectedAccount,
      amount,
    })
      .then(async (unstaked) => {
        if (unstaked.success) {
          await syncAccountData(setStakingState, stakingState, selectedAccount);

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
  };

  return (
    <ModalBase
      onClose={() => setSelectedAccount(setStakingState, null, null)}
      open={isOpen}
      title={t("unstakingModal.title")}
    >
      <form className={styles.wrapper} onSubmit={onSubmit}>
        <div className={styles.row}>
          <Label>{t("unstakingModal.amount.label")}</Label>
          <div>
            {!!account?.info?.delegation?.amount && (
              <>
                <Label>{t("unstakingModal.available")}</Label>:{" "}
                <span className={styles.amount}>
                  {formatCoin(account.info.delegation)}
                </span>
              </>
            )}
          </div>
        </div>
        <FormInput
          disabled={isLoading}
          fullWidth
          onBlur={() => {
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
            rightText: normaliseDenom(account.info.delegation?.denom),
          })}
          value={amount}
        />
        {!!amountError && <ModalError>{amountError}</ModalError>}
        <Label>{t("unstakingModal.memo.label")}</Label>
        <FormInput
          className={styles.input}
          disabled={isLoading}
          noFocusEffect
          noMargin
          onBlur={() => {
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
          <IconInfoCircle />
          <div className={styles.infoContent}>
            <div className={styles.title}>{t("unstakingModal.infoTitle")}</div>
            {networkInfo ? (
              <ul className={styles.desc}>
                {unlockedDate && (
                  <li>
                    <Trans
                      components={[<span key="0" />, <b key="1" />]}
                      i18nKey="unstakingModal.unlockedDateInfo"
                      ns="staking"
                      values={{
                        date: unlockedDate.date,
                        days: unlockedDate.days,
                      }}
                    />
                  </li>
                )}
                <li>
                  <Trans
                    components={[<span key="0" />, <b key="1" />]}
                    i18nKey="unstakingModal.info2T"
                    ns="staking"
                  />
                </li>
                <li>{t("unstakingModal.info3")}</li>
                <li>{t("unstakingModal.info4")}</li>
              </ul>
            ) : (
              <LoadingSpinner className={styles.spinner} />
            )}
          </div>
        </div>
        <HighlightButton
          disabled={
            !selectedAccount || !!amountError || !!memoError || isLoading
          }
          onClick={onSubmit}
          pinkShadow
          size="big"
        >
          {isLoading ? <LoadingSpinner /> : t("unstakingModal.button")}
        </HighlightButton>
      </form>
    </ModalBase>
  );
};

export default UnstakingModal;

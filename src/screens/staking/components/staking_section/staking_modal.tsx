/* eslint-disable no-console */
import useTranslation from "next-translate/useTranslation";
import { useContext, useEffect, useRef, useState } from "react";

import FormInput from "@src/components/form_input";
import HighlightButton from "@src/components/highlight-button";
import IconInfoCircle from "@src/components/icons/info-circle.svg";
import LoadingSpinner from "@src/components/loading_spinner";
import { toastError, toastSuccess } from "@src/components/notification";
import { tooltipId } from "@src/components/tooltip";
import {
  StakingContext,
  getNetworkInfo,
  getSelectedAccount,
  setSelectedAccount,
  syncAccountData,
} from "@src/screens/staking/lib/context";
import {
  formatDenom,
  resolveDenom,
} from "@src/screens/staking/lib/context/formatters";
import { stakeAmount } from "@src/screens/staking/lib/context/operations";
import type {
  NetworkInfo,
  TStakingContext,
} from "@src/screens/staking/lib/context/types";

import Label from "./label";
import ModalBase, { ModalError } from "./modal_base";
import NetworksSelect from "./networks_select";
import * as styles from "./staking_modal.module.scss";

const StakingModal = () => {
  const { setState: setStakingState, state: stakingState } =
    useContext(StakingContext);

  const { t } = useTranslation("staking");

  const [isLoading, setIsLoading] = useState(false);
  const { selectedAccount, selectedAction } = stakingState;

  const [networkInfo, setNetworkInfo] = useState<NetworkInfo | null>(null);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [memoError, setMemoError] = useState("");
  const [memo, setMemo] = useState("");
  const stakingRef = useRef({} as TStakingContext);

  stakingRef.current.state = stakingState;
  stakingRef.current.setState = setStakingState;

  const isOpen = !!selectedAccount && selectedAction === "stake";

  const amountNum = Number(amount);
  const isValidAmount = !Number.isNaN(amountNum);

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

      return () => {
        setAmount("");
        setAmountError("");
        setMemo("");
        setMemoError("");
      };
    }
  }, [isOpen, selectedAccount]);

  const account = getSelectedAccount(stakingState);

  if (!account?.info?.balances) return null;

  const availableTokens = [
    account.info.balances.denom,
    account.info.balances.amount,
  ];

  return (
    <ModalBase
      onClose={() => setSelectedAccount(setStakingState, undefined)}
      open={isOpen}
      title={t("stakingModal.title")}
    >
      <div className={styles.wrapper}>
        <div>{selectedAccount && <NetworksSelect variant="accounts" />}</div>
        {networkInfo?.apy && (
          <div className={styles.row}>
            <Label className={styles.apy}>
              <IconInfoCircle
                data-tooltip-content="@TODO"
                data-tooltip-id={tooltipId}
              />{" "}
              APY
            </Label>
            <div>{(networkInfo.apy * 100).toFixed(0)}%</div>
          </div>
        )}
        <div className={styles.group}>
          <div className={styles.row}>
            <Label>{t("stakingModal.tokenAmount")}</Label>
            <div>
              {availableTokens && (
                <>
                  <Label>{t("stakingModal.available")}</Label>:{" "}
                  <span className={styles.amount}>
                    {formatDenom(availableTokens[0], availableTokens[1])}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className={styles.row}>
            <FormInput
              className={styles.input}
              onChange={(e) => {
                if (amountError) {
                  setAmountError("");
                }

                setAmount(e.target.value);
              }}
              placeholder="0"
              {...(availableTokens && {
                rightText: resolveDenom(availableTokens[0]),
              })}
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
              value={amount}
            />
          </div>
          {!!amountError && <ModalError>{amountError}</ModalError>}
        </div>
        <div className={styles.group}>
          <Label>{t("stakingModal.memo")}</Label>
          <FormInput
            className={styles.input}
            noMargin
            onBlur={() => {
              const newMemoError = (() => {
                if (!memo) return "";

                if (memo.length > 256) {
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
            placeholder={t("optionalInput")}
            value={memo}
          />
          {!!memoError && <ModalError>{memoError}</ModalError>}
        </div>
        <HighlightButton
          disabled={!!amountError || !!memoError}
          onClick={() => {
            if (
              !selectedAccount ||
              !networkInfo ||
              isLoading ||
              !isValidAmount ||
              amountNum <= 0 ||
              !!amountError
            )
              return;

            setIsLoading(true);

            stakeAmount({
              account,
              amount,
              memo,
            })
              .then((success) => {
                if (!success) return;

                syncAccountData(setStakingState, stakingState, selectedAccount);

                setSelectedAccount(setStakingState, null);

                toastSuccess({
                  title: t("stakingModal.success"), // @TODO: Message
                });
              })
              .catch(() => {
                toastError({
                  title: "Error", // @TODO
                });
              })
              .finally(() => {
                setIsLoading(false);
              });
          }}
          pinkShadow
          size="big"
        >
          {isLoading ? <LoadingSpinner /> : t("stake_now")}
        </HighlightButton>
      </div>
    </ModalBase>
  );
};

export default StakingModal;

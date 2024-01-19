import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";

import FormInput from "@src/components/form_input";
import HighlightButton from "@src/components/highlight-button";
import IconInfoCircle from "@src/components/icons/info-circle.svg";
import LoadingSpinner from "@src/components/loading_spinner";
import { toastSuccess } from "@src/components/notification";
import { tooltipId } from "@src/components/tooltip";
import { displayGenericError } from "@src/screens/staking/lib/error";
import {
  getNetworkStakingInfo,
  getSelectedAccount,
  setSelectedAccount,
  syncAccountData,
  useStakingRef,
} from "@src/screens/staking/lib/staking_sdk/context";
import type { NetworkInfo } from "@src/screens/staking/lib/staking_sdk/core";
import { MAX_MEMO } from "@src/screens/staking/lib/staking_sdk/core";
import {
  formatCoin,
  resolveDenom,
} from "@src/screens/staking/lib/staking_sdk/formatters";
import { getAccountResolvedBalance } from "@src/screens/staking/lib/staking_sdk/utils/accounts";
import { stakeAmount } from "@src/screens/staking/lib/staking_sdk/wallet_operations";

import Label from "./label";
import ModalBase, { ModalError } from "./modal_base";
import NetworksSelect from "./networks_select";
import * as styles from "./staking_modal.module.scss";

const StakingModal = () => {
  const stakingRef = useStakingRef();

  const { t } = useTranslation("staking");

  const [isLoading, setIsLoading] = useState(false);
  const { selectedAccount, selectedAction } = stakingRef.current.state;

  const [networkInfo, setNetworkInfo] = useState<NetworkInfo | null>(null);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [memoError, setMemoError] = useState("");
  const [memo, setMemo] = useState("");

  const isOpen = !!selectedAccount && selectedAction === "stake";

  const { setState: setStakingState, state: stakingState } = stakingRef.current;

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

      return () => {
        setAmount("");
        setAmountError("");
        setMemo("");
        setMemoError("");
      };
    }
  }, [isOpen, selectedAccount, stakingRef]);

  if (!isOpen) return null;

  const account = getSelectedAccount(stakingState);
  const balance = getAccountResolvedBalance(account);

  if (!balance || !account) return null;

  const amountNum = Number(amount);

  const isValidAmount =
    !Number.isNaN(amountNum) &&
    amountNum > 0 &&
    typeof balance.num === "number" &&
    amountNum <= balance.num;

  const onClose = () => {
    if (isLoading) return;

    setSelectedAccount(setStakingState, null, null);
  };

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
      !networkInfo ||
      isLoading ||
      !isValidAmount ||
      amountError ||
      memoError ||
      newAmountError ||
      newMemoError
    )
      return;

    setIsLoading(true);

    stakeAmount({
      account,
      amount,
      memo,
    })
      .then(async (result) => {
        if (result.success) {
          await syncAccountData(setStakingState, stakingState, selectedAccount);

          setSelectedAccount(setStakingState, null, null);

          toastSuccess({
            subtitle: `${t("stakingModal.success.sub")} 🎉`,
            title: t("stakingModal.success.title"),
          });
        } else if (result.hasError) {
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
    <ModalBase onClose={onClose} open={isOpen} title={t("stakingModal.title")}>
      <form className={styles.wrapper} onSubmit={onSubmit}>
        <div>
          {selectedAccount && (
            <NetworksSelect disabled={isLoading} variant="accounts" />
          )}
        </div>
        {networkInfo?.apy && (
          <div className={styles.row}>
            <Label className={styles.apy}>
              <IconInfoCircle
                data-tooltip-content={t("definitions.apy")}
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
              {typeof balance?.num === "number" && (
                <>
                  <Label>{t("stakingModal.available")}</Label>:{" "}
                  <span className={styles.amount}>
                    {formatCoin(balance.coin)}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className={styles.row}>
            <FormInput
              className={styles.input}
              data-test="staking-modal-amount-input"
              disabled={isLoading}
              onChange={(e) => {
                if (amountError) {
                  setAmountError("");
                }

                setAmount(e.target.value);
              }}
              placeholder="0"
              {...(balance.coin && {
                rightText: resolveDenom(balance.coin.denom),
              })}
              onBlur={() => {
                setAmountError(newAmountError);
              }}
              value={amount}
            />
          </div>
          {!!amountError && (
            <ModalError data-test="staking-modal-amount-error">
              {amountError}
            </ModalError>
          )}
        </div>
        <div className={styles.group}>
          <Label>{t("stakingModal.memo")}</Label>
          <FormInput
            className={styles.input}
            disabled={isLoading}
            fullWidth
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
            placeholder={t("optionalInput")}
            value={memo}
          />
          {!!memoError && <ModalError>{memoError}</ModalError>}
        </div>
        <HighlightButton
          disabled={!!amountError || !!memoError || isLoading}
          onClick={onSubmit}
          pinkShadow
          size="big"
          type="submit"
        >
          {isLoading ? <LoadingSpinner /> : t("stake_now")}
        </HighlightButton>
      </form>
    </ModalBase>
  );
};

export default StakingModal;

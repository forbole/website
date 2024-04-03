import BigNumber from "bignumber.js";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import FormInput from "@src/components/form_input";
import HighlightButton from "@src/components/highlight-button";
import IconInfoCircle from "@src/components/icons/info-circle.svg";
import LoadingSpinner from "@src/components/loading_spinner";
import { toastSuccess } from "@src/components/notification";
import { tooltipId } from "@src/components/tooltip";
import {
  displayGenericError,
  notEnoughAmountError,
  notEnoughGasError,
} from "@src/screens/staking/lib/error";
import { useStakingRef } from "@src/screens/staking/lib/staking_sdk/context";
import {
  getNetworkStakingInfo,
  setSelectedAccount,
  syncAccountData,
} from "@src/screens/staking/lib/staking_sdk/context/actions";
import { getSelectedAccount } from "@src/screens/staking/lib/staking_sdk/context/selectors";
import type { StakingNetworkInfo } from "@src/screens/staking/lib/staking_sdk/core";
import { mainNetworkDenom } from "@src/screens/staking/lib/staking_sdk/core/base";
import { formatCoin } from "@src/screens/staking/lib/staking_sdk/formatters";
import { getAccountNormalisedBalance } from "@src/screens/staking/lib/staking_sdk/utils/accounts";
import {
  getEmptyCoin,
  getIsCoin,
} from "@src/screens/staking/lib/staking_sdk/utils/coins";
import { getUnbondingTimeForNetwork } from "@src/screens/staking/lib/staking_sdk/utils/networks";
import {
  MAX_MEMO,
  stakeAmount,
} from "@src/screens/staking/lib/staking_sdk/wallet_operations";
import { StakeError } from "@src/screens/staking/lib/staking_sdk/wallet_operations/base";
import { PostHogCustomEvent } from "@src/utils/posthog";

import Label from "./label";
import ModalBase, { ModalError } from "./modal_base";
import NetworksSelect from "./networks_select";
import * as styles from "./staking_modal.module.scss";

const StakingModal = () => {
  const stakingRef = useStakingRef();

  const { t } = useTranslation("staking");

  const [isLoading, setIsLoading] = useState(false);
  const { selectedAccount, selectedAction } = stakingRef.current.state;

  const [networkInfo, setNetworkInfo] = useState<null | StakingNetworkInfo>(
    null,
  );

  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [memoError, setMemoError] = useState("");
  const [memo, setMemo] = useState("");

  const { locale } = useRouter();
  const isOpen = !!selectedAccount && selectedAction === "stake";

  const { state: stakingState } = stakingRef.current;

  useEffect(() => {
    if (isOpen) {
      setNetworkInfo(null);

      const { networkId } = selectedAccount;

      getNetworkStakingInfo(stakingRef.current, networkId).then((info) => {
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
  const balance = getAccountNormalisedBalance(account);

  if (!account) return null;

  const amountNum = new BigNumber(amount);

  const isValidAmount =
    !amountNum.isNaN() && amountNum.gt(0) && amountNum.lte(balance?.num || 0);

  const onClose = () => {
    if (isLoading) return;

    setSelectedAccount(stakingRef.current, null, null);
  };

  const newAmountError = (() => {
    if (!balance?.num.gt(0)) {
      return t("stakingModal.amountError.noBalance");
    }

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
          await syncAccountData(stakingRef.current, selectedAccount);

          setSelectedAccount(stakingRef.current, null, null);

          stakingRef.current.postHog?.capture(PostHogCustomEvent.StakedTokens, {
            amount,
            denom: mainNetworkDenom[selectedAccount.networkId],
            walletAddress: selectedAccount.address,
          });

          toastSuccess({
            subtitle: `${t("stakingModal.success.sub")} 🎉`,
            title: t("stakingModal.success.title"),
          });
        } else if (result.error !== StakeError.None) {
          const handlers: Record<StakeError, () => void> = {
            [StakeError.MinimumAmount]: () => {
              const minimum = result.coin;

              if (getIsCoin(minimum)) {
                notEnoughAmountError(t, minimum);
              }
            },
            [StakeError.None]: () => {},
            [StakeError.NotEnoughGas]: () => {
              notEnoughGasError(t);
            },
            [StakeError.Unknown]: () => {
              displayGenericError(t);
            },
          };

          handlers[result.error]?.();
        }
      })
      .catch(() => {
        displayGenericError(t);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const denom = mainNetworkDenom[account.networkId];

  const availableBalance = (() => {
    if (balance) return balance.coin;

    if (denom) return getEmptyCoin(denom);

    return null;
  })();

  const unbondingPeriod = getUnbondingTimeForNetwork(networkInfo, locale);

  return (
    <ModalBase onClose={onClose} open={isOpen} title={t("stakingModal.title")}>
      <form className={styles.wrapper} onSubmit={onSubmit}>
        <div className={styles.selectGroup}>
          <Label>{t("stakingModal.networkSelect")}</Label>
          <div>
            {selectedAccount && (
              <NetworksSelect disabled={isLoading} variant="accounts" />
            )}
          </div>
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
            <div className={styles.labelValue}>
              {(networkInfo.apy * 100).toFixed(0)}%
            </div>
          </div>
        )}
        {unbondingPeriod && (
          <div className={styles.row}>
            <Label className={styles.apy}>
              <IconInfoCircle
                data-tooltip-content={t("definitions.unbonding", {
                  count: unbondingPeriod.days,
                })}
                data-tooltip-id={tooltipId}
              />{" "}
              {t("stakingModal.unbonding")}
            </Label>
            <div className={styles.labelValue}>
              {t("staking.days", {
                count: unbondingPeriod.days,
              })}
            </div>
          </div>
        )}
        <div className={styles.selectGroup}>
          <Label>{t("stakingModal.walletSellect")}</Label>
          <div>
            {selectedAccount && (
              <NetworksSelect disabled={isLoading} variant="accounts_wallet" />
            )}
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.row}>
            <Label>{t("stakingModal.tokenAmount")}</Label>
            <div>
              {!!availableBalance && (
                <>
                  <Label>{t("stakingModal.available")}</Label>:{" "}
                  <span className={styles.amount}>
                    {formatCoin(availableBalance)}
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
              {...(!!denom && {
                rightText: denom,
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

import BigNumber from "bignumber.js";
import Trans from "next-translate/Trans";
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
import { networksWithMemo } from "@src/screens/staking/lib/staking_sdk/core";
import { mainNetworkDenom } from "@src/screens/staking/lib/staking_sdk/core/base";
import { solanaNetworks } from "@src/screens/staking/lib/staking_sdk/core/solana";
import { formatCoin } from "@src/screens/staking/lib/staking_sdk/formatters";
import { getAccountNormalisedBalance } from "@src/screens/staking/lib/staking_sdk/utils/accounts";
import {
  getEmptyCoin,
  getIsCoin,
  normaliseCoin,
} from "@src/screens/staking/lib/staking_sdk/utils/coins";
import { getUnbondingTimeForNetwork } from "@src/screens/staking/lib/staking_sdk/utils/networks";
import {
  getHasStaked,
  setHasStaked,
} from "@src/screens/staking/lib/staking_sdk/utils/storage";
import {
  MAX_MEMO,
  handleWalletClose,
  minimumStakeAmountMap,
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
  const [hasCompleted, setHasCompleted] = useState(false);

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
        setHasCompleted(false);
      };
    }
  }, [isOpen, selectedAccount, stakingRef]);

  if (!isOpen) return null;

  const account = getSelectedAccount(stakingState);
  const balance = getAccountNormalisedBalance(account);

  if (!account) return null;

  const hasMemo = networksWithMemo.has(account.networkId);

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

    const minimumStakeAmount = minimumStakeAmountMap[selectedAccount.networkId];

    if (minimumStakeAmount) {
      const normalised = normaliseCoin(minimumStakeAmount);

      if (amountNum.lt(normalised.amount)) {
        return t("stakingModal.amountError.notEnough", {
          amount: formatCoin(normalised),
        });
      }
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
      (hasMemo && (memoError || newAmountError || newMemoError))
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

          stakingRef.current.postHog?.capture(PostHogCustomEvent.StakedTokens, {
            amount,
            denom: mainNetworkDenom[selectedAccount.networkId],
            walletAddress: selectedAccount.address,
          });

          if (
            solanaNetworks.has(selectedAccount.networkId) &&
            !getHasStaked()
          ) {
            setHasStaked();
            setHasCompleted(true);

            return;
          }

          setSelectedAccount(stakingRef.current, null, null);

          toastSuccess({
            subtitle: `${t("stakingModal.success.sub")} 🎉`,
            title: t("stakingModal.success.title"),
          });
        } else if (result.error) {
          const handlers: Record<StakeError, () => void> = {
            [StakeError.MinimumAmount]: () => {
              const minimum = result.coin;

              if (getIsCoin(minimum)) {
                notEnoughAmountError(t, minimum);
              }
            },
            [StakeError.None]: () => {
              handleWalletClose(account);
            },
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

  if (hasCompleted) {
    return (
      <ModalBase
        onClose={onClose}
        open={isOpen}
        title={t("stakingModal.complete.titleComplete")}
      >
        <div className={styles.completedWrapper}>
          <img
            alt=""
            className={styles.coinsImg}
            src="/icons/staking_coins.svg"
          />
          <div className={styles.intro}>{t("stakingModal.complete.intro")}</div>
          <div className={styles.blueCard}>
            <img alt="" className={styles.bulb} src="/icons/bulb_stars.svg" />
            <div>
              <div className={styles.tipsTitleWrapper}>
                <span className={styles.tipsTitle}>
                  {t("stakingModal.complete.tips")}
                </span>
                <IconInfoCircle
                  data-tooltip-content={t("stakingModal.complete.tipsTooltip")}
                  data-tooltip-id={tooltipId}
                />
              </div>
              <div className={styles.rewards}>
                {t("stakingModal.complete.release")}
              </div>
              <ul className={styles.tipsList}>
                <li>
                  <Trans
                    components={[<b key="0" />]}
                    i18nKey="stakingModal.complete.desc1Solana"
                    ns="staking"
                  />
                </li>
                <li>
                  <Trans
                    components={[<b key="0" />]}
                    i18nKey="stakingModal.complete.desc2Solana"
                    ns="staking"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <HighlightButton onClick={onClose} pinkShadow size="big">
          {t("common:close")}
        </HighlightButton>
      </ModalBase>
    );
  }

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
        {networksWithMemo.has(account.networkId) && (
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
        )}
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

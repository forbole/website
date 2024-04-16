import BigNumber from "bignumber.js";
import Trans from "next-translate/Trans";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import FormInput from "@src/components/form_input";
import HighlightButton from "@src/components/highlight-button";
import IconWarning from "@src/components/icons/icon_warning.svg";
import IconInfoCircle from "@src/components/icons/info-circle.svg";
import LoadingSpinner from "@src/components/loading_spinner";
import { toastSuccess } from "@src/components/notification";
import { tooltipId } from "@src/components/tooltip";
import {
  displayGenericError,
  notEnoughGasError,
} from "@src/screens/staking/lib/error";
import { useStakingRef } from "@src/screens/staking/lib/staking_sdk/context";
import {
  getNetworkStakingInfo,
  setSelectedAccount,
  syncAccountData,
} from "@src/screens/staking/lib/staking_sdk/context/actions";
import {
  getSelectedAccount,
  getStakeAccountsForNetwork,
} from "@src/screens/staking/lib/staking_sdk/context/selectors";
import type { StakingNetworkInfo } from "@src/screens/staking/lib/staking_sdk/core";
import { networksWithMemo } from "@src/screens/staking/lib/staking_sdk/core";
import { mainNetworkDenom } from "@src/screens/staking/lib/staking_sdk/core/base";
import { solanaNetworks } from "@src/screens/staking/lib/staking_sdk/core/solana";
import { formatCoin } from "@src/screens/staking/lib/staking_sdk/formatters";
import { getAccountNormalisedDelegation } from "@src/screens/staking/lib/staking_sdk/utils/accounts";
import {
  normaliseDenom,
  sumAllCoins,
} from "@src/screens/staking/lib/staking_sdk/utils/coins";
import { getUnbondingTimeForNetwork } from "@src/screens/staking/lib/staking_sdk/utils/networks";
import {
  getHasUnstaked,
  setHasUnstaked,
} from "@src/screens/staking/lib/staking_sdk/utils/storage";
import {
  MAX_MEMO,
  unstake,
} from "@src/screens/staking/lib/staking_sdk/wallet_operations";
import { UnstakeError } from "@src/screens/staking/lib/staking_sdk/wallet_operations/base";
import { PostHogCustomEvent } from "@src/utils/posthog";

import Label from "./label";
import ModalBase, { ModalError } from "./modal_base";
import NetworksSelect from "./networks_select";
import StakeAccountsSelect from "./stake_accounts_select";
import * as styles from "./unstaking_modal.module.scss";

const possibleStakeAccountStatus = ["activating", "active"];

const UnstakingModal = () => {
  const stakingRef = useStakingRef();

  const { locale } = useRouter();
  const { selectedAction } = stakingRef.current.state;

  const [networkInfo, setNetworkInfo] = useState<null | StakingNetworkInfo>(
    null,
  );

  const [selectedStakeAccount, setSelectedStakeAccount] = useState<
    null | string
  >(null);

  const selectedAccount = getSelectedAccount(stakingRef.current.state);

  const isOpen = !!selectedAccount && selectedAction === "unstake";

  useEffect(() => {
    if (isOpen) {
      setNetworkInfo(null);

      const { networkId } = selectedAccount;

      getNetworkStakingInfo(stakingRef.current, networkId).then((info) => {
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
  const [hasCompleted, setHasCompleted] = useState(false);

  const { state: stakingState } = stakingRef.current;

  const account = getSelectedAccount(stakingState);

  useEffect(() => {
    if (isOpen) {
      return () => {
        setAmount("");
        setAmountError("");
        setMemo("");
        setMemoError("");
        setHasCompleted(false);
      };
    }
  }, [isOpen]);

  const availableAmount = getAccountNormalisedDelegation(account);

  const amountNum = new BigNumber(amount);

  const isValidAmount =
    !amountNum.isNaN() &&
    amountNum.gt(0) &&
    !!availableAmount?.num &&
    amountNum.lte(availableAmount.num);

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

  const stakeAccounts = (
    selectedAccount
      ? getStakeAccountsForNetwork(
          stakingRef.current.state,
          selectedAccount.networkId,
          account?.address,
        )
      : []
  ).filter((acc) => possibleStakeAccountStatus.includes(acc.status));

  const onClose = () => setSelectedAccount(stakingRef.current, null, null);
  const hasMemo = account ? networksWithMemo.has(account?.networkId) : false;

  const onSubmit = (e: any) => {
    e?.preventDefault();

    const selectedStakeAccountObj =
      stakeAccounts.find((acc) => acc.address === selectedStakeAccount) ||
      stakeAccounts?.[0];

    if (newAmountError) {
      setAmountError(newAmountError);
    }

    if (newMemoError !== memoError) {
      setMemoError(newMemoError);
    }

    const hasInputError =
      amountError || newAmountError || (hasMemo && (newMemoError || memoError));

    if (
      !selectedAccount ||
      isLoading ||
      (!selectedStakeAccountObj && hasInputError)
    )
      return;

    setIsLoading(true);

    unstake({
      account: selectedAccount,
      amount: selectedStakeAccountObj?.amount || amount,
      memo,
      stakeAccount: selectedStakeAccountObj,
    })
      .then(async (unstaked) => {
        if (unstaked.success) {
          await syncAccountData(stakingRef.current, selectedAccount);

          stakingRef.current.postHog?.capture(
            PostHogCustomEvent.UnstakedTokens,
            {
              amount,
              denom: mainNetworkDenom[selectedAccount.networkId],
              walletAddress: selectedAccount.address,
            },
          );

          if (
            solanaNetworks.has(selectedAccount.networkId) &&
            !getHasUnstaked()
          ) {
            setHasUnstaked();
            setHasCompleted(true);

            return;
          }

          setSelectedAccount(stakingRef.current, null, null);

          toastSuccess({
            subtitle: t("unstakingModal.success.subtitle"),
            title: t("unstakingModal.success.title", {
              date: unlockedDate?.date,
            }),
          });
        } else if (unstaked.error) {
          const handlers: Record<UnstakeError, () => void> = {
            [UnstakeError.None]: () => {},
            [UnstakeError.NotEnoughGas]: () => {
              notEnoughGasError(t);
            },
            [UnstakeError.Unknown]: () => {
              displayGenericError(t);
            },
          };

          handlers[unstaked.error]?.();
        }
      })
      .catch(() => {
        displayGenericError(t);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const usesStakeAccounts = account?.networkId
    ? solanaNetworks.has(account.networkId)
    : false;

  const delegationProp = account?.info?.delegation;

  const delegation = Array.isArray(delegationProp)
    ? sumAllCoins(delegationProp)
    : delegationProp;

  if (hasCompleted) {
    return (
      <ModalBase
        onClose={onClose}
        open={isOpen}
        title={t("unstakingModal.complete.titleComplete")}
      >
        <div className={styles.completedWrapper}>
          <img
            alt=""
            className={styles.coinsImg}
            src="/icons/unstaking_coins.svg"
          />
          <div className={styles.introWrapper}>
            <div className={styles.intro}>
              {t("unstakingModal.complete.intro")}
            </div>
            <div className={styles.introSub}>
              {t("unstakingModal.complete.introSub")}
            </div>
          </div>
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
                {unlockedDate && (
                  <li>
                    <Trans
                      components={[<b key="0" />]}
                      i18nKey="unstakingModal.complete.desc1Solana"
                      ns="staking"
                      values={{
                        unstakeDate: unlockedDate.date,
                      }}
                    />
                  </li>
                )}
                <li>
                  <Trans
                    components={[<b key="0" />]}
                    i18nKey="unstakingModal.complete.desc2Solana"
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
    <ModalBase
      onClose={onClose}
      open={isOpen}
      title={t("unstakingModal.title")}
    >
      <form className={styles.wrapper} onSubmit={onSubmit}>
        <div className={styles.selectGroup}>
          <Label>{t("unstakingModal.unstakeFrom")}</Label>
          <div>
            {selectedAccount && (
              <NetworksSelect
                accountFilter={
                  solanaNetworks.has(selectedAccount.networkId)
                    ? (acc) =>
                        !!acc.info?.stakeAccounts?.some((a) =>
                          possibleStakeAccountStatus.includes(a.status),
                        )
                    : () => true
                }
                disabled={isLoading}
                variant="accounts_wallet"
              />
            )}
          </div>
        </div>
        {usesStakeAccounts ? (
          <>
            <Label>{t("unstakingModal.amount.labelBase")}</Label>
            <StakeAccountsSelect
              accounts={stakeAccounts}
              disabled={isLoading}
              onChange={setSelectedStakeAccount}
              selectedAccount={selectedStakeAccount}
            />
          </>
        ) : (
          <>
            <div className={styles.row}>
              <Label>{t("unstakingModal.amount.label")}</Label>
              <div>
                {!!delegation?.amount && (
                  <>
                    <Label>{t("unstakingModal.available")}</Label>:{" "}
                    <span className={styles.amount}>
                      {formatCoin(delegation)}
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
              {...(delegation?.denom && {
                rightText: normaliseDenom(delegation.denom),
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
          </>
        )}
        <div className={styles.info}>
          <IconWarning />
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
                {!!selectedAccount?.networkId &&
                  !solanaNetworks.has(selectedAccount.networkId) && (
                    <li>{t("unstakingModal.info3")}</li>
                  )}
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

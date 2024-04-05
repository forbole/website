import useTranslation from "next-translate/useTranslation";
import { useEffect, useMemo, useState } from "react";

import IconChevron from "@src/components/icons/icon_chevron.svg";
import { tooltipId } from "@src/components/tooltip";
import { useStakingRef } from "@src/screens/staking/lib/staking_sdk/context";
import { fetchCoinPriceForNetwork } from "@src/screens/staking/lib/staking_sdk/context/actions";
import type { NetworkClaimableRewards } from "@src/screens/staking/lib/staking_sdk/context/selectors";
import {
  getClaimableRewardsForNetwork,
  getCoinPriceForNetwork,
  getStakeAccountsForNetwork,
  getStakedDataForNetwork,
  getUnbondingTokensForNetwork,
} from "@src/screens/staking/lib/staking_sdk/context/selectors";
import { networkKeyToNetworkId } from "@src/screens/staking/lib/staking_sdk/core";
import type { Coin } from "@src/screens/staking/lib/staking_sdk/core/base";
import {
  formatCoin,
  formatStakedDataUSD,
} from "@src/screens/staking/lib/staking_sdk/formatters";
import type { StakeAccount } from "@src/screens/staking/lib/staking_sdk/staking_client_types";
import type { Network, NetworkKey } from "@src/utils/network_info";

import StakeAccounts, { StakeAccountsNum } from "./stake_accounts";
import * as styles from "./staking_data_box.module.scss";

type PopOverProps = {
  network: Network;
  onFocusContent: (isFocused: boolean) => void;
};

const StakingDataBox = ({ network, onFocusContent }: PopOverProps) => {
  const stakingNetworkId = networkKeyToNetworkId[network.key as NetworkKey];

  const [isDisplayingStakeAccounts, setIsDisplayingStakeAccounts] =
    useState(false);

  const stakingRef = useStakingRef();

  const { t } = useTranslation("staking");

  const setStakeAccountsDisplay = (isDisplayed: boolean) => {
    setIsDisplayingStakeAccounts(isDisplayed);
    onFocusContent(isDisplayed);
  };

  const { claimableRewards, stakeAccounts, stakedData, unbondingTokens } =
    useMemo(() => {
      const result = {
        claimableRewards: null as NetworkClaimableRewards | null,
        stakeAccounts: null as null | StakeAccount[],
        stakedData: null as Coin | null,
        unbondingTokens: null as { period: string; text: string } | null,
      };

      if (!!stakingNetworkId) {
        result.stakeAccounts = getStakeAccountsForNetwork(
          stakingRef.current.state,
          stakingNetworkId,
        );

        result.stakedData = getStakedDataForNetwork(
          stakingRef.current.state,
          stakingNetworkId,
        );

        result.claimableRewards =
          getClaimableRewardsForNetwork(
            stakingRef.current.state,
            stakingNetworkId,
          ) || null;

        const unbonding = getUnbondingTokensForNetwork(
          stakingRef.current.state,
          stakingNetworkId,
        );

        if (unbonding) {
          result.unbondingTokens = {
            period: unbonding.period
              ? new Date(Number(unbonding.period) * 1000).toLocaleString()
              : "",
            text: formatCoin(unbonding.coin, { decimals: 4 }),
          };
        }
      }

      return result;
    }, [stakingNetworkId, stakingRef]);

  useEffect(() => {
    fetchCoinPriceForNetwork(stakingRef.current, stakingNetworkId);
  }, [stakingRef, stakingNetworkId]);

  const displayedRewards = claimableRewards
    ? `+${formatCoin(claimableRewards, { decimals: 4 })}`
    : null;

  const displayedStaked = (() => {
    if (!stakedData || !stakingNetworkId) return null;

    const coinPrice = getCoinPriceForNetwork(
      stakingRef.current.state,
      stakingNetworkId,
    );

    if (!coinPrice) return [formatCoin(stakedData)];

    const stakedDataUSD = formatStakedDataUSD(stakedData, coinPrice);

    return [formatCoin(stakedData), stakedDataUSD].filter(Boolean);
  })();

  if (
    ![
      stakedData,
      claimableRewards,
      unbondingTokens,
      stakeAccounts?.length,
    ].filter(Boolean).length
  ) {
    return null;
  }

  const content = (() => {
    if (isDisplayingStakeAccounts) {
      return (
        <StakeAccounts
          network={network}
          onClose={() => setStakeAccountsDisplay(false)}
        />
      );
    }

    return (
      <>
        {displayedStaked && (
          <div className={styles.total}>
            <div>{t("totalStaked")}</div>
            <div className={styles.totalValue}>
              {displayedStaked.map((item, itemIdx) => (
                <div key={itemIdx}>{item}</div>
              ))}
            </div>
          </div>
        )}
        {!!claimableRewards && (
          <div className={styles.rewards}>
            <div>{t("claimableRewards")}</div>
            <div
              data-tooltip-content={formatCoin(claimableRewards, {
                maximumFractionDigits: 12,
              })}
              data-tooltip-id={tooltipId}
            >
              {displayedRewards}
            </div>
          </div>
        )}
        {!!unbondingTokens && (
          <div className={styles.unbonding}>
            <div>{t("unbondingTokens")}</div>
            <div
              data-tooltip-content={
                !!unbondingTokens.period
                  ? t("popover.unbondingTooltip", {
                      period: unbondingTokens.period,
                    })
                  : ""
              }
              data-tooltip-id={tooltipId}
            >
              {unbondingTokens.text}
            </div>
          </div>
        )}
        {!!stakeAccounts?.length && (
          <div className={styles.stakeAccounts}>
            <div>{t("stakeAccounts")}</div>
            <div className={styles.navWrapper}>
              <StakeAccountsNum>{stakeAccounts.length}</StakeAccountsNum>{" "}
              <button
                className={styles.nav}
                onClick={() => {
                  setStakeAccountsDisplay(true);
                }}
              >
                <IconChevron />
              </button>
            </div>
          </div>
        )}
      </>
    );
  })();

  return <div className={styles.stakingData}>{content}</div>;
};

export default StakingDataBox;

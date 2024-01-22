import type { Coin } from "@cosmjs/stargate";
import { LinearProgress } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import type {
  Dispatch,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
} from "react";
import { useContext, useEffect, useMemo, useState } from "react";

import CtaButton from "@src/components/cta-button";
import EmptyButton from "@src/components/empty-button";
import HighlightButton from "@src/components/highlight-button";
import CloseIcon from "@src/components/icons/icon_cross.svg";
import IconInfoCircle from "@src/components/icons/info-circle.svg";
import { tooltipId } from "@src/components/tooltip";
import type { NetworkClaimableRewards } from "@src/screens/staking/lib/staking_sdk/context";
import {
  StakingContext,
  getAccountsForNetwork,
  getClaimableRewardsForNetwork,
  getCoinPriceForNetwork,
  getHasNetworkSupportedWallet,
  getNetworkStakingInfo,
  getNetworkVotingPower,
  getStakedDataForNetwork,
  setSelectedAccount,
  useStakingRef,
} from "@src/screens/staking/lib/staking_sdk/context";
import {
  WalletId,
  mainNetworkDenom,
  networkKeyToNetworkId,
  networksWithStaking,
} from "@src/screens/staking/lib/staking_sdk/core";
import type {
  Account,
  NetworkInfo,
  StakingNetworkId,
} from "@src/screens/staking/lib/staking_sdk/core";
import {
  formatCoin,
  formatStakedDataUSD,
} from "@src/screens/staking/lib/staking_sdk/formatters";
import { accountHasDelegations } from "@src/screens/staking/lib/staking_sdk/utils/accounts";
import { convertToMoney } from "@src/utils/convert_to_money";
import type { Network, NetworkKey } from "@src/utils/network_info";

import type { ParamsProps } from "../../config";
import * as styles from "./popover.module.scss";

type PopOverProps = {
  canClickNetwork: boolean;
  handleExploreClick: MouseEventHandler<HTMLElement>;
  network: Network;
  networkImage: ReactNode;
  networkSummary?: ParamsProps;
  setShowPopover: Dispatch<SetStateAction<string>>;
};

const PopOver = ({
  canClickNetwork,
  handleExploreClick,
  network,
  networkImage,
  networkSummary,
  setShowPopover,
}: PopOverProps) => {
  const networkNetworkId = networkKeyToNetworkId[network.key as NetworkKey];
  const stakingNetworkId = networkKeyToNetworkId[network.key as NetworkKey];

  const stakingRef = useStakingRef();

  const isStakingSupported = networkNetworkId
    ? networksWithStaking.has(networkNetworkId)
    : false;

  const hasNetworkSupportedWallet =
    isStakingSupported && stakingNetworkId
      ? getHasNetworkSupportedWallet(stakingRef.current.state, stakingNetworkId)
      : false;

  const { t } = useTranslation("staking");

  const [stakingNetworkInfo, setStakingNetworkInfo] =
    useState<NetworkInfo | null>(null);

  const { setState: setStakingState, state: stakingState } =
    useContext(StakingContext);

  const { hasInit } = stakingState;

  useEffect(() => {
    if (stakingNetworkId) {
      getNetworkStakingInfo(stakingRef.current, stakingNetworkId).then(
        (newInfo) => {
          setStakingNetworkInfo(newInfo);
        },
      );
    }
  }, [stakingNetworkId, stakingRef]);

  const { accounts, claimableRewards, stakedData } = useMemo(() => {
    const wallet = WalletId.Keplr;

    const result = {
      accounts: null as Account[] | null,
      claimableRewards: null as NetworkClaimableRewards | null,
      stakedData: null as Coin | null,
    };

    if (!!stakingNetworkId && !!wallet) {
      result.accounts = getAccountsForNetwork(stakingState, stakingNetworkId);

      if (!result.accounts?.length) {
        return result;
      }

      result.stakedData = getStakedDataForNetwork(
        stakingRef.current.state,
        stakingNetworkId,
      );

      result.claimableRewards =
        getClaimableRewardsForNetwork(
          stakingRef.current.state,
          stakingNetworkId,
        ) || null;
    }

    return result;
  }, [stakingState, stakingNetworkId, stakingRef]);

  useEffect(() => {
    getCoinPriceForNetwork(stakingRef.current, stakingNetworkId);
  }, [stakingRef, stakingNetworkId]);

  const accountsWithDelegations = accounts?.filter(accountHasDelegations);

  const displayedRewards = claimableRewards
    ? `+${formatCoin(claimableRewards)}`
    : null;

  const displayedStaked = (() => {
    if (!stakedData || !stakingNetworkId) return null;

    const mainDenom = mainNetworkDenom[stakingNetworkId as StakingNetworkId];

    if (!mainDenom) return [formatCoin(stakedData)];

    const coinPrice = stakingRef.current.state.coinsPrices[mainDenom];

    if (!coinPrice) return [formatCoin(stakedData)];

    const stakedDataUSD = formatStakedDataUSD(stakedData, coinPrice);

    return [formatCoin(stakedData), stakedDataUSD].filter(Boolean);
  })();

  return (
    <div
      className={styles.popover}
      onMouseLeave={() => {
        setShowPopover("");
      }}
    >
      <CloseIcon
        className={styles.closeBtn}
        fontSize="small"
        onClickCapture={() => setShowPopover("")}
      />
      <div>{networkImage}</div>
      {network.name && <div className={styles.name}>{network.name}</div>}
      {(!!stakedData || !!claimableRewards) && (
        <div className={styles.stakingData}>
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
              <div>{displayedRewards}</div>
            </div>
          )}
        </div>
      )}
      {!!networkSummary && (
        <div className={styles.dataBox}>
          {(() => {
            const votingPower = (() => {
              if (stakingNetworkId) {
                const parsedVotingPower = getNetworkVotingPower(
                  stakingRef.current.state,
                  stakingNetworkId,
                );

                if (!parsedVotingPower) return null;

                return parsedVotingPower
                  ? [t("votingPower"), formatCoin(parsedVotingPower, 0)]
                  : null;
              }

              return networkSummary?.bonded > 0
                ? [
                    network.denom?.toUpperCase(),
                    convertToMoney(networkSummary.bonded),
                  ]
                : null;
            })();

            return (
              !!votingPower && (
                <div>
                  <h6 className={styles.label}>
                    <IconInfoCircle
                      data-tooltip-content={t("definitions.votingPower")}
                      data-tooltip-id={tooltipId}
                    />
                    {votingPower[0]}
                  </h6>
                  <span className={styles.value}>{votingPower[1]}</span>
                </div>
              )
            );
          })()}
          {(() => {
            const apy = (() => {
              if (stakingNetworkId) return stakingNetworkInfo?.apy;

              return networkSummary.APY;
            })();

            return (
              !!apy &&
              apy > 0 && (
                <div>
                  <h6 className={styles.label}>
                    <IconInfoCircle
                      data-tooltip-content={t("definitions.apy")}
                      data-tooltip-id={tooltipId}
                    />
                    APY
                  </h6>
                  <span className={styles.value}>{`${Math.round(
                    apy * 100,
                  )}%`}</span>
                </div>
              )
            );
          })()}
          {!!networkSummary.TVL && (
            <div>
              <h6 className={styles.label}>
                <IconInfoCircle
                  data-tooltip-content={t("definitions.tvl")}
                  data-tooltip-id={tooltipId}
                />
                TVL
              </h6>
              <span className={styles.value}>
                ${convertToMoney(networkSummary.TVL)}
              </span>
            </div>
          )}
          {!!networkSummary.custom &&
            Object.keys(networkSummary.custom.content)
              .sort()
              .map((customKey) => (
                <div key={customKey}>
                  <h6 className={styles.label}>
                    <IconInfoCircle
                      data-tooltip-content={
                        networkSummary.custom?.tooltips[customKey]
                      }
                      data-tooltip-id={tooltipId}
                    />
                    {customKey}
                  </h6>
                  <span className={styles.value}>
                    {networkSummary.custom?.content[customKey]}
                  </span>
                </div>
              ))}
        </div>
      )}
      {!hasInit && (
        <LinearProgress className={styles.progress} color="secondary" />
      )}
      <div className={styles.buttons}>
        {isStakingSupported && (
          <>
            {hasInit && (!hasNetworkSupportedWallet || !!accounts?.length) && (
              <HighlightButton
                className={styles.stake}
                data-test="popover-stake-button"
                onClick={() => {
                  if (!hasNetworkSupportedWallet) {
                    setSelectedAccount(
                      stakingRef.current.setState,
                      "connect_wallet",
                      null,
                    );

                    return;
                  }

                  if (!accounts?.length) return;

                  setSelectedAccount(setStakingState, "stake", accounts[0]);
                }}
              >
                {t("popover.stake")}
              </HighlightButton>
            )}
            {!!claimableRewards && !!accounts?.length && (
              <CtaButton
                onClick={() => {
                  setSelectedAccount(
                    setStakingState,
                    "claim_rewards",
                    accounts[0],
                  );
                }}
              >
                {t("popover.claimRewards")}
              </CtaButton>
            )}
          </>
        )}
        {isStakingSupported && !!accountsWithDelegations?.length && (
          <EmptyButton
            onClick={() => {
              setSelectedAccount(
                setStakingState,
                "unstake",
                accountsWithDelegations[0],
              );
            }}
          >
            {t("popover.unstake")}
          </EmptyButton>
        )}
        {canClickNetwork && (
          <EmptyButton onClick={handleExploreClick} withoutBorder>
            {t("popover.networkDetails")}
          </EmptyButton>
        )}
      </div>
    </div>
  );
};

export default PopOver;

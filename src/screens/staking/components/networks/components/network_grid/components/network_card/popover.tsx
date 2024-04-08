import { LinearProgress } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import type {
  Dispatch,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
} from "react";
import { useEffect, useMemo, useRef, useState } from "react";

import CtaButton from "@src/components/cta-button";
import EmptyButton from "@src/components/empty-button";
import HighlightButton from "@src/components/highlight-button";
import CloseIcon from "@src/components/icons/icon_cross.svg";
import IconInfoCircle from "@src/components/icons/info-circle.svg";
import { tooltipId } from "@src/components/tooltip";
import { useStakingRef } from "@src/screens/staking/lib/staking_sdk/context";
import {
  fetchCoinPriceForNetwork,
  getNetworkStakingInfo,
  setSelectedAccount,
} from "@src/screens/staking/lib/staking_sdk/context/actions";
import type { NetworkClaimableRewards } from "@src/screens/staking/lib/staking_sdk/context/selectors";
import {
  getAccountsForNetwork,
  getClaimableRewardsForNetwork,
  getHasNetworkSupportedWallet,
  getNetworkTVL,
  getNetworkVotingPower,
  getStakeAccountsForNetwork,
} from "@src/screens/staking/lib/staking_sdk/context/selectors";
import {
  networkKeyToNetworkId,
  networksWithRewards,
  networksWithStakeAccounts,
  networksWithStaking,
} from "@src/screens/staking/lib/staking_sdk/core";
import type {
  Account,
  StakingNetworkInfo,
} from "@src/screens/staking/lib/staking_sdk/core";
import { formatCoin } from "@src/screens/staking/lib/staking_sdk/formatters";
import type { StakeAccount } from "@src/screens/staking/lib/staking_sdk/staking_client_types";
import {
  accountHasDelegations,
  accountHasRewards,
} from "@src/screens/staking/lib/staking_sdk/utils/accounts";
import { suggestAddWalletNetwork } from "@src/screens/staking/lib/staking_sdk/wallet_operations";
import { convertToMoney } from "@src/utils/convert_to_money";
import type { Network, NetworkKey } from "@src/utils/network_info";

import type { ParamsProps } from "../../config";
import * as styles from "./popover.module.scss";
import StakingDataBox from "./staking_data_box";

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
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const [isContentFocused, setIsContentFocused] = useState(false);

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
    useState<null | StakingNetworkInfo>(null);

  const { state: stakingState } = stakingRef.current;
  const { hasInit } = stakingState;

  useEffect(() => {
    if (!nodeRef.current) return;

    const box = nodeRef.current.getBoundingClientRect();

    if (box.left < 0) {
      (nodeRef.current as HTMLElement).style.left = "0";
    } else if (box.right > window.innerWidth) {
      (nodeRef.current as HTMLElement).style.right = "0";
    }
  }, [nodeRef]);

  useEffect(() => {
    if (stakingNetworkId) {
      getNetworkStakingInfo(stakingRef.current, stakingNetworkId).then(
        (newInfo) => {
          setStakingNetworkInfo(newInfo);
        },
      );
    }
  }, [stakingNetworkId, stakingRef]);

  const {
    accounts,
    activeStakeAccounts,
    claimableRewards,
    inactiveStakeAccounts,
  } = useMemo(() => {
    const result = {
      accounts: null as Account[] | null,
      activeStakeAccounts: null as null | StakeAccount[],
      claimableRewards: null as NetworkClaimableRewards | null,
      inactiveStakeAccounts: null as null | StakeAccount[],
    };

    if (!!stakingNetworkId) {
      result.accounts = getAccountsForNetwork(stakingState, stakingNetworkId);

      if (!result.accounts?.length) {
        return result;
      }

      const allStakeAccounts = getStakeAccountsForNetwork(
        stakingRef.current.state,
        stakingNetworkId,
      );

      result.activeStakeAccounts = allStakeAccounts.filter(
        (acc) => acc.status === "active",
      );

      result.inactiveStakeAccounts = allStakeAccounts.filter(
        (acc) => acc.status === "inactive",
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
    fetchCoinPriceForNetwork(stakingRef.current, stakingNetworkId);
  }, [stakingRef, stakingNetworkId]);

  const accountsWithDelegations = accounts?.filter(accountHasDelegations);
  const accountsWithRewards = accounts?.filter(accountHasRewards);

  const shouldDisplayRewardsButton =
    !!claimableRewards &&
    !!accountsWithRewards?.length &&
    stakingNetworkId &&
    networksWithRewards.has(stakingNetworkId);

  const shouldDisplayWithdrawUnstakeButton =
    !!inactiveStakeAccounts?.length &&
    stakingNetworkId &&
    !networksWithRewards.has(stakingNetworkId);

  return (
    <div
      className={styles.popover}
      onMouseLeave={() => {
        setShowPopover("");
      }}
      ref={nodeRef}
    >
      <CloseIcon
        className={styles.closeBtn}
        fontSize="small"
        onClickCapture={() => setShowPopover("")}
      />
      <div>{networkImage}</div>
      {network.name && <div className={styles.name}>{network.name}</div>}
      <StakingDataBox network={network} onFocusContent={setIsContentFocused} />
      {!!networkSummary && !isContentFocused && (
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
                  ? [
                      t("votingPower"),
                      formatCoin(parsedVotingPower, { decimals: 0 }),
                    ]
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
          {(() => {
            const tvl = (() => {
              if (stakingNetworkId) {
                const networkTVL = getNetworkTVL(
                  stakingRef.current.state,
                  stakingNetworkId,
                );

                if (networkTVL) return networkTVL.toFormat(0);
              }

              if (!networkSummary.TVL) return null;

              return convertToMoney(networkSummary.TVL);
            })();

            return (
              !!tvl && (
                <div>
                  <h6 className={styles.label}>
                    <IconInfoCircle
                      data-tooltip-content={t("definitions.tvl")}
                      data-tooltip-id={tooltipId}
                    />
                    TVL
                  </h6>
                  <span className={styles.value}>${tvl}</span>
                </div>
              )
            );
          })()}
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
            {hasInit && (
              <HighlightButton
                className={styles.stake}
                data-test="popover-stake-button"
                onClick={() => {
                  if (!hasNetworkSupportedWallet) {
                    setSelectedAccount(
                      stakingRef.current,
                      "connect_wallet",
                      null,
                    );

                    return;
                  }

                  if (stakingNetworkId && !accounts?.length) {
                    suggestAddWalletNetwork(
                      stakingRef.current,
                      stakingNetworkId,
                    );

                    return;
                  }

                  if (!accounts?.length) return;

                  setSelectedAccount(stakingRef.current, "stake", accounts[0]);
                }}
                size="big"
              >
                {t("popover.stake")}
              </HighlightButton>
            )}
            {shouldDisplayRewardsButton && (
              <CtaButton
                onClick={() => {
                  setSelectedAccount(
                    stakingRef.current,
                    "claim_rewards",
                    accountsWithRewards[0],
                  );
                }}
              >
                {t("popover.claimRewards")}
              </CtaButton>
            )}
            {shouldDisplayWithdrawUnstakeButton && (
              <EmptyButton
                onClick={() => {
                  const account = getAccountsForNetwork(
                    stakingRef.current.state,
                    stakingNetworkId,
                  ).find(
                    (acc) =>
                      !!acc.info?.stakeAccounts?.find(
                        (s) => s.address === inactiveStakeAccounts[0].address,
                      ),
                  );

                  if (!account) return;

                  setSelectedAccount(
                    stakingRef.current,
                    "withdraw_unstake",
                    account,
                  );
                }}
              >
                {t("popover.withdrawUnstakeAccounts")}
              </EmptyButton>
            )}
            {!!accountsWithDelegations?.length &&
              stakingNetworkId &&
              (!networksWithStakeAccounts.has(stakingNetworkId) ||
                !!activeStakeAccounts?.length) && (
                <EmptyButton
                  onClick={() => {
                    setSelectedAccount(
                      stakingRef.current,
                      "unstake",
                      accountsWithDelegations[0],
                    );
                  }}
                >
                  {t("popover.unstake")}
                </EmptyButton>
              )}
          </>
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

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
import {
  StakingContext,
  getNetworkInfo,
  getStakedDataForNetwork,
  getUserAccountsForNetwork,
  setSelectedAccount,
  useStakingRef,
} from "@src/screens/staking/lib/staking_sdk/context";
import { formatDenom } from "@src/screens/staking/lib/staking_sdk/formatters";
import {
  WalletId,
  networkNameToChainId,
  networksWithStaking,
} from "@src/screens/staking/lib/staking_sdk/types";
import type {
  Account,
  NetworkInfo,
} from "@src/screens/staking/lib/staking_sdk/types";
import { convertToMoney } from "@src/utils/convert_to_money";
import type { Network } from "@src/utils/network_info";

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
  const networkChainId = networkNameToChainId[network.graphql];
  const stakingChainId = networkNameToChainId[network.graphql];

  const stakingRef = useStakingRef();

  const isStakingSupported = networkChainId
    ? networksWithStaking.has(networkChainId)
    : false;

  const { t } = useTranslation("staking");

  const [stakingNetworkInfo, setStakingNetworkInfo] =
    useState<NetworkInfo | null>(null);

  const { setState: setStakingState, state: stakingState } =
    useContext(StakingContext);

  useEffect(() => {
    if (stakingChainId) {
      getNetworkInfo(
        stakingRef.current.setState,
        stakingRef.current.state,
        stakingChainId,
      ).then((newInfo) => {
        setStakingNetworkInfo(newInfo);
      });
    }
  }, [stakingChainId, stakingRef]);

  const { account, chainId, hasRewards, stakedData } = useMemo(() => {
    const wallet = WalletId.Keplr;

    const result = {
      account: null as Account | null,
      chainId: stakingChainId,
      hasRewards: false,
      stakedData: null as null | string,
    };

    if (!!stakingChainId && !!wallet) {
      const accounts = getUserAccountsForNetwork(
        stakingState,
        WalletId.Keplr, // @TODO: This should consider all wallets
        stakingChainId,
      );

      if (!accounts?.length) {
        return result;
      }

      const stakedDataObj = getStakedDataForNetwork(
        stakingRef.current.state,
        stakingChainId,
      );

      if (stakedDataObj) {
        result.stakedData = formatDenom({
          amount: stakedDataObj.amount,
          denom: stakedDataObj.denom,
        });
      }

      const newAccount = accounts.find((a) => !!a.info);

      if (newAccount) {
        result.account = newAccount;
      }

      result.hasRewards = !!accounts.find((a) => !!a.rewards);
    }

    return result;
  }, [stakingState, stakingChainId, stakingRef]);

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
      {/* @TODO: This should be the aggreage of all accounts in all wallets */}
      {network.name && <div className={styles.name}>{network.name}</div>}
      {!!stakedData && (
        <div className={styles.stakingData}>
          {stakedData && (
            <div className={styles.total}>
              <div>Total staked</div>
              <div>{stakedData}</div>
            </div>
          )}
          <div className={styles.rewards}>
            <div>Claimable Rewards</div>
            <div>+223.4 ATOM</div>
          </div>
        </div>
      )}
      {!!networkSummary ? (
        <div className={styles.dataBox}>
          {!!networkSummary.bonded && networkSummary.bonded > 0 && (
            <div>
              <h6 className={styles.label}>
                <IconInfoCircle
                  data-tooltip-content={t("definitions.votingPower")}
                  data-tooltip-id={tooltipId}
                />
                {network.denom?.toUpperCase()}
              </h6>
              <span className={styles.value}>
                {convertToMoney(networkSummary.bonded)}
              </span>
            </div>
          )}
          {(() => {
            const apy = (() => {
              if (stakingChainId) return stakingNetworkInfo?.apy;

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
            Object.keys(networkSummary.custom)
              .sort()
              .map((customKey) => (
                <div key={customKey}>
                  <h6 className={styles.label}>{customKey}</h6>
                  <span className={styles.value}>
                    {networkSummary.custom?.[customKey]}
                  </span>
                </div>
              ))}
        </div>
      ) : (
        <LinearProgress className={styles.progress} color="secondary" />
      )}
      <div className={styles.buttons}>
        {isStakingSupported && !!account?.address && (
          <>
            <HighlightButton
              onClick={() => {
                setSelectedAccount(setStakingState, {
                  address: account.address,
                  chainId,
                  wallet: WalletId.Keplr,
                });

                setStakingState({ selectedAction: "stake" });
              }}
            >
              {t("popover.stake")}
            </HighlightButton>
            {hasRewards && (
              <CtaButton
                onClick={() => {
                  setSelectedAccount(setStakingState, {
                    address: account.address,
                    chainId,
                    wallet: WalletId.Keplr,
                  });

                  setStakingState({ selectedAction: "claim_rewards" });
                }}
              >
                {t("popover.claimRewards")}
              </CtaButton>
            )}
          </>
        )}
        {isStakingSupported && account?.info?.delegation?.amount && (
          <EmptyButton
            onClick={() => {
              setSelectedAccount(setStakingState, {
                address: account.address,
                chainId,
                wallet: WalletId.Keplr,
              });

              setStakingState({ selectedAction: "unstake" });
            }}
          >
            {t("popover.unstake")}
          </EmptyButton>
        )}
        {canClickNetwork && (
          <EmptyButton onClick={handleExploreClick} withoutBorder>
            See network details
          </EmptyButton>
        )}
      </div>
    </div>
  );
};

export default PopOver;

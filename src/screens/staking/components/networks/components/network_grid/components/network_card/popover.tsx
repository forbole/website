import type { Coin } from "@cosmjs/stargate";
import { LinearProgress } from "@mui/material";
import BigNumber from "bignumber.js";
import useTranslation from "next-translate/useTranslation";
import type {
  Dispatch,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
} from "react";
import { useContext, useEffect, useMemo, useRef, useState } from "react";

import CtaButton from "@src/components/cta-button";
import EmptyButton from "@src/components/empty-button";
import HighlightButton from "@src/components/highlight-button";
import CloseIcon from "@src/components/icons/icon_cross.svg";
import IconInfoCircle from "@src/components/icons/info-circle.svg";
import { tooltipId } from "@src/components/tooltip";
import {
  StakingContext,
  getAccountsForNetwork,
  getClaimableRewardsForNetwork,
  getCoinPrice,
  getNetworkStakingInfo,
  getStakedDataForNetwork,
  setSelectedAccount,
  useStakingRef,
} from "@src/screens/staking/lib/staking_sdk/context";
import {
  WalletId,
  coinsDenoms,
  networkKeyToNetworkId,
  networksWithStaking,
} from "@src/screens/staking/lib/staking_sdk/core";
import type {
  Account,
  CoinDenom,
  NetworkInfo,
} from "@src/screens/staking/lib/staking_sdk/core";
import { formatCoin } from "@src/screens/staking/lib/staking_sdk/formatters";
import { accountHasDelegations } from "@src/screens/staking/lib/staking_sdk/utils/accounts";
import { resolveCoin } from "@src/screens/staking/lib/staking_sdk/utils/coins";
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
  const [coinPrice, setCoinPrice] = useState<null | string>(null);
  const requestingCoinPrice = useRef("");

  const stakingRef = useStakingRef();

  const isStakingSupported = networkNetworkId
    ? networksWithStaking.has(networkNetworkId)
    : false;

  const { t } = useTranslation("staking");

  const [stakingNetworkInfo, setStakingNetworkInfo] =
    useState<NetworkInfo | null>(null);

  const { setState: setStakingState, state: stakingState } =
    useContext(StakingContext);

  const { hasInit } = stakingState;

  useEffect(() => {
    if (stakingNetworkId) {
      getNetworkStakingInfo(
        stakingRef.current.setState,
        stakingRef.current.state,
        stakingNetworkId,
      ).then((newInfo) => {
        setStakingNetworkInfo(newInfo);
      });
    }
  }, [stakingNetworkId, stakingRef]);

  const { accounts, claimableRewards, stakedData } = useMemo(() => {
    const wallet = WalletId.Keplr;

    const result = {
      accounts: null as Account[] | null,
      claimableRewards: null as Coin | null,
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

      result.claimableRewards = getClaimableRewardsForNetwork(
        stakingRef.current.state,
        stakingNetworkId,
      );
    }

    return result;
  }, [stakingState, stakingNetworkId, stakingRef]);

  // @TODO: move some logic to the sdk
  useEffect(() => {
    if (!claimableRewards?.denom) return;

    const resolvedCoin = resolveCoin({
      amount: "0",
      denom: claimableRewards.denom,
    });

    const parsedDenom = resolvedCoin.denom?.toLowerCase() as CoinDenom;

    if (
      parsedDenom &&
      coinsDenoms.has(parsedDenom) &&
      requestingCoinPrice.current !== parsedDenom
    ) {
      requestingCoinPrice.current = parsedDenom;

      (async () => {
        const coinPriceRespose = await getCoinPrice(
          stakingRef.current.state,
          stakingRef.current.setState,
          parsedDenom,
        );

        setCoinPrice(coinPriceRespose ?? null);

        requestingCoinPrice.current = "";
      })();
    }
  }, [claimableRewards?.denom, stakingRef]);

  const accountsWithDelegations = accounts?.filter(accountHasDelegations);

  // @TODO: Move to sdk
  const displayedRewards = (() => {
    if (!claimableRewards) return null;

    if (!coinPrice) return formatCoin(claimableRewards);

    const coinNum = new BigNumber(claimableRewards.amount);
    const coinValue = coinNum.multipliedBy(new BigNumber(coinPrice));

    return `${coinValue.toFormat(5)} USD`;
  })();

  const displayedStaked = (() => {
    if (!stakedData) return null;

    if (!coinPrice) return [formatCoin(stakedData)];

    const coinNum = new BigNumber(stakedData.amount);
    const coinValue = coinNum.multipliedBy(new BigNumber(coinPrice));

    return [formatCoin(stakedData), `≈ ${coinValue.toFormat(5)} USD`];
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
              <div>
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
      )}
      {!hasInit && (
        <LinearProgress className={styles.progress} color="secondary" />
      )}
      <div className={styles.buttons}>
        {isStakingSupported && !!accounts?.length && (
          <>
            <HighlightButton
              className={styles.stake}
              data-test="popover-stake-button"
              onClick={() => {
                setSelectedAccount(setStakingState, "stake", accounts[0]);
              }}
            >
              {t("popover.stake")}
            </HighlightButton>
            {!!claimableRewards && (
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

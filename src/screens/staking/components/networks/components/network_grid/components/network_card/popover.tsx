import { LinearProgress } from "@mui/material";
import type {
  Dispatch,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
} from "react";
import { useContext, useMemo } from "react";

import CloseIcon from "@src/components/icons/icon_cross.svg";
import IconInfoCircle from "@src/components/icons/info-circle.svg";
import { toastError, toastSuccess } from "@src/components/notification";
import { tooltipId } from "@src/components/tooltip";
import type { Account } from "@src/screens/staking/lib/context";
import {
  StakingContext,
  WalletId,
  getUserAccountsForNetwork,
  networkNameToChainId,
  networksWithStaking,
  setSelectedAccount,
} from "@src/screens/staking/lib/context";
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
  const isStakingSupported = networksWithStaking.has(network.graphql);

  const { setState: setStakingState, state: stakingState } =
    useContext(StakingContext);

  const { account, chainId, hasRewards } = useMemo(() => {
    const wallet = WalletId.Keplr;
    const newChainId = networkNameToChainId[network.graphql];

    const result = {
      account: null as Account | null,
      chainId: newChainId,
      hasRewards: false,
    };

    if (!!newChainId && !!wallet) {
      const accounts = getUserAccountsForNetwork(
        stakingState,
        WalletId.Keplr, // @TODO
        newChainId,
      );

      if (!accounts?.length) {
        return result;
      }

      const newAccount = accounts.find((a) => !!a.info);

      if (newAccount) {
        result.account = newAccount;
      }

      result.hasRewards = !!accounts.find((a) => !!a.rewards);
    }

    return result;
  }, [network, stakingState]);

  return (
    <div
      className={[styles.popover].join(" ")}
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
      {!!account?.info && (
        <div style={{ border: "1px solid black" }}>
          <div>Staking data</div>
          {!!account.info.delegation && (
            <div>Delegation: {JSON.stringify(account.info.delegation)}</div>
          )}
        </div>
      )}
      {!!networkSummary ? (
        <div className={styles.dataBox}>
          {!!networkSummary.bonded && networkSummary.bonded > 0 && (
            <div>
              <h6 className={styles.label}>
                <IconInfoCircle
                  data-tooltip-content="Foo Tooltip"
                  data-tooltip-id={tooltipId}
                />
                {network.denom?.toUpperCase()}
              </h6>
              <span className={styles.value}>
                {convertToMoney(networkSummary.bonded)}
              </span>
            </div>
          )}
          {!!networkSummary.APY && networkSummary.APY > 0 && (
            <div>
              <h6 className={styles.label}>
                <IconInfoCircle />
                APY
              </h6>
              <span className={styles.value}>{`${Math.round(
                networkSummary.APY * 100,
              )}%`}</span>
            </div>
          )}
          {!!networkSummary.TVL && (
            <div>
              <h6 className={styles.label}>
                <IconInfoCircle />
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
      {isStakingSupported && !!account?.address && (
        <>
          <button
            onClick={() => {
              setSelectedAccount(setStakingState, {
                address: account.address,
                chainId,
                wallet: WalletId.Keplr,
              });

              setStakingState({ selectedAction: "stake" });
            }}
          >
            Stake Now
          </button>
          {hasRewards && (
            <button
              onClick={() => {
                toastSuccess({
                  title: "Rewards claimed",
                });
              }}
            >
              Claim Rewards
            </button>
          )}
        </>
      )}
      {isStakingSupported && account?.info?.delegation?.amount && (
        <button
          onClick={() => {
            toastError({
              title: "Unstake",
            });
          }}
        >
          Unstake
        </button>
      )}
      {canClickNetwork && (
        <button onClick={handleExploreClick}>See network details</button>
      )}
    </div>
  );
};

export default PopOver;
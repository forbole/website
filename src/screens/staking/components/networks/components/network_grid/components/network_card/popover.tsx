import { LinearProgress } from "@mui/material";
import type {
  Dispatch,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
} from "react";
import { useContext } from "react";

import { CloseIcon } from "@src/components/icons";
import IconInfoCircle from "@src/components/icons/info-circle.svg";
import { toastError, toastSuccess } from "@src/components/notification";
import { tooltipId } from "@src/components/tooltip";
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
  // @TODO: Check if the user has an account on the network
  const isStakingSupported = networksWithStaking.has(network.name);

  const { setState: setStakingState, state: stakingState } =
    useContext(StakingContext);

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
      <div style={{ border: "1px solid black" }}>Staking data</div>
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
      {isStakingSupported && (
        <>
          <button
            onClick={() => {
              // @TODO
              const wallet = WalletId.Keplr;
              const chainId = networkNameToChainId[network.name];

              if (!chainId || !wallet) {
                return;
              }

              const accounts = getUserAccountsForNetwork(
                stakingState,
                WalletId.Keplr, // @TODO
                chainId,
              );

              if (!accounts?.length) {
                return;
              }

              const address = accounts[0].address;

              setSelectedAccount(setStakingState, { address, chainId, wallet });
              setStakingState({ selectedAction: "stake" });
            }}
          >
            Stake Now
          </button>
          <button
            onClick={() => {
              toastSuccess({
                title: "Rewards claimed",
              });
            }}
          >
            Claim Rewards
          </button>
        </>
      )}
      {canClickNetwork && (
        <button onClick={handleExploreClick}>See network details</button>
      )}
      {isStakingSupported && (
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
    </div>
  );
};

export default PopOver;

import useTranslation from "next-translate/useTranslation";
import { memo, useState } from "react";

import HighlightButton from "@src/components/highlight-button";
import IconMobile from "@src/components/icons/icon_mobile.svg";
import IconPlus from "@src/components/icons/icon_plus.svg";
import IconKeplr from "@src/components/icons/keplr.svg";
import LoadingSpinner from "@src/components/loading_spinner";
import { useStakingRef } from "@src/screens/staking/lib/context";
import type { TStakingContext } from "@src/screens/staking/lib/context/types";

import { useInitStaking } from "../hooks";
import ClaimRewardsModal from "../staking_section/claim_rewards_modal";
import StakingModal from "../staking_section/staking_modal";
import UnstakingModal from "../staking_section/unstaking_modal";
import * as styles from "./index.module.scss";

type Props = {
  hasInit: boolean;
  wallets: TStakingContext["state"]["wallets"];
};

const StakingWidgetBase = ({ hasInit, wallets }: Props) => {
  const { t } = useTranslation("staking");
  const [isOpen, setIsOpen] = useState(false);
  const walletsIds = Object.keys(wallets).sort();

  if (!hasInit || !walletsIds.length) {
    return (
      <HighlightButton className={styles.connectButton}>
        {hasInit ? t("stakingWidget.connectWallet") : <LoadingSpinner />}
      </HighlightButton>
    );
  }

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.trigger}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <IconKeplr />
      </button>
      <div className={[styles.dropdown, isOpen ? styles.open : ""].join(" ")}>
        <div className={styles.header}>
          <div>
            {t("stakingWidget.connected", {
              count: walletsIds.length,
            })}
          </div>
          <span>
            <IconPlus />
          </span>
          <span>
            <IconMobile />
          </span>
        </div>
        {walletsIds.map((walletId) => {
          const walletName = wallets[walletId as keyof typeof wallets]?.name;

          return (
            <div key={walletId}>
              {walletName} - {walletId}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const StakingComponent = memo(StakingWidgetBase);

const StakingWidgetContainer = () => {
  const stakingRef = useStakingRef();
  const { state: stakingState } = stakingRef.current;

  useInitStaking();

  return (
    <>
      <StakingComponent
        hasInit={stakingState.hasInit}
        wallets={stakingState.wallets}
      />
      <StakingModal />
      <UnstakingModal />
      <ClaimRewardsModal />
    </>
  );
};

export default StakingWidgetContainer;

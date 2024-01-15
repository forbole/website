import useTranslation from "next-translate/useTranslation";
import { memo, useCallback, useState } from "react";

import HighlightButton from "@src/components/highlight-button";
import IconMobile from "@src/components/icons/icon_mobile.svg";
import IconPlus from "@src/components/icons/icon_plus.svg";
import LoadingSpinner from "@src/components/loading_spinner";
import { useStakingRef } from "@src/screens/staking/lib/context";
import type {
  TStakingContext,
  WalletId,
} from "@src/screens/staking/lib/context/types";

import { getWalletName, walletsIcons } from "../../lib/wallet_info";
import { useInitStaking } from "../hooks";
import ClaimRewardsModal from "../staking_section/claim_rewards_modal";
import ConnectWalletModal from "../staking_section/connect_wallet_modal";
import StakingModal from "../staking_section/staking_modal";
import UnstakingModal from "../staking_section/unstaking_modal";
import * as styles from "./index.module.scss";

type Props = {
  hasInit: boolean;
  onConnectWallet: () => void;
  wallets: TStakingContext["state"]["wallets"];
};

const StakingWidgetBase = ({ hasInit, onConnectWallet, wallets }: Props) => {
  const { t } = useTranslation("staking");
  const [isOpen, setIsOpen] = useState(false);
  const walletsIds = Object.keys(wallets).sort() as WalletId[];

  const canConnectMoreWallets = true; // @TODO

  if (!hasInit || !walletsIds.length) {
    return (
      <HighlightButton
        className={styles.connectButton}
        onClick={hasInit ? onConnectWallet : undefined}
      >
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
        {walletsIds.map((walletId) => {
          const WalletIcon = walletsIcons[walletId];

          return <WalletIcon key={walletId} />;
        })}
      </button>
      <div className={[styles.dropdown, isOpen ? styles.open : ""].join(" ")}>
        <div className={styles.header}>
          <div>
            {t("stakingWidget.connected", {
              count: walletsIds.length,
            })}
          </div>
          {canConnectMoreWallets && (
            <button className={styles.clickableIcon} onClick={onConnectWallet}>
              <IconPlus />
            </button>
          )}
          <button className={styles.clickableIcon}>
            <IconMobile />
          </button>
        </div>
        {walletsIds.map((walletId) => {
          const walletUserName =
            wallets[walletId as keyof typeof wallets]?.name;

          const WalletIcon = walletsIcons[walletId];
          const walletName = getWalletName(walletId, t);

          return (
            <div className={styles.walletRow} key={walletId}>
              <WalletIcon />
              <div className={styles.walletContent}>
                <div>{walletUserName}</div>
                <div className={styles.subtitle}>{walletName}</div>
              </div>
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

  const onConnectWallet = useCallback(() => {
    stakingRef.current.setState({
      selectedAccount: undefined,
      selectedAction: "connect_wallet",
    });
  }, [stakingRef]);

  return (
    <>
      <StakingComponent
        hasInit={stakingState.hasInit}
        onConnectWallet={onConnectWallet}
        wallets={stakingState.wallets}
      />
      <StakingModal />
      <UnstakingModal />
      <ClaimRewardsModal />
      <ConnectWalletModal />
    </>
  );
};

export default StakingWidgetContainer;

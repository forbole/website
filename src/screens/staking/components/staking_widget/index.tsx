import { Menu } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { memo, useCallback, useState } from "react";

import HighlightButton from "@src/components/highlight-button";
import IconChevron from "@src/components/icons/icon_chevron.svg";
import IconMobile from "@src/components/icons/icon_logout.svg";
import IconPlus from "@src/components/icons/icon_plus.svg";
import LoadingSpinner from "@src/components/loading_spinner";
import { tooltipId } from "@src/components/tooltip";
import {
  disconnectAllWallets,
  getCanAddWallet,
  useStakingRef,
} from "@src/screens/staking/lib/staking_sdk/context";
import type {
  TStakingContext,
  Wallet,
  WalletId,
} from "@src/screens/staking/lib/staking_sdk/types";

import { getWalletName, walletsIcons } from "../../lib/wallet_info";
import { useInitStaking } from "../hooks";
import ClaimRewardsModal from "../staking_section/claim_rewards_modal";
import ConnectWalletModal from "../staking_section/connect_wallet_modal";
import StakingModal from "../staking_section/staking_modal";
import UnstakingModal from "../staking_section/unstaking_modal";
import * as styles from "./index.module.scss";

type WalletRowProps = {
  wallet: undefined | Wallet;
};

const WalletRow = ({ wallet }: WalletRowProps) => {
  const { t } = useTranslation("staking");

  const [isOpen, setIsOpen] = useState(false);
  const walletUserName = wallet?.name;
  const walletId = wallet?.wallet;

  if (!walletId) {
    return null;
  }

  const WalletIcon = walletsIcons[walletId];
  const walletName = getWalletName(walletId, t);

  return (
    <div className={styles.walletRow} key={walletId}>
      <WalletIcon />
      <div className={styles.walletContent}>
        <div>{walletUserName}</div>
        <div className={styles.subtitle}>{walletName}</div>
      </div>
      <span className={[styles.expand, isOpen ? styles.open : ""].join(" ")}>
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <IconChevron />
        </button>
      </span>
    </div>
  );
};

type Props = {
  canConnectMoreWallets: boolean;
  hasInit: boolean;
  onConnectWallet: () => void;
  onDisconnectWallets: () => Promise<void>;
  wallets: TStakingContext["state"]["wallets"];
};

const StakingWidgetBase = ({
  canConnectMoreWallets,
  hasInit,
  onConnectWallet,
  onDisconnectWallets,
  wallets,
}: Props) => {
  const { t } = useTranslation("staking");
  const walletsIds = Object.keys(wallets).sort() as WalletId[];

  const [anchor, setAnchor] = useState<Element>();
  const onClose = useCallback(() => setAnchor(undefined), [setAnchor]);

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
        onClick={(e) => {
          setAnchor(e.currentTarget);
        }}
      >
        {walletsIds.map((walletId) => {
          const WalletIcon = walletsIcons[walletId];

          return <WalletIcon key={walletId} />;
        })}
      </button>
      <Menu
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          className: styles.paper,
        }}
        anchorEl={anchor}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
        keepMounted
        onClose={onClose}
        open={!!anchor}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
      >
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
          <button
            className={styles.clickableIcon}
            data-tooltip-content={t("stakingWidget.disconnectWallets")}
            data-tooltip-id={tooltipId}
            onClick={() =>
              onDisconnectWallets().then(() => {
                onClose();
              })
            }
          >
            <IconMobile />
          </button>
        </div>
        <div className={styles.list}>
          {walletsIds.map((walletId) => (
            <WalletRow key={walletId} wallet={wallets[walletId]} />
          ))}
        </div>
      </Menu>
    </div>
  );
};

const StakingComponent = memo(StakingWidgetBase);

const StakingWidgetContainer = () => {
  const stakingRef = useStakingRef();
  const { state: stakingState } = stakingRef.current;

  useInitStaking();

  const onDisconnectWallets = useCallback(async () => {
    await disconnectAllWallets(stakingRef.current.setState);
  }, [stakingRef]);

  const onConnectWallet = useCallback(() => {
    stakingRef.current.setState({
      selectedAccount: undefined,
      selectedAction: "connect_wallet",
    });
  }, [stakingRef]);

  const canConnectMoreWallets = getCanAddWallet(stakingRef.current.state);

  return (
    <>
      <StakingComponent
        canConnectMoreWallets={canConnectMoreWallets}
        hasInit={stakingState.hasInit}
        onConnectWallet={onConnectWallet}
        onDisconnectWallets={onDisconnectWallets}
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

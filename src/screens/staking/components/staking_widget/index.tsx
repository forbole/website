import { Menu } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { memo, useCallback, useState } from "react";

import HighlightButton from "@src/components/highlight-button";
import IconMobile from "@src/components/icons/icon_logout.svg";
import IconPlus from "@src/components/icons/icon_plus.svg";
import LoadingSpinner from "@src/components/loading_spinner";
import { tooltipId } from "@src/components/tooltip";
import type { TStakingContext } from "@src/screens/staking/lib/staking_sdk/context";
import { useStakingRef } from "@src/screens/staking/lib/staking_sdk/context";
import {
  disconnectWallet,
  setSelectedAccount,
} from "@src/screens/staking/lib/staking_sdk/context/actions";
import { getCanAddWallet } from "@src/screens/staking/lib/staking_sdk/context/selectors";
import type { Wallet } from "@src/screens/staking/lib/staking_sdk/core";
import type { WalletId } from "@src/screens/staking/lib/staking_sdk/core/base";
import {
  getWalletName,
  walletsIcons,
} from "@src/screens/staking/lib/wallet_info";

import { useInitStaking } from "../hooks";
import ClaimRewardsModal from "../staking_section/claim_rewards_modal";
import ConnectWalletModal from "../staking_section/connect_wallet_modal";
import StakingModal from "../staking_section/staking_modal";
import UnstakingModal from "../staking_section/unstaking_modal";
import * as styles from "./index.module.scss";

type WalletRowProps = {
  onDisconnect: () => void;
  wallet: undefined | Wallet;
};

const WalletRow = ({ onDisconnect, wallet }: WalletRowProps) => {
  const { t } = useTranslation("staking");

  const walletUserName = wallet?.name;
  const walletId = wallet?.wallet;

  if (!walletId) {
    return null;
  }

  const WalletIcon = walletsIcons[walletId];
  const walletName = getWalletName(walletId, t);

  return (
    <div className={styles.walletRow} key={walletId}>
      <WalletIcon className={styles.walletIcon} />
      <div className={styles.walletContent}>
        <div>{walletUserName}</div>
        <div className={styles.subtitle}>{walletName}</div>
      </div>
      <button
        className={styles.clickableIcon}
        data-tooltip-content={t("stakingWidget.disconnectWallet")}
        data-tooltip-id={tooltipId}
        onClick={onDisconnect}
      >
        <IconMobile />
      </button>
    </div>
  );
};

type Props = {
  canConnectMoreWallets: boolean;
  hasInit: boolean;
  onConnectWallet: () => void;
  onDisconnectWallet: (walletId: WalletId) => Promise<void>;
  wallets: TStakingContext["state"]["wallets"];
};

const StakingWidgetBase = ({
  canConnectMoreWallets,
  hasInit,
  onConnectWallet,
  onDisconnectWallet,
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
        {walletsIds.slice(0, 3).map((walletId) => {
          const WalletIcon = walletsIcons[walletId];

          return <WalletIcon key={walletId} />;
        })}
      </button>
      <Menu
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorEl={anchor}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
        keepMounted
        onClose={onClose}
        open={!!anchor}
        slotProps={{
          paper: {
            className: styles.paper,
          },
        }}
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
            <button
              className={styles.clickableIcon}
              data-tooltip-content={t("stakingWidget.addWallet")}
              data-tooltip-id={tooltipId}
              onClick={onConnectWallet}
            >
              <IconPlus />
            </button>
          )}
        </div>
        <div className={styles.list}>
          {walletsIds.map((walletId) => (
            <WalletRow
              key={walletId}
              onDisconnect={() => onDisconnectWallet(walletId).then(onClose)}
              wallet={wallets[walletId]}
            />
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

  const onDisconnectWallet = useCallback(
    async (walletId: WalletId) => {
      await disconnectWallet(stakingRef.current, walletId);
    },
    [stakingRef],
  );

  const onConnectWallet = useCallback(() => {
    setSelectedAccount(stakingRef.current, "connect_wallet", null);
  }, [stakingRef]);

  const canConnectMoreWallets = getCanAddWallet(stakingRef.current.state);

  return (
    <>
      <StakingComponent
        canConnectMoreWallets={canConnectMoreWallets}
        hasInit={stakingState.hasInit}
        onConnectWallet={onConnectWallet}
        onDisconnectWallet={onDisconnectWallet}
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

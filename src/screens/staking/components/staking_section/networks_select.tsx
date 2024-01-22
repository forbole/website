import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import useTranslation from "next-translate/useTranslation";

import { toastSuccess } from "@src/components/notification";
import { useMiddleEllipsis } from "@src/hooks/use_middle_ellipsis";
import {
  getClaimableRewardsForNetwork,
  getSelectedAccount,
  getWalletAccounts,
  setSelectedAccount,
  useStakingRef,
} from "@src/screens/staking/lib/staking_sdk/context";
import type {
  Account,
  StakingNetworkId,
} from "@src/screens/staking/lib/staking_sdk/core";
import { networkIdToNetworkKey } from "@src/screens/staking/lib/staking_sdk/core";
import { formatCoin } from "@src/screens/staking/lib/staking_sdk/formatters";
import {
  accountHasRewards,
  getAccountNormalisedBalance,
} from "@src/screens/staking/lib/staking_sdk/utils/accounts";
import { walletsIcons } from "@src/screens/staking/lib/wallet_info";
import type { NetworkKey } from "@src/utils/network_info";
import { getNetworkInfo } from "@src/utils/network_info";

import * as styles from "./networks_select.module.scss";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const IconComponent = () => null;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type NetworkItemProps = {
  denom: string;
  rightSide?: React.ReactNode;
  value: StakingNetworkId;
};

const SEPARATOR = "____";

const NetworkItem = ({ denom, rightSide, value }: NetworkItemProps) => {
  const networkName = networkIdToNetworkKey[value];

  const networkInfo = networkName
    ? getNetworkInfo(networkName as NetworkKey)
    : "";

  const imgSrc = networkInfo ? networkInfo.image : "";
  const name = networkInfo ? networkInfo.name : "";

  return (
    <div className={styles.row}>
      {!!imgSrc && <img alt="" className={styles.logo} src={imgSrc} />}
      <div className={styles.content}>
        <div>{denom}</div>
        <div>{name}</div>
      </div>
      {rightSide}
    </div>
  );
};

type WalletItemProps = {
  account: Account;
  walletName?: string;
};

const WalletItem = ({ account, walletName }: WalletItemProps) => {
  const { wallet } = account;
  const { t } = useTranslation("staking");
  const WalletIcon = walletsIcons[wallet];
  const parsedAddress = useMiddleEllipsis(account.address, 15);

  return (
    <div className={styles.row}>
      {!!WalletIcon && <WalletIcon className={styles.logo} />}
      <div className={styles.content}>
        <div>{walletName}</div>
        <button
          className={styles.address}
          onClick={(e) => {
            e.preventDefault();
            navigator.clipboard.writeText(account.address);

            toastSuccess({
              title: t("addressCopied"),
            });
          }}
        >
          {parsedAddress}
        </button>
      </div>
    </div>
  );
};

type Props = {
  disabled?: boolean;
  variant: "accounts_wallet" | "accounts_with_rewards" | "accounts";
};

const NetworksSelect = ({ disabled, variant }: Props) => {
  const stakingRef = useStakingRef();

  const { setState: setStakingState, state: stakingState } = stakingRef.current;

  const selectedAccount = getSelectedAccount(stakingState);

  if (!variant || !selectedAccount) return null;

  const isRewards = variant === "accounts_with_rewards";
  const isWallet = variant === "accounts_wallet";

  if (isWallet) {
    const walletName =
      stakingRef.current.state.wallets[selectedAccount.wallet]?.name;

    return (
      <div className={styles.singleItem}>
        <WalletItem account={selectedAccount} walletName={walletName} />
      </div>
    );
  }

  const allAccounts = getWalletAccounts(stakingState, selectedAccount.wallet);

  const availableAccounts = allAccounts.filter(
    isRewards ? accountHasRewards : () => true,
  );

  const handleChange = (event: any) => {
    const [address, networkId] = event.target.value.split(SEPARATOR);

    setSelectedAccount(
      setStakingState,
      stakingRef.current.state.selectedAction,
      {
        address,
        networkId,
        wallet: selectedAccount.wallet,
      },
    );
  };

  const selectedItem = [
    selectedAccount.address,
    selectedAccount.networkId,
  ].join(SEPARATOR);

  return (
    <div className={styles.control}>
      <Select
        IconComponent={IconComponent}
        MenuProps={MenuProps}
        className={styles.select}
        disabled={disabled}
        onChange={handleChange}
        value={selectedItem}
      >
        {availableAccounts.map((account) => {
          const item = [account.address, account.networkId].join(SEPARATOR);
          const balance = getAccountNormalisedBalance(account);

          if (!balance) return null;

          const rightSide = (() => {
            if (!isRewards) return null;

            const rewards = getClaimableRewardsForNetwork(
              stakingRef.current.state,
              account.networkId,
            );

            if (!rewards) return null;

            return <div className={styles.rewards}>+{formatCoin(rewards)}</div>;
          })();

          return (
            <MenuItem key={item} value={item}>
              <NetworkItem
                denom={balance.coin.denom}
                rightSide={rightSide}
                value={account.networkId}
              />
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};

export default NetworksSelect;

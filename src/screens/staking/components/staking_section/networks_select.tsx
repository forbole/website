import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import BigNumber from "bignumber.js";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";

import { toastSuccess } from "@src/components/notification";
import { tooltipId } from "@src/components/tooltip";
import { useMiddleEllipsis } from "@src/hooks/use_middle_ellipsis";
import { useStakingRef } from "@src/screens/staking/lib/staking_sdk/context";
import { setSelectedAccount } from "@src/screens/staking/lib/staking_sdk/context/actions";
import {
  getAllAccounts,
  getSelectedAccount,
  getWalletCustomName,
} from "@src/screens/staking/lib/staking_sdk/context/selectors";
import type { Account } from "@src/screens/staking/lib/staking_sdk/core";
import {
  networkIdToNetworkKey,
  walletsSupported,
} from "@src/screens/staking/lib/staking_sdk/core";
import type { StakingNetworkId } from "@src/screens/staking/lib/staking_sdk/core/base";
import { mainNetworkDenom } from "@src/screens/staking/lib/staking_sdk/core/base";
import { formatCoin } from "@src/screens/staking/lib/staking_sdk/formatters";
import {
  getClaimableRewardsForAccount,
  sortAccountsByNetworkName,
} from "@src/screens/staking/lib/staking_sdk/utils/accounts";
import { getEmptyCoin } from "@src/screens/staking/lib/staking_sdk/utils/coins";
import { walletsIcons } from "@src/screens/staking/lib/wallet_info";
import { getNetworkInfo } from "@src/utils/network_info";

import * as styles from "./networks_select.module.scss";
import { IconComponent, MenuProps, selectStyles } from "./select_base";

type NetworkItemProps = {
  denom: string;
  rightSide?: React.ReactNode;
  value: StakingNetworkId;
};

const SEPARATOR = "____";

const NetworkItem = ({ denom, rightSide, value }: NetworkItemProps) => {
  const networkName = networkIdToNetworkKey[value];

  const networkInfo = networkName ? getNetworkInfo(networkName) : "";

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
  isOpened: boolean;
  walletName?: string;
};

const WalletItem = ({ account, isOpened, walletName }: WalletItemProps) => {
  const { wallet } = account;
  const { t } = useTranslation("staking");
  const WalletIcon = walletsIcons[wallet];
  const parsedAddress = useMiddleEllipsis(account.address, 10);

  return (
    <div
      className={styles.row}
      data-test={`networks-select-wallet-${account.wallet}`}
    >
      {!!WalletIcon && <WalletIcon className={styles.logo} />}
      <div className={styles.content}>
        <div>{walletName}</div>
        <div className={styles.addressWrap}>
          <button
            className={[
              styles.address,
              !isOpened ? styles.clickable : undefined,
            ].join(" ")}
            data-tooltip-content={account.address}
            data-tooltip-id={tooltipId}
            onClick={
              isOpened
                ? undefined
                : (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    navigator.clipboard.writeText(account.address);

                    toastSuccess({
                      title: t("addressCopied"),
                    });
                  }
            }
            type="button"
          >
            {parsedAddress}
          </button>
        </div>
      </div>
    </div>
  );
};

type Props = {
  accountFilter?: (account: Account) => boolean;
  disabled?: boolean;
  variant: "accounts_wallet" | "accounts_with_rewards" | "accounts";
};

const NetworksSelect = ({ accountFilter, disabled, variant }: Props) => {
  const stakingRef = useStakingRef();

  const { state: stakingState } = stakingRef.current;

  const selectedAccount = getSelectedAccount(stakingState);
  const [isOpened, setIsOpened] = useState(false);

  if (!variant || !selectedAccount) return null;

  const isRewards = variant === "accounts_with_rewards";

  const isWallet = variant === "accounts_wallet";

  const allAccounts = getAllAccounts(stakingState);

  const handleChange = (event: any) => {
    const [address, networkId, wallet] = event.target.value.split(SEPARATOR);

    setSelectedAccount(
      stakingRef.current,
      stakingRef.current.state.selectedAction,
      {
        address,
        networkId,
        wallet,
      },
    );
  };

  const selectedItem = [
    selectedAccount.address,
    selectedAccount.networkId,
    selectedAccount.wallet,
  ].join(SEPARATOR);

  if (isWallet) {
    const otherWalletsAccounts = allAccounts
      .filter(({ wallet }) => walletsSupported.has(wallet))
      .filter((account) => account.networkId === selectedAccount.networkId)
      .filter(accountFilter || (() => true));

    if (otherWalletsAccounts.length < 2) {
      const walletName = getWalletCustomName(
        stakingRef.current.state,
        selectedAccount.wallet,
      );

      return (
        <div className={[styles.singleItem, selectStyles.control].join(" ")}>
          <WalletItem
            account={selectedAccount}
            isOpened={false}
            walletName={walletName}
          />
        </div>
      );
    }

    return (
      <div className={[styles.singleItem, selectStyles.control].join(" ")}>
        <Select
          IconComponent={IconComponent}
          MenuProps={MenuProps}
          className={selectStyles.select}
          disabled={disabled}
          onChange={handleChange}
          onClose={() => {
            setIsOpened(false);
          }}
          onOpen={() => {
            setIsOpened(true);
          }}
          value={selectedItem}
        >
          {otherWalletsAccounts.map((account) => {
            const item = [
              account.address,
              account.networkId,
              account.wallet,
            ].join(SEPARATOR);

            const walletName = getWalletCustomName(
              stakingRef.current.state,
              account.wallet,
            );

            return (
              <MenuItem key={item} sx={{ padding: 0 }} value={item}>
                <WalletItem
                  account={account}
                  isOpened={isOpened}
                  walletName={walletName}
                />
              </MenuItem>
            );
          })}
        </Select>
      </div>
    );
  }

  const filteredAccountsNetworks = new Set<StakingNetworkId>([]);

  const filteredAccounts = [selectedAccount]
    .concat(allAccounts)
    .filter((account) => {
      if (filteredAccountsNetworks.has(account.networkId)) {
        return false;
      }

      filteredAccountsNetworks.add(account.networkId);

      return true;
    })
    .sort(sortAccountsByNetworkName);

  return (
    <div className={selectStyles.control}>
      <Select
        IconComponent={IconComponent}
        MenuProps={MenuProps}
        className={selectStyles.select}
        disabled={disabled}
        onChange={handleChange}
        value={selectedItem}
      >
        {filteredAccounts.map((account) => {
          const item = [
            account.address,
            account.networkId,
            account.wallet,
          ].join(SEPARATOR);

          const rightSide = (() => {
            if (!isRewards || !account.networkId) return null;

            const denom = mainNetworkDenom[account.networkId];

            if (!denom) return null;

            const rewards = getClaimableRewardsForAccount(
              getEmptyCoin(denom),
              account,
            );

            if (!rewards) return null;

            const formatted = formatCoin(rewards, { decimals: 2 });

            if (rewards.amount === "0")
              return <div className={styles.rewards}>{formatted}</div>;

            if (new BigNumber(rewards.amount).lt(0.01)) {
              const formattedLess = formatCoin(
                {
                  amount: "0.01",
                  denom: rewards.denom,
                },
                { decimals: 2 },
              );

              return (
                <div
                  className={styles.rewards}
                  data-tooltip-content={formatCoin(rewards)}
                  data-tooltip-id={tooltipId}
                  data-tooltip-place="top-end"
                >{`< ${formattedLess}`}</div>
              );
            }

            return <div className={styles.rewards}>+{formatted}</div>;
          })();

          const denom = mainNetworkDenom[account.networkId];

          if (!denom) return null;

          return (
            <MenuItem key={item} sx={{ padding: 0 }} value={item}>
              <NetworkItem
                denom={denom}
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

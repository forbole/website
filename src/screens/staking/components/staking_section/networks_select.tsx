import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import {
  getSelectedAccount,
  getWalletAccounts,
  setSelectedAccount,
  useStakingRef,
} from "@src/screens/staking/lib/staking_sdk/context";
import type { StakingNetworkId } from "@src/screens/staking/lib/staking_sdk/core";
import { networkIdToNetworkKey } from "@src/screens/staking/lib/staking_sdk/core";
import {
  accountHasRewards,
  getAccountResolvedBalance,
} from "@src/screens/staking/lib/staking_sdk/utils/accounts";
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
  value: StakingNetworkId;
};

const SEPARATOR = "____";

const NetworkItem = ({ denom, value }: NetworkItemProps) => {
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
    </div>
  );
};

type Props = {
  disabled?: boolean;
  variant: "accounts_with_rewards" | "accounts";
};

const NetworksSelect = ({ disabled, variant }: Props) => {
  const stakingRef = useStakingRef();

  const { setState: setStakingState, state: stakingState } = stakingRef.current;

  const selectedAccount = getSelectedAccount(stakingState);

  if (!variant || !selectedAccount) return null;

  const allAccounts = getWalletAccounts(stakingState, selectedAccount.wallet);

  const availableAccounts = allAccounts.filter(
    variant === "accounts_with_rewards" ? accountHasRewards : () => true,
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
          const balance = getAccountResolvedBalance(account);

          if (!balance) return null;

          return (
            <MenuItem key={item} value={item}>
              <NetworkItem
                denom={balance.coin.denom}
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

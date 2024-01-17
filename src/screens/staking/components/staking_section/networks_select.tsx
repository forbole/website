import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import {
  getSelectedAccount,
  setSelectedAccount,
  useStakingRef,
} from "@src/screens/staking/lib/staking_sdk/context";
import { sortAccounts } from "@src/screens/staking/lib/staking_sdk/formatters";
import type {
  Account,
  ChainId,
} from "@src/screens/staking/lib/staking_sdk/types";
import { chainIdToNetworkKey } from "@src/screens/staking/lib/staking_sdk/types";
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
  value: ChainId;
};

const SEPARATOR = "____";

const NetworkItem = ({ value }: NetworkItemProps) => {
  const networkName = chainIdToNetworkKey[value];
  const networkInfo = networkName ? getNetworkInfo(networkName) : "";

  const imgSrc = networkInfo ? networkInfo.image : "";
  const name = networkInfo ? networkInfo.name : "";

  return (
    <div className={styles.row}>
      {!!imgSrc && <img alt="" className={styles.logo} src={imgSrc} />}
      <div>{name}</div>
    </div>
  );
};

type Props = {
  variant: "accounts";
};

const NetworksSelect = ({ variant }: Props) => {
  const stakingRef = useStakingRef();

  const { setState: setStakingState, state: stakingState } = stakingRef.current;

  const selectedAccount = getSelectedAccount(stakingState);

  if (!variant || !selectedAccount) return null;

  const wallet = stakingState.wallets[selectedAccount.wallet];

  if (!wallet) return null;

  const allAccounts = Object.values(wallet.networks)
    .reduce((acc, chain) => {
      acc.push(...chain.accounts);

      return acc;
    }, [] as Account[])
    .sort(sortAccounts);

  const handleChange = (event: any) => {
    const [address, chainId] = event.target.value.split(SEPARATOR);

    setSelectedAccount(
      setStakingState,
      stakingRef.current.state.selectedAction,
      {
        address,
        chainId,
        wallet: selectedAccount.wallet,
      },
    );
  };

  const selectedItem = [selectedAccount.address, selectedAccount.chainId].join(
    SEPARATOR,
  );

  return (
    <div className={styles.control}>
      <Select
        IconComponent={IconComponent}
        MenuProps={MenuProps}
        className={styles.select}
        onChange={handleChange}
        value={selectedItem}
      >
        {allAccounts.map((account) => {
          const item = [account.address, account.chainId].join(SEPARATOR);

          return (
            <MenuItem key={item} value={item}>
              <NetworkItem value={account.chainId} />
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};

export default NetworksSelect;
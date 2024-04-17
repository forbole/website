import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { formatCoin } from "@src/screens/staking/lib/staking_sdk/formatters";
import type { StakeAccount } from "@src/screens/staking/lib/staking_sdk/staking_client_types";

import { IconComponent, MenuProps, selectStyles } from "./select_base";
import * as styles from "./stake_accounts_select.module.scss";

type Props = {
  accounts: StakeAccount[];
  disabled?: boolean;
  onChange: (account: string) => void;
  selectedAccount: null | string;
};

const StakeAccountsSelect = ({
  accounts,
  disabled,
  onChange,
  selectedAccount,
}: Props) => (
  <div className={selectStyles.control}>
    <Select
      IconComponent={IconComponent}
      MenuProps={MenuProps}
      className={selectStyles.select}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value as string)}
      value={selectedAccount || accounts[0]?.address}
    >
      {accounts.map((account) => (
        <MenuItem
          key={account.address}
          sx={{ padding: 0 }}
          value={account.address}
        >
          <div className={styles.row}>
            <img
              alt=""
              className={styles.icon}
              src="/icons/stake_account.svg"
            />
            <div
              className={styles.address}
            >{`${account.address.slice(0, 11)}...`}</div>
            <div>
              {formatCoin({
                amount: account.amount,
                denom: account.denom,
              })}
            </div>
          </div>
        </MenuItem>
      ))}
    </Select>
  </div>
);

export default StakeAccountsSelect;

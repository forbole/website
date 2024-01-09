import { OutlinedInput } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { ChainId, chainIdToNetworkKey } from "@src/screens/staking/lib/context";
import { getNetworkInfo } from "@src/utils/network_info";

import * as styles from "./networks_select.module.scss";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const networks = Object.values(ChainId).sort();

type NetworkItemProps = {
  value: ChainId;
};

const NetworkItem = ({ value }: NetworkItemProps) => {
  const imgSrc = (() => {
    const networkName = chainIdToNetworkKey[value];

    if (!networkName) return "";

    return getNetworkInfo(networkName).image;
  })();

  return (
    <div className={styles.row}>
      {!!imgSrc && <img alt="" className={styles.logo} src={imgSrc} />}
      <div>{value}</div>
    </div>
  );
};

type Props = {
  setValue: (value: ChainId) => void;
  value: ChainId;
};

const NetworksSelect = ({ setValue, value }: Props) => {
  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <FormControl className={styles.control}>
      <Select
        MenuProps={MenuProps}
        input={<OutlinedInput />}
        onChange={handleChange}
        value={value as string}
      >
        {networks.map((network) => (
          <MenuItem key={network} value={network}>
            <NetworkItem value={network} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default NetworksSelect;

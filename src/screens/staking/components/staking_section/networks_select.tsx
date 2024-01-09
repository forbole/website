import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { ChainId, chainIdToNetworkKey } from "@src/screens/staking/lib/context";
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

// @TODO: Get this from context (so testnets are filtered out)
const networks = Object.values(ChainId).sort();

type NetworkItemProps = {
  value: ChainId;
};

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
  setValue: (value: ChainId) => void;
  value: ChainId;
};

const NetworksSelect = ({ setValue, value }: Props) => {
  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <div className={styles.control}>
      <Select
        IconComponent={IconComponent}
        MenuProps={MenuProps}
        className={styles.select}
        onChange={handleChange}
        value={value as string}
      >
        {networks.map((network) => (
          <MenuItem key={network} value={network}>
            <NetworkItem value={network} />
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default NetworksSelect;

import type { RefObject } from "react";
import { memo, useState } from "react";

import * as commonStyles from "@src/screens/staking/common.module.scss";
import { sortNetworks } from "@src/screens/staking/lib/staking_sdk/utils/networks";
import type { NetworkKey } from "@src/utils/network_info";
import { allNetworkKeys, getNetworkInfo } from "@src/utils/network_info";

import StakingHero from "../staking_hero";
import NetworkGrid from "./components/network_grid";
import type { NetworkProps } from "./components/network_grid/config";
import { useNetworkHook } from "./components/network_grid/hooks";
import SearchBar from "./components/search_bar";
import * as styles from "./index.module.scss";

type Props = {
  scrollRef: RefObject<HTMLDivElement>;
};

const Networks = ({ scrollRef }: Props) => {
  const [networksFilter, setNetworksFilter] = useState<string>("");

  const {
    cosmosNetworks,
    elrondNetwork,
    ethereumNetwork,
    oasisNetwork,
    radixNetwork,
    solanaNetwork,
    suiNetwork,
  } = useNetworkHook();

  const allNetworkInfo: NetworkProps = {
    ...cosmosNetworks,
    ...elrondNetwork,
    ...ethereumNetwork,
    ...oasisNetwork,
    ...radixNetwork,
    ...solanaNetwork,
    ...suiNetwork,
  };

  const allNetworkData = allNetworkKeys
    .map((x: number | string) => getNetworkInfo(x as NetworkKey))
    .filter(Boolean);

  const sortedNetworks = [...allNetworkData]
    .sort(sortNetworks())
    .filter((a) => {
      if (networksFilter === "") {
        return true;
      }

      return a.name.toLowerCase().includes(networksFilter.toLowerCase());
    });

  return (
    <div className={styles.wrapper} ref={scrollRef}>
      <div
        className={[commonStyles.stakingContent, styles.stakingContent].join(
          " ",
        )}
      >
        <StakingHero />
        <div className={styles.grid}>
          <SearchBar
            networksFilter={networksFilter}
            noResultsFound={sortedNetworks.length === 0}
            setNetworksFilter={setNetworksFilter}
          />
          <NetworkGrid
            allNetworkInfo={allNetworkInfo}
            sortedNetworks={sortedNetworks}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Networks);

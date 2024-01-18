import Trans from "next-translate/Trans";
import useTranslation from "next-translate/useTranslation";
import { memo, useState } from "react";

import * as commonStyles from "@src/screens/staking/common.module.scss";
import { sortNetworks } from "@src/screens/staking/lib/staking_sdk/formatters";
import type { NetworkKey } from "@src/utils/network_info";
import { allNetworkKeys, getNetworkInfo } from "@src/utils/network_info";

import NetworkGrid from "./components/network_grid";
import type { NetworkProps } from "./components/network_grid/config";
import { useNetworkHook } from "./components/network_grid/hooks";
import SearchBar from "./components/search_bar";
import * as styles from "./index.module.scss";

const Networks = () => {
  const { t } = useTranslation("staking");
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
    <div className={styles.wrapper}>
      <div
        className={[commonStyles.stakingContent, styles.stakingContent].join(
          " ",
        )}
      >
        <h4 className={commonStyles.stakingTitle}>{t("stake with Forbole")}</h4>
        <Trans
          components={[
            <span className={["h3", styles.tr0].join(" ")} key="0" />,
            <span className={["h3", styles.tr1].join(" ")} key="1" />,
          ]}
          i18nKey="stake with Forbole title"
          ns="staking"
        />
        <span className={styles.stakingDesc}>
          {t("stake with Forbole desc")}
        </span>
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

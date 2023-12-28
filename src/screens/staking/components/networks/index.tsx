import { Box, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";

import * as commonStyles from "@src/screens/staking/common.module.scss";
import { allNetworkKeys, getNetworkInfo } from "@src/utils/network_info";

import NetworkGrid from "./components/network_grid";
import type { NetworkProps } from "./components/network_grid/config";
import { useNetworkHook } from "./components/network_grid/hooks";
import SearchBar from "./components/search_bar";
import * as styles from "./index.module.scss";

const Trans = dynamic(() => import("next-translate/Trans"), { ssr: false });

const Networks = () => {
  const { t } = useTranslation("staking");

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
    .map((x: number | string) => getNetworkInfo(x))
    .filter(Boolean);

  const sortedNetworks = [...allNetworkData].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  return (
    <Box display="flex" justifyContent="center">
      <Box className={commonStyles.stakingContent}>
        <Typography className={commonStyles.stakingTitle} variant="h4">
          {t("stake with Forbole")}
        </Typography>
        <Trans
          components={[
            <Box className={["h3", styles.tr0].join(" ")} key="0" />,
            <Box className={["h3", styles.tr1].join(" ")} key="1" />,
          ]}
          i18nKey="stake with Forbole title"
          ns="staking"
        />
        <Typography className={styles.stakingDesc} variant="body1">
          {t("stake with Forbole desc")}
        </Typography>
        <Box className={styles.grid}>
          <SearchBar sortedNetworks={sortedNetworks} />
          <NetworkGrid
            allNetworkInfo={allNetworkInfo}
            sortedNetworks={sortedNetworks}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Networks;

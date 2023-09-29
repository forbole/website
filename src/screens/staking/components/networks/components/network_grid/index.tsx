/* eslint-disable no-bitwise */
import React, { useState } from "react";
import { Box } from "@mui/material";
import { LayoutGroup } from "framer-motion";
import { getNetworkInfo } from "@src/utils/network_info";
import { NetworkCard } from "./components";
import { allNetworkKeys, NetworkProps } from "./config";
import useStyles from "./useStyles";
import { useNetworkHook } from "./hooks";

const NetworkGrid = () => {
  const styles = useStyles();
  const [showMobilePopover, setShowMobilePopover] = useState("");
  const {
    cosmosNetworks,
    elrondNetwork,
    solanaNetwork,
    oasisNetwork,
    radixNetwork,
  } = useNetworkHook();
  const allNetworkData = allNetworkKeys.map((x: string | number) =>
    getNetworkInfo(x)
  );
  const allNetworkInfo: NetworkProps = {
    ...cosmosNetworks,
    ...elrondNetwork,
    ...solanaNetwork,
    ...oasisNetwork,
    ...radixNetwork,
  };

  const networkInfo: NetworkProps = Object.keys(allNetworkInfo)
    .sort()
    .reduce((r, key) => Object.assign(r, { [key]: allNetworkInfo[key] }), {});

  return (
    <Box css={styles.root}>
      <Box className="home__networks">
        <LayoutGroup>
          {allNetworkData.map((network, index) => {
            return (
              <NetworkCard
                key={network.name ?? index}
                network={network}
                networkSummary={networkInfo[network.graphql]}
                showMobilePopover={showMobilePopover}
                setShowMobilePopover={setShowMobilePopover}
              />
            );
          })}
        </LayoutGroup>
      </Box>
    </Box>
  );
};

export default NetworkGrid;

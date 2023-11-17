import { Box } from "@mui/material";
import { LayoutGroup } from "framer-motion";
import { useState } from "react";

import { allNetworkKeys, getNetworkInfo } from "@utils/network_info";

import { NetworkCard } from "./components";
import type { NetworkProps } from "./config";
import { useNetworkHook } from "./hooks";
import useStyles from "./useStyles";

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
    getNetworkInfo(x),
  );
  const allNetworkInfo: NetworkProps = {
    ...cosmosNetworks,
    ...elrondNetwork,
    ...solanaNetwork,
    ...oasisNetwork,
    ...radixNetwork,
  };

  return (
    <Box css={styles.root}>
      <Box className="home__networks">
        <LayoutGroup>
          {allNetworkData.map((network, index) => (
            <NetworkCard
              key={network.name ?? index}
              network={network}
              networkSummary={allNetworkInfo[network.graphql]}
              setShowMobilePopover={setShowMobilePopover}
              showMobilePopover={showMobilePopover}
            />
          ))}
        </LayoutGroup>
      </Box>
    </Box>
  );
};

export default NetworkGrid;

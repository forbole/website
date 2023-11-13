import { Box } from "@mui/material";
import { allNetworkKeys, getNetworkInfo } from "@utils/network_info";
import { LayoutGroup } from "framer-motion";
import { useState } from "react";

import { NetworkCard } from "./components";
import { NetworkProps } from "./config";
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

  const networkInfo: NetworkProps = Object.keys(allNetworkInfo)
    .sort()
    .reduce((r, key) => Object.assign(r, { [key]: allNetworkInfo[key] }), {});

  return (
    <Box css={styles.root}>
      <Box className="home__networks">
        <LayoutGroup>
          {allNetworkData.map((network, index) => (
            <NetworkCard
              key={network.name ?? index}
              network={network}
              networkSummary={networkInfo[network.graphql]}
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

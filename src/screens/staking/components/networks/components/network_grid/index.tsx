import { Box } from "@mui/material";
import { LayoutGroup } from "framer-motion";
import { useState } from "react";

import { NoSSR } from "@src/components/no-ssr";
import type { Network } from "@src/utils/network_info";

import NetworkCard from "./components/network_card";
import type { NetworkProps } from "./config";
import useStyles from "./useStyles";

type Props = {
  allNetworkInfo: NetworkProps;
  sortedNetworks: Network[];
};

const NetworkGrid = ({ allNetworkInfo, sortedNetworks }: Props) => {
  const styles = useStyles();
  const [showMobilePopover, setShowMobilePopover] = useState("");

  return (
    <Box css={styles.root}>
      <Box className="home__networks">
        <NoSSR>
          <LayoutGroup>
            {sortedNetworks.map((network, index) => (
              <NetworkCard
                key={network.name ?? index}
                network={network}
                networkSummary={allNetworkInfo[network.graphql]}
                setShowMobilePopover={setShowMobilePopover}
                showMobilePopover={showMobilePopover}
              />
            ))}
          </LayoutGroup>
        </NoSSR>
      </Box>
    </Box>
  );
};

export default NetworkGrid;

import { Box } from "@mui/material";
import { LayoutGroup } from "framer-motion";
import { useState } from "react";

import { NoSSR } from "@components/no-ssr";
import type { Network } from "@utils/network_info";

import { NetworkCard } from "./components";
import type { NetworkProps } from "./config";
import useStyles from "./useStyles";

type Props = {
  sortedNetworks: Network[];
  allNetworkInfo: NetworkProps;
};

const NetworkGrid = ({ sortedNetworks, allNetworkInfo }: Props) => {
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

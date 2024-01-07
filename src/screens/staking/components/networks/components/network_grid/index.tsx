import { LayoutGroup } from "framer-motion";
import { useState } from "react";

import { NoSSR } from "@src/components/no-ssr";
import type { Network } from "@src/utils/network_info";

import NetworkCard from "./components/network_card";
import type { NetworkProps } from "./config";
import * as styles from "./index.module.scss";

type Props = {
  allNetworkInfo: NetworkProps;
  sortedNetworks: Network[];
};

const NetworkGrid = ({ allNetworkInfo, sortedNetworks }: Props) => {
  const [showMobilePopover, setShowMobilePopover] = useState("");

  return (
    <div className={styles.root}>
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
    </div>
  );
};

export default NetworkGrid;

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
  const [showPopover, setShowPopover] = useState("");

  return (
    <div className={styles.root}>
      <NoSSR>
        <LayoutGroup>
          {sortedNetworks.map((network, index) => (
            <NetworkCard
              key={network.name ?? index}
              network={network}
              networkSummary={allNetworkInfo[network.graphql]}
              setShowPopover={setShowPopover}
              showPopover={showPopover}
            />
          ))}
        </LayoutGroup>
      </NoSSR>
    </div>
  );
};

export default NetworkGrid;

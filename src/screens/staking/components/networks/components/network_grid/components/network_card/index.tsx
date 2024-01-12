import { Button } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/legacy/image";
import type { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { memo, useCallback, useRef } from "react";

import { useWindowDimensions } from "@src/hooks/get_screen_size";
import { networkNameToChainId } from "@src/screens/staking/lib/context/types";
import {
  getCanClickNetwork,
  handleNetworkClick,
} from "@src/utils/network_functions";
import type { Network } from "@src/utils/network_info";
import { networksWithHiddenInfo } from "@src/utils/network_info";

import type { ParamsProps } from "../../config";
import * as styles from "./index.module.scss";
import PopOver from "./popover";

interface CardProp {
  network: Network;
  networkSummary: ParamsProps;
  setShowPopover: Dispatch<SetStateAction<string>>;
  showPopover: string;
}

const NetworkCard = ({
  network,
  networkSummary,
  setShowPopover,
  showPopover,
}: CardProp) => {
  const { isMobile } = useWindowDimensions();

  /* Using framer-motion to animate the network box. */
  const ref = useRef(null);

  const canClickNetwork = getCanClickNetwork(network);

  const handleExploreClick: MouseEventHandler<HTMLElement> = useCallback(
    (event) => {
      event.stopPropagation();

      handleNetworkClick(network);
    },
    [network],
  );

  const stakingChainId = networkNameToChainId[network.graphql];

  const isEmptyPopover =
    showPopover !== network.name ||
    networksWithHiddenInfo.has(network.graphql) ||
    (!!networkSummary &&
      !stakingChainId &&
      (!networkSummary.bonded || networkSummary.bonded < 0) &&
      (!networkSummary.APY || networkSummary.APY < 0) &&
      (!networkSummary.TVL || networkSummary.TVL < 0) &&
      !networkSummary.custom);

  const networkImage = network.image && (
    <div className={styles.image}>
      <Image
        alt=""
        height="48"
        objectFit="contain"
        quality={100}
        src={network.image}
        width="48"
      />
    </div>
  );

  const popover = isEmptyPopover ? null : (
    <PopOver
      canClickNetwork={canClickNetwork}
      handleExploreClick={handleExploreClick}
      network={network}
      networkImage={networkImage}
      networkSummary={networkSummary}
      setShowPopover={setShowPopover}
    />
  );

  const networkName = <h4 className={styles.networkName}>{network.name}</h4>;

  return (
    <motion.div
      className={styles.root}
      initial="initial"
      ref={ref}
      transition={{ duration: 0.3 }}
      variants={{
        appear: { opacity: 1, scale: 1 },
        initial: { opacity: 0, scale: 0.8 },
      }}
      whileInView="appear"
    >
      {isMobile ? (
        <>
          <div
            className={[styles.popoverContainer].join(" ")}
            data-test="network-item"
          >
            {popover}
          </div>
          <Button
            className={styles.anchor}
            onClick={
              isEmptyPopover && canClickNetwork ? handleExploreClick : undefined
            }
            variant="text"
          >
            {networkImage}
            {networkName}
          </Button>
        </>
      ) : (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div
          className={styles.anchor}
          onMouseEnter={() => setShowPopover(network.name)}
          role="button"
          tabIndex={canClickNetwork ? 0 : -1}
        >
          {popover}
          {networkImage}
          {networkName}
        </div>
      )}
    </motion.div>
  );
};

export default memo(NetworkCard);

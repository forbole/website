import { Button } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/legacy/image";
import type { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { memo, useCallback, useRef } from "react";

import { useWindowDimensions } from "@src/hooks/get_screen_size";
import { networkKeyToNetworkId } from "@src/screens/staking/lib/staking_sdk/core";
import {
  getCanClickNetwork,
  handleNetworkClick,
} from "@src/utils/network_functions";
import type { Network, NetworkKey } from "@src/utils/network_info";
import { networksWithHiddenInfo } from "@src/utils/network_info";

import type { ParamsProps } from "../../config";
import * as styles from "./index.module.scss";
import PopOver from "./popover";
import StakingLabel from "./staking-label";

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

  const chainSupportsStaking = networkKeyToNetworkId[network.key as NetworkKey];

  const isEmptyPopover =
    networksWithHiddenInfo.has(network.graphql) ||
    (!!networkSummary &&
      !chainSupportsStaking &&
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

  const popover =
    isEmptyPopover || network.name !== showPopover ? null : (
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

  const anchorClassName = [
    styles.anchor,
    chainSupportsStaking ? styles.staking : "",
  ].join(" ");

  return (
    <motion.div
      className={styles.root}
      data-test={`network-card-${network.key}`}
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
          <div className={styles.popoverWrapper}>{popover}</div>
          <Button
            className={anchorClassName}
            onClick={() => {
              if (!isEmptyPopover) {
                setShowPopover(network.name);

                return;
              }

              if (canClickNetwork && handleNetworkClick) {
                handleNetworkClick(network);
              }
            }}
            variant="text"
          >
            {chainSupportsStaking && <StakingLabel />}
            {networkImage}
            {networkName}
          </Button>
        </>
      ) : (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div
          className={anchorClassName}
          onMouseEnter={() => setShowPopover(network.name)}
          role="button"
          tabIndex={canClickNetwork ? 0 : -1}
        >
          {chainSupportsStaking && <StakingLabel />}
          {popover}
          {networkImage}
          {networkName}
        </div>
      )}
    </motion.div>
  );
};

export default memo(NetworkCard);

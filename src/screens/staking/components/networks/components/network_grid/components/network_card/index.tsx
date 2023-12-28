import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";
import Image from "next/legacy/image";
import type { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { useRef } from "react";
import { useCallback } from "react";

import { CloseIcon } from "@src/components/icons";
import { useWindowDimensions } from "@src/hooks/get_screen_size";
import { convertToMoney } from "@src/utils/convert_to_money";
import {
  getCanClickNetwork,
  handleNetworkClick,
} from "@src/utils/network_functions";
import type { Network } from "@src/utils/network_info";
import { networksWithHiddenInfo } from "@src/utils/network_info";

import type { ParamsProps } from "../../config";
import * as styles from "./index.module.scss";

interface CardProp {
  network: Network;
  networkSummary: ParamsProps;
  setShowMobilePopover: Dispatch<SetStateAction<string>>;
  showMobilePopover: string;
}

const NetworkCard = ({
  network,
  networkSummary,
  setShowMobilePopover,
  showMobilePopover,
}: CardProp) => {
  const { t } = useTranslation("staking");
  const { isMobile } = useWindowDimensions();

  /* Using framer-motion to animate the network box. */
  const ref = useRef(null);

  const handleMobileAnchorClick: MouseEventHandler<HTMLButtonElement> =
    useCallback(
      () => setShowMobilePopover(network.name),
      [network.name, setShowMobilePopover],
    );

  const handleMobilePopoverClick: MouseEventHandler<Element> = useCallback(
    (event) => {
      event.stopPropagation();
      setShowMobilePopover("");
    },
    [setShowMobilePopover],
  );

  const canClickNetwork = getCanClickNetwork(network);

  const handleExploreClick: MouseEventHandler<HTMLElement> = useCallback(
    (event) => {
      event.stopPropagation();

      handleNetworkClick(network);
    },
    [network],
  );

  const isEmptyPopover =
    networksWithHiddenInfo.has(network.graphql) ||
    (!!networkSummary &&
      (!networkSummary.bonded || networkSummary.bonded < 0) &&
      (!networkSummary.APY || networkSummary.APY < 0) &&
      (!networkSummary.TVL || networkSummary.TVL < 0) &&
      !networkSummary.custom);

  const networkImage = network.image && (
    <Box className={styles.image}>
      <Image
        alt=""
        height="48"
        objectFit="contain"
        quality={100}
        src={network.image}
        width="48"
      />
    </Box>
  );

  const popover = isEmptyPopover ? null : (
    <Box
      className={[styles.popover].join(" ")}
      style={{
        cursor: canClickNetwork ? "pointer" : "default",
      }}
    >
      <CloseIcon
        className={styles.closeBtn}
        fontSize="small"
        onClickCapture={handleMobilePopoverClick}
      />
      <Box onClickCapture={handleMobilePopoverClick}>{networkImage}</Box>
      {!!networkSummary ? (
        <Box
          className={styles.dataBox}
          onClickCapture={handleMobilePopoverClick}
        >
          {!!networkSummary.bonded && networkSummary.bonded > 0 && (
            <Box>
              <Typography className={styles.label} variant="h6">
                {network.denom?.toUpperCase()}
              </Typography>
              <Typography className={styles.value}>
                {convertToMoney(networkSummary.bonded)}
              </Typography>
            </Box>
          )}
          {!!networkSummary.APY && networkSummary.APY > 0 && (
            <Box>
              <Typography className={styles.label} variant="h6">
                APY
              </Typography>
              <Typography className={styles.value}>{`${Math.round(
                networkSummary.APY * 100,
              )}%`}</Typography>
            </Box>
          )}
          {!!networkSummary.TVL && (
            <Box>
              <Typography className={styles.label} variant="h6">
                TVL
              </Typography>
              <Typography className={styles.value}>
                ${convertToMoney(networkSummary.TVL)}
              </Typography>
            </Box>
          )}
          {!!networkSummary.custom &&
            Object.keys(networkSummary.custom)
              .sort()
              .map((customKey) => (
                <Box key={customKey}>
                  <Typography className={styles.label} variant="h6">
                    {customKey}
                  </Typography>
                  <Typography className={styles.value}>
                    {networkSummary.custom?.[customKey]}
                  </Typography>
                </Box>
              ))}
        </Box>
      ) : (
        <LinearProgress className={styles.progress} color="secondary" />
      )}
      <Button
        className={styles.exploreButton}
        color="secondary"
        onClickCapture={handleExploreClick}
        variant="contained"
      >
        {t("stake now")}
      </Button>
    </Box>
  );

  const networkName = (
    <Typography className={styles.networkName} variant="h4">
      {network.name}
    </Typography>
  );

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
          <Box
            className={[
              styles.popoverContainer,
              showMobilePopover === network.name ? styles.active : "",
            ].join(" ")}
            data-test="network-item"
          >
            {popover}
          </Box>
          <Button
            className={styles.anchor}
            onClick={
              isEmptyPopover && canClickNetwork
                ? handleExploreClick
                : handleMobileAnchorClick
            }
            variant="text"
          >
            {networkImage}
            {networkName}
          </Button>
        </>
      ) : (
        <Box
          className={styles.anchor}
          onClick={handleExploreClick}
          style={{
            cursor: canClickNetwork ? "pointer" : "default",
          }}
        >
          {popover}
          {networkImage}
          {networkName}
        </Box>
      )}
    </motion.div>
  );
};

export default NetworkCard;

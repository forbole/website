import { CloseIcon, InfoIcon } from "@icons";
import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";
import Image from "next/legacy/image";
import type { Dispatch, MouseEventHandler, SetStateAction } from "react";
import React, { useCallback } from "react";

import {
  getCanClickNetwork,
  handleNetworkClick,
} from "@src/utils/network_functions";
import { convertToMoney } from "@utils/convert_to_money";
import { type Network, networksWithHiddenInfo } from "@utils/network_info";

import type { ParamsProps } from "../../config";
import useStyles from "./useStyles";

interface CardProp {
  network: Network;
  networkSummary: ParamsProps;
  showMobilePopover: string;
  setShowMobilePopover: Dispatch<SetStateAction<string>>;
}

const NetworkCard = ({
  network,
  networkSummary,
  setShowMobilePopover,
  showMobilePopover,
}: CardProp) => {
  const { t } = useTranslation("staking");

  /* Using framer-motion to animate the network box. */
  const ref = React.useRef(null);

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
      !networkSummary.TVL &&
      !networkSummary.custom);

  /* A variable that is used to render the popover. */
  const popover = (
    <Box
      className="networkbox__popover"
      style={{
        cursor: canClickNetwork ? "pointer" : "default",
        visibility: isEmptyPopover ? "hidden" : "visible",
      }}
    >
      <CloseIcon
        className="networkbox__close-btn"
        fontSize="small"
        onClickCapture={handleMobilePopoverClick}
      />
      <Box onClickCapture={handleMobilePopoverClick}>
        <Box className="image">
          {network?.image && (
            <Image
              alt=""
              height="48"
              objectFit="contain"
              quality={100}
              src={network.image || ""}
              width="48"
            />
          )}
        </Box>
      </Box>
      {!networkSummary && <LinearProgress color="secondary" />}
      {!!networkSummary && (
        <Box onClickCapture={handleMobilePopoverClick}>
          {!!networkSummary.bonded && networkSummary.bonded > 0 && (
            <Box>
              <Typography variant="h6">
                {network.denom?.toUpperCase()}
              </Typography>
              <Typography>{convertToMoney(networkSummary.bonded)}</Typography>
            </Box>
          )}
          {!!networkSummary.APY && networkSummary.APY > 0 && (
            <Box>
              <Typography variant="h6">APY</Typography>
              <Typography>{`${Math.round(
                networkSummary.APY * 100,
              )}%`}</Typography>
            </Box>
          )}
          {!!networkSummary.TVL && (
            <Box>
              <Stack alignItems="center" direction="row" gap={1}>
                <Typography variant="h6">TVL</Typography>
                <InfoIcon />
              </Stack>
              <Typography>${convertToMoney(networkSummary.TVL)}</Typography>
            </Box>
          )}
          {!!networkSummary.custom &&
            Object.keys(networkSummary.custom).map((customKey) => (
              <Box key={customKey}>
                <Stack alignItems="center" direction="row" gap={1}>
                  <Typography variant="h6">{customKey}</Typography>
                </Stack>
                <Typography>{networkSummary.custom?.[customKey]}</Typography>
              </Box>
            ))}
        </Box>
      )}
      <Button
        className="networkbox__explore-btn"
        color="secondary"
        onClickCapture={handleExploreClick}
        variant="contained"
      >
        {t("stake now")}
      </Button>
    </Box>
  );

  const styles = useStyles();

  const networkImage = network.image && (
    <Box className="image">
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

  const networkName = <Typography variant="h4">{network.name}</Typography>;

  return (
    <motion.div
      css={styles.root}
      initial="initial"
      ref={ref}
      transition={{ duration: 0.3 }}
      variants={{
        initial: { opacity: 0, scale: 0.8 },
        appear: { opacity: 1, scale: 1 },
      }}
      whileInView="appear"
    >
      <Box
        className={
          showMobilePopover === network.name
            ? "networkbox__active networkbox__mobile-popover-contaier"
            : "networkbox__mobile-popover-contaier"
        }
        data-test="network-item"
      >
        {popover}
      </Box>
      <Box
        className="networkbox__desktop-anchor"
        onClick={handleExploreClick}
        style={{
          cursor: canClickNetwork ? "pointer" : "default",
        }}
      >
        {popover}
        {networkImage}
        {networkName}
      </Box>
      <Button
        className="networkbox__mobile-anchor"
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
    </motion.div>
  );
};

export default NetworkCard;

import { CloseIcon, InfoIcon } from "@icons";
import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";
import Image from "next/legacy/image";
import type { Dispatch, FC, MouseEventHandler, SetStateAction } from "react";
import React, { useCallback } from "react";

import { convertToMoney } from "@utils/convert_to_money";
import type { Network } from "@utils/network_info";

import type { ParamsProps } from "../../config";
import useStyles from "./useStyles";

interface CardProp {
  network: Network;
  networkSummary: ParamsProps;
  showMobilePopover: string;
  setShowMobilePopover: Dispatch<SetStateAction<string>>;
}

const NetworkCard: FC<CardProp> = (props: CardProp) => {
  const { t } = useTranslation("staking");
  const { network, networkSummary, showMobilePopover, setShowMobilePopover } =
    props;

  /* Using framer-motion to animate the network box. */
  const ref = React.useRef(null);

  const handleMobileAnchorClick: MouseEventHandler<HTMLButtonElement> =
    useCallback(
      () => setShowMobilePopover(network.name),
      [network.name, setShowMobilePopover],
    );
  const handleMobilPopoverClick: MouseEventHandler<Element> = useCallback(
    (event) => {
      event.stopPropagation();
      setShowMobilePopover("");
    },
    [setShowMobilePopover],
  );
  const handleExploreClick: MouseEventHandler<HTMLElement> = useCallback(
    (event) => {
      event.stopPropagation();

      if (network.guide)
        window.open(
          `${process.env.NEXT_PUBLIC_URL}/staking/${network.guide}`,
          "_top",
        );
      else if (network.delegate) window.open(network.delegate, "_top");
    },
    [network.delegate, network.guide],
  );

  /* A variable that is used to render the popover. */
  const popover = (
    <Box className="networkbox__popover" data-test="network-item">
      <CloseIcon
        className="networkbox__close-btn"
        fontSize="small"
        onClickCapture={handleMobilPopoverClick}
      />
      <Box onClickCapture={handleMobilPopoverClick}>
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
        <Box onClickCapture={handleMobilPopoverClick}>
          {!!networkSummary.bonded && (
            <Box>
              <Typography variant="h6">
                {network.denom?.toUpperCase()}
              </Typography>
              <Typography>{convertToMoney(networkSummary.bonded)}</Typography>
            </Box>
          )}
          {!!networkSummary.APY && (
            <Box>
              <Typography variant="h6">APY</Typography>
              {networkSummary.APY <= 0 ? (
                <Typography>-%</Typography>
              ) : (
                <Typography>{`${Math.round(
                  networkSummary.APY * 100,
                )}%`}</Typography>
              )}
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

  return (
    <motion.div
      ref={ref}
      css={styles.root}
      initial="initial"
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
      >
        {popover}
      </Box>
      <Box className="networkbox__desktop-anchor" onClick={handleExploreClick}>
        {popover}
        <Box className="image">
          {network.image && (
            <Image
              alt=""
              height="48"
              objectFit="contain"
              quality={100}
              src={network.image}
              width="48"
            />
          )}
        </Box>
        <Typography variant="h4">{network.name}</Typography>
      </Box>
      <Button
        className="networkbox__mobile-anchor"
        onClick={handleMobileAnchorClick}
        variant="text"
      >
        <Box className="image">
          {network.image && (
            <Image
              alt=""
              height="48"
              objectFit="contain"
              quality={100}
              src={network.image}
              width="48"
            />
          )}
        </Box>
        <Typography variant="h4">{network.name}</Typography>
      </Button>
    </motion.div>
  );
};

export default NetworkCard;

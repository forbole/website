import { Button, LinearProgress } from "@mui/material";
import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";
import Image from "next/legacy/image";
import type { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { useCallback, useRef } from "react";

import HighlightButton from "@src/components/highlight-button";
import CloseIcon from "@src/components/icons/icon_cross.svg";
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
      event.preventDefault();
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
    <div
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
      {/* eslint-disable-next-line */}
      <div onClick={handleMobilePopoverClick}>{networkImage}</div>
      {!!networkSummary ? (
        /* eslint-disable-next-line */
        <div className={styles.dataBox} onClick={handleMobilePopoverClick}>
          {!!networkSummary.bonded && networkSummary.bonded > 0 && (
            <div>
              <h6 className={styles.label}>{network.denom?.toUpperCase()}</h6>
              <span className={styles.value}>
                {convertToMoney(networkSummary.bonded)}
              </span>
            </div>
          )}
          {!!networkSummary.APY && networkSummary.APY > 0 && (
            <div>
              <h6 className={styles.label}>APY</h6>
              <span className={styles.value}>{`${Math.round(
                networkSummary.APY * 100,
              )}%`}</span>
            </div>
          )}
          {!!networkSummary.TVL && (
            <div>
              <h6 className={styles.label}>TVL</h6>
              <span className={styles.value}>
                ${convertToMoney(networkSummary.TVL)}
              </span>
            </div>
          )}
          {!!networkSummary.custom &&
            Object.keys(networkSummary.custom)
              .sort()
              .map((customKey) => (
                <div key={customKey}>
                  <h6 className={styles.label}>{customKey}</h6>
                  <span className={styles.value}>
                    {networkSummary.custom?.[customKey]}
                  </span>
                </div>
              ))}
        </div>
      ) : (
        <LinearProgress className={styles.progress} color="secondary" />
      )}
      <HighlightButton
        className={styles.exploreButton}
        color="secondary"
        onClickCapture={handleExploreClick}
      >
        {t("stake now")}
      </HighlightButton>
    </div>
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
            className={[
              styles.popoverContainer,
              showMobilePopover === network.name ? styles.active : "",
            ].join(" ")}
            data-test="network-item"
          >
            {popover}
          </div>
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
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div
          className={styles.anchor}
          onClick={handleExploreClick}
          role="button"
          style={{
            cursor: canClickNetwork ? "pointer" : "default",
          }}
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

export default NetworkCard;

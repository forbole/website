/* eslint-disable react/require-default-props */
/* eslint-disable no-undef */
/* eslint-disable react/no-unstable-nested-components */
import React, {
  Dispatch,
  SetStateAction,
  FC,
  MouseEventHandler,
  useCallback,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';
import { Box, Button, Stack, LinearProgress, Typography } from '@mui/material';
import { CloseIcon, InfoIcon } from '@icons';
import { convertToMoney } from '@utils/convert_to_money';
import { ParamsProps } from '../../config';
import useStyles from './useStyles';

interface CardProp {
  key: string;
  network: Network;
  networkSummary: ParamsProps;
  showMobilePopover: string;
  setShowMobilePopover: Dispatch<SetStateAction<string>>;
}

const NetworkCard: FC<CardProp> = (props: CardProp) => {
  const { t } = useTranslation('staking');
  const {
    key,
    network,
    networkSummary,
    showMobilePopover,
    setShowMobilePopover,
  } = props;

  /* Using framer-motion to animate the network box. */
  const ref = React.useRef(null);

  const handleMobileAnchorClick: MouseEventHandler<HTMLButtonElement> =
    useCallback(
      () => setShowMobilePopover(network.name),
      [network.name, setShowMobilePopover]
    );
  const handleMobilPopoverClick: MouseEventHandler<Element> = useCallback(
    (event) => {
      event.stopPropagation();
      setShowMobilePopover('');
    },
    [setShowMobilePopover]
  );
  const handleExploreClick: MouseEventHandler<HTMLElement> = useCallback(
    (event) => {
      event.stopPropagation();
      if (network.delegate) window.open(network.delegate, '_top');
    },
    [network.delegate]
  );

  /* A variable that is used to render the popover. */
  const popover = (
    <Box key={key} className="networkbox__popover">
      <CloseIcon
        fontSize="small"
        className="networkbox__close-btn"
        onClickCapture={handleMobilPopoverClick}
      />
      <Box onClickCapture={handleMobilPopoverClick}>
        <Box className="image">
          <Image
            src={network.image}
            objectFit="contain"
            width="48px"
            height="48px"
            quality={100}
          />
        </Box>
      </Box>
      {!networkSummary && <LinearProgress color="secondary" />}
      {!!networkSummary && (
        <Box onClickCapture={handleMobilPopoverClick}>
          {!!networkSummary.bonded && (
            <Box>
              <Typography variant="h6">{network.name}</Typography>
              <Typography>{convertToMoney(networkSummary.bonded)}</Typography>
            </Box>
          )}
          {!!networkSummary.APY && (
            <Box>
              <Typography variant="h6">APY</Typography>
              <Typography>{networkSummary.APY}</Typography>
            </Box>
          )}
          {!!networkSummary.TVL && (
            <Box>
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography variant="h6">TVL</Typography>
                <InfoIcon />
              </Stack>
              <Typography>${convertToMoney(networkSummary.TVL)}</Typography>
            </Box>
          )}
        </Box>
      )}
      <Button
        variant="contained"
        color="secondary"
        className="networkbox__explore-btn"
        onClickCapture={handleExploreClick}
      >
        {t('stake now')}
      </Button>
    </Box>
  );

  const styles = useStyles();
  return (
    <motion.div
      ref={ref}
      css={styles.root}
      variants={{
        initial: { opacity: 0, scale: 0.8 },
        appear: { opacity: 1, scale: 1 },
      }}
      transition={{ duration: 0.3 }}
      initial="initial"
      whileInView="appear"
    >
      <Box
        className={
          showMobilePopover === network.name
            ? 'networkbox__active networkbox__mobile-popover-contaier'
            : 'networkbox__mobile-popover-contaier'
        }
      >
        {popover}
      </Box>
      <Box className="networkbox__desktop-anchor" onClick={handleExploreClick}>
        {popover}
        <Box className="image">
          <Image
            src={network.image}
            objectFit="contain"
            width="48px"
            height="48px"
            quality={100}
          />
        </Box>
        <Typography variant="h4">{network.name}</Typography>
      </Box>
      <Button
        variant="text"
        className="networkbox__mobile-anchor"
        onClick={handleMobileAnchorClick}
      >
        <Box className="image">
          <Image
            src={network.image}
            objectFit="contain"
            width="48px"
            height="48px"
            quality={100}
          />
        </Box>
        <Typography variant="h4">{network.name}</Typography>
      </Button>
    </motion.div>
  );
};

export default NetworkCard;

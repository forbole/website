import React, { useState } from 'react';
import { Box } from '@mui/material';
import { LayoutGroup } from 'framer-motion';
import { getNetworkInfo } from '@src/utils/network_info';
import { NetworkCard } from './components';
import { networkKeys, networkParams } from './config';
import useStyles from './useStyles';

const NetworkGrid = () => {
  const styles = useStyles();
  const networkData = networkKeys.map((x: string | number) =>
    getNetworkInfo(x)
  );
  const [showMobilePopover, setShowMobilePopover] = useState('');

  return (
    <Box css={styles.root}>
      <Box className="home__networks">
        <LayoutGroup>
          {networkData.map((network) => {
            return (
              <NetworkCard
                key={network.name}
                network={network}
                networkSummary={networkParams[network.key]}
                showMobilePopover={showMobilePopover}
                setShowMobilePopover={setShowMobilePopover}
              />
            );
          })}
        </LayoutGroup>
      </Box>
    </Box>

    // </Box>
  );
};

export default NetworkGrid;

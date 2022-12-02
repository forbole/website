/* eslint-disable no-bitwise */
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { LayoutGroup } from 'framer-motion';
import { getNetworkInfo } from '@src/utils/network_info';
import { NetworkCard } from './components';
import { cosmosNetworkKeys } from './config';
import useStyles from './useStyles';
import { useNetworkHook } from './hooks';

const NetworkGrid = () => {
  const styles = useStyles();
  const cosmosNetworkData = cosmosNetworkKeys.map((x: string | number) =>
    getNetworkInfo(x)
  );
  const elrondNetworkData = getNetworkInfo('elrond');
  const solanaNetworkData = getNetworkInfo('solana');
  const [showMobilePopover, setShowMobilePopover] = useState('');
  const { cosmosNetworks, elrondNetwork, solanaNetwork } = useNetworkHook();

  return (
    <Box css={styles.root}>
      <Box className="home__networks">
        <LayoutGroup>
          {cosmosNetworkData.map((network) => {
            return (
              <NetworkCard
                key={network.name}
                network={network}
                networkSummary={cosmosNetworks[network.graphql]}
                showMobilePopover={showMobilePopover}
                setShowMobilePopover={setShowMobilePopover}
              />
            );
          })}
          <NetworkCard
            key={elrondNetworkData.name}
            network={elrondNetworkData}
            networkSummary={elrondNetwork[elrondNetworkData.graphql]}
            showMobilePopover={showMobilePopover}
            setShowMobilePopover={setShowMobilePopover}
          />
          <NetworkCard
            key={solanaNetworkData.name}
            network={solanaNetworkData}
            networkSummary={solanaNetwork[solanaNetworkData.graphql]}
            showMobilePopover={showMobilePopover}
            setShowMobilePopover={setShowMobilePopover}
          />
        </LayoutGroup>
      </Box>
    </Box>

    // </Box>
  );
};

export default NetworkGrid;

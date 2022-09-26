import React from 'react';
import { Box } from '@mui/material';
import useStyles from './useStyles';
import { statsItems } from './config';
import { StatsCard } from './components';

const Stats = () => {
  const styles = useStyles();
  return (
    <Box css={styles.grid}>
      {statsItems.map((stat) => (
        <StatsCard title={stat.title} stats={stat.stats} />
      ))}
    </Box>
  );
};

export default Stats;

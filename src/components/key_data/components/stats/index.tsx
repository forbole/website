import { Box } from "@mui/material";

import { useStatsHook } from "@screens/staking/components/hero/components/stats/hooks";

import { StatsCard } from "./components";
import useStyles from "./useStyles";

const Stats = () => {
  const styles = useStyles();
  const stats = useStatsHook();

  // the state - stats - here is an object,
  // so Object.keys returns an array of the objects keys that you can loop over:
  const statsKeys = Object.keys(stats);
  return (
    <Box css={styles.grid}>
      {statsKeys.map((key: any, index) => {
        const statsItem = stats[key];

        return (
          <StatsCard
            key={index}
            stats={statsItem.stats}
            title={statsItem.title}
          />
        );
      })}
    </Box>
  );
};

export default Stats;

import { Box } from "@mui/material";

import { StatsCard } from "./components";
import { useStatsHook } from "./hooks";
import useStyles from "./useStyles";

const Stats = () => {
  const styles = useStyles();
  const stats = useStatsHook();
  // the state - stats - here is an object,
  // so Object.keys returns an array of the objects keys that you can loop over:
  const statsKeys = Object.keys(stats);
  return (
    <Box css={styles.grid}>
      {statsKeys.map((key: any) => {
        const statsItem = stats[key];
        return (
          <StatsCard
            key={key}
            title={statsItem.title}
            stats={statsItem.stats}
          />
        );
      })}
    </Box>
  );
};

export default Stats;
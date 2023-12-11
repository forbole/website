import { Box } from "@mui/material";

import StatsCard from "./components/stats_card";
import { useStatsHook } from "./hooks";
import * as styles from "./index.module.scss";

const Stats = () => {
  const stats = useStatsHook();
  const statsKeys = Object.keys(stats);

  return (
    <Box className={styles.grid} data-test="stats-cards">
      {statsKeys.sort().map((key: any) => {
        const statsItem = stats[key];

        return (
          <StatsCard
            key={key}
            stats={statsItem.stats}
            title={statsItem.title}
          />
        );
      })}
    </Box>
  );
};

export default Stats;

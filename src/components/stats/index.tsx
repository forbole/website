import { StakingProvider } from "@src/screens/staking/lib/staking_sdk/context";
import GQLProvider from "@src/utils/gql";

import StatsCard from "./components/stats_card";
import { useStatsHook } from "./hooks";
import * as styles from "./index.module.scss";

type Props = {
  red?: boolean;
};

const Stats = ({ red }: Props) => {
  const stats = useStatsHook();
  const statsKeys = Object.keys(stats);

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid} data-test="stats-cards">
        {statsKeys.sort().map((key: any) => {
          const statsItem = stats[key];

          return (
            <StatsCard
              key={key}
              red={red}
              stats={statsItem.stats}
              title={statsItem.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export const StatsWithProvider = (props: Props) => (
  <GQLProvider>
    <StakingProvider>
      <Stats {...props} />
    </StakingProvider>
  </GQLProvider>
);

export default Stats;

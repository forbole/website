/* eslint-disable array-callback-return */
/* eslint-disable no-console */
import { useState, useMemo } from 'react';
import { useQuery, gql } from '@apollo/client';
import { getCosmosUsersCount, getAllCosmosTVL } from '@graphql/queries';
import { statsItems } from './config';

export const useStatsHook = () => {
  const [stats, setStats] = useState(statsItems);
  const { loading: totalTVLLoading, data: totalTVL } = useQuery(
    gql`
      ${getAllCosmosTVL()}
    `
  );
  const { loading: cosmosUsersCountLoading, data: cosmosUsersCountData } =
    useQuery(
      gql`
        ${getCosmosUsersCount()}
      `
    );

  useMemo(() => {
    if (!totalTVLLoading) {
      const { allCosmosTVL } = totalTVL;
      statsItems.map((item, i) =>
        item.title === 'full tvl'
          ? setStats((prevStats) => ({
              ...prevStats,
              [i]: {
                ...item,
                stats: allCosmosTVL[0].cosmosTVL,
              },
            }))
          : null
      );
    }
    return stats;
  }, [totalTVL]);

  useMemo(() => {
    if (!cosmosUsersCountLoading) {
      console.log('total tvl', cosmosUsersCountData);
      const { cosmosUsersCount } = cosmosUsersCountData;
      statsItems.map((item, i) =>
        item.title === 'users staking'
          ? setStats((prevStats) => ({
              ...prevStats,
              [i]: {
                ...item,
                stats: cosmosUsersCount[0].usersCount,
              },
            }))
          : null
      );
    }
    return stats;
  }, [cosmosUsersCountData]);

  return stats;
};

/* eslint-disable array-callback-return */
/* eslint-disable no-console */
import { useState, useMemo } from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  getCosmosUsersCount,
  getAllCosmosTVL,
  getElrondTVL,
  // getSolanaTVL,
  // getOasisTVL,
} from '@graphql/queries';
import { networkFunctions } from '@utils/network_functions';
import { statsItems } from './config';

export const useStatsHook = () => {
  const [stats, setStats] = useState(statsItems);
  const [cosmosTVL, setCosmosTVL] = useState(0);
  const [elrondTotalTVL, setElrondTotalTVL] = useState(0);
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

  const { loading: elrondTVLLoading, data: elrondTVLData } = useQuery(
    gql`
      ${getElrondTVL()}
    `
  );

  useMemo(() => {
    if (!totalTVLLoading) {
      const { allCosmosTVL } = totalTVL;
      setCosmosTVL(allCosmosTVL[0].cosmosTVL);
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
  }, [totalTVL, totalTVLLoading]);

  useMemo(() => {
    if (!elrondTVLLoading) {
      const { elrondTVL } = elrondTVLData;
      const elrondNetworkFunctions = networkFunctions.elrond;
      const TVL = elrondNetworkFunctions.converter(elrondTVL[0].TVL);
      setElrondTotalTVL(TVL);
      const updatedTVL = Number(cosmosTVL) + Number(elrondTotalTVL);
      statsItems.map((item, i) =>
        item.title === 'full tvl'
          ? setStats((prevStats) => ({
              ...prevStats,
              [i]: {
                ...item,
                stats: updatedTVL,
              },
            }))
          : null
      );
    }
    return stats;
  }, [
    elrondTVLData,
    elrondTVLLoading,
    cosmosTVL,
    setCosmosTVL,
    totalTVL,
    totalTVLLoading,
  ]);

  useMemo(() => {
    if (!cosmosUsersCountLoading) {
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
  }, [cosmosUsersCountData, cosmosUsersCountLoading]);

  return stats;
};

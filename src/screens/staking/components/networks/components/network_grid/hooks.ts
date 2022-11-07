/* eslint-disable no-console */
import { useState, useMemo } from 'react';
import { useQuery, gql } from '@apollo/client';
import { getEachCosmosBondedToken, getEachCosmosAPY } from '@graphql/queries';
import { networkParams } from './config';

export const useNetworkHook = () => {
  const [networks, setNetworks] = useState(networkParams);
  const { loading: bondedLoading, data: bondedData } = useQuery(
    gql`
      ${getEachCosmosBondedToken()}
    `
  );
  const { loading: apyLoading, data: apyData } = useQuery(
    gql`
      ${getEachCosmosAPY()}
    `
  );
  useMemo(() => {
    if (!bondedLoading) {
      const { eachCosmosBondedToken } = bondedData;
      eachCosmosBondedToken.map((data: any) => {
        const keys = Object.keys(networks);
        // eslint-disable-next-line no-unused-expressions
        keys.includes(data.metric.instance)
          ? setNetworks((prev) => ({
              ...prev,
              [data.metric.instance]: {
                ...networks[data.metric.instance],
                bonded: data.bondedToken,
              },
            }))
          : null;
        return networks;
      });
    } else {
      console.log('bonded data loading');
    }
    if (!apyLoading) {
      const { eachCosmosAPY } = apyData;
      eachCosmosAPY.map((data: any) => {
        const keys = Object.keys(networks);
        // eslint-disable-next-line no-unused-expressions
        keys.includes(data.metric.instance)
          ? setNetworks((prev) => ({
              ...prev,
              [data.metric.instance]: {
                ...networks[data.metric.instance],
                APY: data.APY,
              },
            }))
          : null;
        return networks;
      });
    } else {
      console.log('APY data loading');
    }
  }, [bondedData, apyData]);
  return {
    networks,
  };
};

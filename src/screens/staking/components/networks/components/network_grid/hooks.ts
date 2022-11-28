/* eslint-disable array-callback-return */
/* eslint-disable no-console */
import { useState, useMemo } from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  getEachCosmosBondedToken,
  getEachCosmosAPY,
  getEachCosmosTVL,
} from '@graphql/queries';
import { cosmosNetworkParams } from './config';

export const useNetworkHook = () => {
  const [cosmosNetworks, setCosmosNetworks] = useState(cosmosNetworkParams);
  const { loading: cosmosBondedLoading, data: cosmosBondedData } = useQuery(
    gql`
      ${getEachCosmosBondedToken()}
    `
  );
  const { loading: cosmosAPYLoading, data: cosmosAPYData } = useQuery(
    gql`
      ${getEachCosmosAPY()}
    `
  );
  const { loading: cosmosTVLLoading, data: cosmosTVLData } = useQuery(
    gql`
      ${getEachCosmosTVL()}
    `
  );

  useMemo(() => {
    if (!cosmosBondedLoading) {
      const { eachCosmosBondedToken } = cosmosBondedData;
      eachCosmosBondedToken.map((data: any) => {
        const keys = Object.keys(cosmosNetworks);
        // eslint-disable-next-line no-unused-expressions
        keys.includes(data.metric.instance)
          ? setCosmosNetworks((prev) => ({
              ...prev,
              [data.metric.instance]: {
                ...cosmosNetworks[data.metric.instance],
                bonded: data.bondedToken,
              },
            }))
          : null;
      });
    }
    return cosmosNetworks;
  }, [cosmosBondedData, cosmosBondedLoading]);

  useMemo(() => {
    if (!cosmosAPYLoading) {
      const { eachCosmosAPY } = cosmosAPYData;
      eachCosmosAPY.map((data: any) => {
        const keys = Object.keys(cosmosNetworks);
        // eslint-disable-next-line no-unused-expressions
        keys.includes(data.metric.instance)
          ? setCosmosNetworks((prev) => ({
              ...prev,
              [data.metric.instance]: {
                ...cosmosNetworks[data.metric.instance],
                APY: data.APY,
              },
            }))
          : null;
      });
    }
    return cosmosNetworks;
  }, [cosmosAPYData, cosmosAPYLoading]);

  useMemo(() => {
    if (!cosmosTVLLoading) {
      const { eachCosmosTVL } = cosmosTVLData;
      eachCosmosTVL.map((data: any) => {
        const keys = Object.keys(cosmosNetworks);
        // eslint-disable-next-line no-unused-expressions
        keys.includes(data.metric.instance)
          ? setCosmosNetworks((prev) => ({
              ...prev,
              [data.metric.instance]: {
                ...cosmosNetworks[data.metric.instance],
                TVL: data.TVL,
              },
            }))
          : null;
      });
    }
    return cosmosNetworks;
  }, [cosmosTVLData, cosmosTVLLoading]);

  return {
    cosmosNetworks,
  };
};

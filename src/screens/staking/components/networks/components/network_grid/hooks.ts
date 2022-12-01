/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
import { useState, useMemo } from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  getEachCosmosBondedToken,
  getEachCosmosAPY,
  getEachCosmosTVL,
  getElrondBondedToken,
  getElrondAPY,
  getElrondTVL,
} from '@graphql/queries';
import { networkFunctions } from '@utils/network_functions';
import { cosmosNetworkParams, elrondNetworkParams } from './config';

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

  const [elrondNetwork, setElrondNetwork] = useState(elrondNetworkParams);
  const elrondNetworkFunctions = networkFunctions.elrond;
  const { loading: elrondBondedLoading, data: elrondBondedData } = useQuery(
    gql`
      ${getElrondBondedToken()}
    `
  );
  const { loading: elrondAPYLoading, data: elrondAPYData } = useQuery(
    gql`
      ${getElrondAPY()}
    `
  );
  const { loading: elrondTVLLoading, data: elrondTVLData } = useQuery(
    gql`
      ${getElrondTVL()}
    `
  );

  useMemo(() => {
    if (!cosmosBondedLoading) {
      const { eachCosmosBondedToken } = cosmosBondedData;
      eachCosmosBondedToken.map((data: any) => {
        const keys = Object.keys(cosmosNetworks);
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

  useMemo(() => {
    if (!elrondBondedLoading) {
      const { elrondBondedToken } = elrondBondedData;
      elrondBondedToken.map((data: any) => {
        const key = Object.keys(elrondNetwork);
        key.includes(data.metric.instance)
          ? setElrondNetwork((prev) => ({
              ...prev,
              [data.metric.instance]: {
                ...elrondNetwork[data.metric.instance],
                bonded: elrondNetworkFunctions.converter(data.bondedToken),
              },
            }))
          : null;
      });
    }
  }, [elrondBondedData, elrondBondedLoading]);

  useMemo(() => {
    if (!elrondAPYLoading) {
      const { elrondAPY } = elrondAPYData;
      elrondAPY.map((data: any) => {
        const key = Object.keys(elrondNetwork);
        key.includes(data.metric.instance)
          ? setElrondNetwork((prev) => ({
              ...prev,
              [data.metric.instance]: {
                ...elrondNetwork[data.metric.instance],
                APY: elrondNetworkFunctions.converter(data.APY),
              },
            }))
          : null;
      });
    }
  }, [elrondAPYData, elrondAPYLoading]);

  useMemo(() => {
    if (!elrondTVLLoading) {
      const { elrondTVL } = elrondTVLData;
      elrondTVL.map((data: any) => {
        const key = Object.keys(elrondNetwork);
        key.includes(data.metric.instance)
          ? setElrondNetwork((prev) => ({
              ...prev,
              [data.metric.instance]: {
                ...elrondNetwork[data.metric.instance],
                TVL: elrondNetworkFunctions.converter(data.TVL),
              },
            }))
          : null;
      });
    }
  }, [elrondTVLData, elrondTVLLoading]);

  return {
    cosmosNetworks,
    elrondNetwork,
  };
};

/* eslint-disable no-console */
import { useState, useMemo } from 'react';
import { useQuery, gql } from '@apollo/client';
import { getEachCosmosBondedToken } from '@graphql/queries/bondedToken';
import { networkParams } from './config';

export const useNetworkHook = () => {
  const [networks, setNetworks] = useState(networkParams);
  const { loading, data: bondedData } = useQuery(
    gql`
      ${getEachCosmosBondedToken()}
    `
  );
  useMemo(() => {
    if (!loading) {
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
      console.log('data laoding');
    }
  }, [bondedData]);
  return {
    networks,
  };
};

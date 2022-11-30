/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
import { useState, useMemo } from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  getEachCosmosAPY,
  getEachCosmosTVL,
  getEachCosmosCommission,
  getEachCosmosUnbondingTime,
} from '@graphql/queries';
import { cosmosNetworkGuideParams } from './config';

export const useNetworkGuidesHook = () => {
  const [cosmosNetworkGuides, setCosmosNetworkGuides] = useState(
    cosmosNetworkGuideParams
  );

  const { loading: cosmosComissionLoading, data: cosmosComissionData } =
    useQuery(
      gql`
        ${getEachCosmosCommission()}
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
  const { loading: cosmosUnbondingTimeLoading, data: cosmosUnbondingTimeData } =
    useQuery(
      gql`
        ${getEachCosmosUnbondingTime()}
      `
    );

  useMemo(() => {
    if (!cosmosComissionLoading) {
      const { eachCosmosCommission } = cosmosComissionData;
      eachCosmosCommission.map((data: any) => {
        const keys = Object.keys(cosmosNetworkGuides);
        keys.includes(data.metric.instance)
          ? setCosmosNetworkGuides((prev) => ({
              ...prev,
              [data.metric.instance]: [
                // ...prev[data.metric.instance],
                {
                  title: 'commission',
                  stats: data.commissionRate,
                  type: 'percentage',
                },
              ],
            }))
          : null;
      });
    }
    return cosmosNetworkGuides;
  }, [cosmosComissionData, cosmosComissionLoading]);

  useMemo(() => {
    if (!cosmosAPYLoading) {
      const { eachCosmosAPY } = cosmosAPYData;
      eachCosmosAPY.map((data: any) => {
        const keys = Object.keys(cosmosNetworkGuides);
        keys.includes(data.metric.instance)
          ? setCosmosNetworkGuides((prev) => ({
              ...prev,
              [data.metric.instance]: [
                ...prev[data.metric.instance],
                {
                  title: 'apy',
                  stats: data.APY,
                  type: 'percentage',
                },
              ],
            }))
          : null;
      });
    }
    return cosmosNetworkGuides;
  }, [cosmosAPYData, cosmosAPYLoading]);

  useMemo(() => {
    if (!cosmosTVLLoading) {
      const { eachCosmosTVL } = cosmosTVLData;
      eachCosmosTVL.map((data: any) => {
        const keys = Object.keys(cosmosNetworkGuides);
        keys.includes(data.metric.instance)
          ? setCosmosNetworkGuides((prev) => ({
              ...prev,
              [data.metric.instance]: [
                ...prev[data.metric.instance],
                {
                  title: 'staked by forbole',
                  stats: data.TVL,
                  type: 'money',
                },
              ],
            }))
          : null;
      });
    }
    return cosmosNetworkGuides;
  }, [cosmosTVLData, cosmosTVLLoading]);

  useMemo(() => {
    if (!cosmosUnbondingTimeLoading) {
      const { eachCosmosUnbondingTime } = cosmosUnbondingTimeData;
      eachCosmosUnbondingTime.map((data: any) => {
        const keys = Object.keys(cosmosNetworkGuides);
        keys.includes(data.metric.instance)
          ? setCosmosNetworkGuides((prev) => ({
              ...prev,
              [data.metric.instance]: [
                ...prev[data.metric.instance],
                {
                  title: 'unbonding period',
                  stats: data.unbondingTime,
                  type: 'string',
                },
              ],
            }))
          : null;
      });
    }
    return cosmosNetworkGuides;
  }, [cosmosUnbondingTimeData, cosmosUnbondingTimeLoading]);

  return {
    cosmosNetworkGuides,
  };
};

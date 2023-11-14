/* eslint-disable no-unused-expressions */
import { gql, useQuery } from "@apollo/client";
import {
  getEachCosmosAPY,
  getEachCosmosCommission,
  getEachCosmosTVL,
  getEachCosmosUnbondingTime,
} from "@graphql/queries";
import { useMemo, useState } from "react";

import { cosmosNetworkGuideParams } from "./config";

export const useNetworkGuidesHook = () => {
  const [cosmosNetworkGuides, setCosmosNetworkGuides] = useState(
    cosmosNetworkGuideParams,
  );

  const { loading: cosmosComissionLoading, data: cosmosComissionData } =
    useQuery(gql`
      ${getEachCosmosCommission()}
    `);
  const { loading: cosmosAPYLoading, data: cosmosAPYData } = useQuery(gql`
    ${getEachCosmosAPY()}
  `);
  const { loading: cosmosTVLLoading, data: cosmosTVLData } = useQuery(gql`
    ${getEachCosmosTVL()}
  `);
  const { loading: cosmosUnbondingTimeLoading, data: cosmosUnbondingTimeData } =
    useQuery(gql`
      ${getEachCosmosUnbondingTime()}
    `);

  useMemo(() => {
    if (!cosmosComissionLoading) {
      const { eachCosmosCommission } = cosmosComissionData;
      eachCosmosCommission.forEach((data: any) => {
        const keys = Object.keys(cosmosNetworkGuides);
        keys.includes(data.metric.instance)
          ? setCosmosNetworkGuides((prev) => ({
              ...prev,
              [data.metric.instance]: [
                {
                  title: "commission",
                  stats: data.commissionRate,
                  type: "percentage",
                },
              ],
            }))
          : null;
      });
    }
    return cosmosNetworkGuides;
  }, [cosmosComissionData, cosmosComissionLoading, cosmosNetworkGuides]);

  useMemo(() => {
    if (!cosmosAPYLoading) {
      const { eachCosmosAPY } = cosmosAPYData;
      eachCosmosAPY.forEach((data: any) => {
        const keys = Object.keys(cosmosNetworkGuides);
        keys.includes(data.metric.instance)
          ? setCosmosNetworkGuides((prev) => ({
              ...prev,
              [data.metric.instance]: [
                ...prev[data.metric.instance],
                {
                  title: "apy",
                  stats: data.APY,
                  type: "percentage",
                },
              ],
            }))
          : null;
      });
    }
    return cosmosNetworkGuides;
  }, [cosmosAPYData, cosmosAPYLoading, cosmosNetworkGuides]);

  useMemo(() => {
    if (!cosmosTVLLoading) {
      const { eachCosmosTVL } = cosmosTVLData;
      eachCosmosTVL.forEach((data: any) => {
        const keys = Object.keys(cosmosNetworkGuides);
        keys.includes(data.metric.instance)
          ? setCosmosNetworkGuides((prev) => ({
              ...prev,
              [data.metric.instance]: [
                ...prev[data.metric.instance],
                {
                  title: "staked by forbole",
                  stats: data.TVL,
                  type: "money",
                },
              ],
            }))
          : null;
      });
    }
    return cosmosNetworkGuides;
  }, [cosmosTVLData, cosmosTVLLoading, cosmosNetworkGuides]);

  useMemo(() => {
    if (!cosmosUnbondingTimeLoading) {
      const { eachCosmosUnbondingTime } = cosmosUnbondingTimeData;
      eachCosmosUnbondingTime.forEach((data: any) => {
        const keys = Object.keys(cosmosNetworkGuides);
        keys.includes(data.metric.instance)
          ? setCosmosNetworkGuides((prev) => ({
              ...prev,
              [data.metric.instance]: [
                ...prev[data.metric.instance],
                {
                  title: "unbonding period",
                  stats: data.unbondingTime,
                  type: "string",
                },
              ],
            }))
          : null;
      });
    }
    return cosmosNetworkGuides;
  }, [
    cosmosUnbondingTimeData,
    cosmosUnbondingTimeLoading,
    cosmosNetworkGuides,
  ]);

  return {
    cosmosNetworkGuides,
  };
};

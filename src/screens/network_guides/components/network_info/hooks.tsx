/* eslint-disable no-unused-expressions */
import { gql, useQuery } from "@apollo/client";
import {
  getEachCosmosAPY,
  getEachCosmosCommission,
  getEachCosmosTVL,
  getEachCosmosUnbondingTime,
} from "@graphql/queries";
import useTranslation from "next-translate/useTranslation";
import { useMemo, useState } from "react";

import { cosmosNetworkGuideParams } from "./config";

export const useNetworkGuidesHook = () => {
  const { t } = useTranslation("staking");
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
                  title: t("commission"),
                  stats: data.commissionRate,
                  type: t("percentage"),
                },
              ],
            }))
          : null;
      });
    }
    return cosmosNetworkGuides;
  }, [cosmosComissionData, cosmosComissionLoading, cosmosNetworkGuides, t]);

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
                  title: t("apy"),
                  stats: data.APY,
                  type: t("percentage"),
                },
              ],
            }))
          : null;
      });
    }
    return cosmosNetworkGuides;
  }, [cosmosAPYData, cosmosAPYLoading, cosmosNetworkGuides, t]);

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
                  title: t("staked by forbole"),
                  stats: data.TVL,
                  type: t("money"),
                },
              ],
            }))
          : null;
      });
    }
    return cosmosNetworkGuides;
  }, [cosmosTVLData, cosmosTVLLoading, cosmosNetworkGuides, t]);

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
                  title: t("unbonding period"),
                  stats: data.unbondingTime,
                  type: t("string"),
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
    t,
  ]);

  return {
    cosmosNetworkGuides,
  };
};

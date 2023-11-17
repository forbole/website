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

import { useCosmosNetworkGuideParams } from "./config";

export const useNetworkGuidesHook = () => {
  const { t } = useTranslation("staking");
  const cosmosNetworkGuideParams = useCosmosNetworkGuideParams();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cosmosComissionData, cosmosComissionLoading]);

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cosmosAPYData, cosmosAPYLoading]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cosmosTVLData, cosmosTVLLoading]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cosmosUnbondingTimeData, cosmosUnbondingTimeLoading]);

  return {
    cosmosNetworkGuides,
  };
};

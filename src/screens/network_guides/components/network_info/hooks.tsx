/* eslint-disable no-unused-expressions */
import { useQuery } from "@apollo/client";
import useTranslation from "next-translate/useTranslation";
import { __, assocPath, pipe, reduce } from "ramda";
import { useMemo } from "react";

import { networkGuideQuery } from "@src/graphql/queries/networkGuide";
import { allNetworkKeys } from "@src/utils/network_info";

type InfoBlock = {
  stats: string;
  title: string;
  type: string;
};

export const useNetworkGuidesHook = () => {
  const { t } = useTranslation("staking");

  const networkGuideParams = useMemo(
    () =>
      reduce(
        (acc: any, networkKey: any) => assocPath([networkKey], [], acc),
        {},
        allNetworkKeys,
      ),
    [],
  );

  const { data: networkGuideData, loading: networkGuideLoading } =
    useQuery(networkGuideQuery);

  const networkGuides: Record<string, InfoBlock[]> = useMemo(() => {
    if (!networkGuideLoading && networkGuideData) {
      const {
        eachCosmosAPY,
        eachCosmosCommission,
        eachCosmosTVL,
        eachCosmosUnbondingTime,
        suiAPY,
      } = networkGuideData;

      const getAPYBlock = (stats: string) =>
        stats
          ? {
              stats,
              title: t("apy"),
              type: t("percentage"),
            }
          : undefined;

      return pipe(
        reduce(
          (acc: any, data: any) =>
            assocPath(
              [data.metric.instance],
              [
                {
                  stats: data.commissionRate,
                  title: t("commission"),
                  type: t("percentage"),
                },
              ],
              acc,
            ),
          __,
          eachCosmosCommission,
        ),
        reduce(
          (acc: any, data: any) =>
            assocPath(
              [data.metric.instance],
              [...acc[data.metric.instance], getAPYBlock(data.APY)].filter(
                Boolean,
              ),
              acc,
            ),
          __,
          eachCosmosAPY,
        ),
        (data) =>
          assocPath(
            ["sui"],
            [...data.sui, getAPYBlock(suiAPY?.APY)].filter(Boolean),
            data,
          ),
        reduce(
          (acc: any, data: any) =>
            assocPath(
              [data.metric.instance],
              [
                ...acc[data.metric.instance],
                {
                  stats: data.TVL,
                  title: t("staked by forbole"),
                  type: t("money"),
                },
              ],
              acc,
            ),
          __,
          eachCosmosTVL,
        ),
        reduce(
          (acc: any, data: any) =>
            assocPath(
              [data.metric.instance],
              [
                ...acc[data.metric.instance],
                {
                  stats: data.unbondingTime,
                  title: t("unbonding period"),
                  type: t("string"),
                },
              ],
              acc,
            ),
          __,
          eachCosmosUnbondingTime,
        ),
      )(networkGuideParams);
    }

    return networkGuideParams;
  }, [networkGuideLoading, networkGuideData, t, networkGuideParams]);

  return {
    networkGuides,
  };
};

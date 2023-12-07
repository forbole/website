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

  const { loading: networkGuideLoading, data: networkGuideData } =
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
              title: t("apy"),
              stats,
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
                  title: t("commission"),
                  stats: data.commissionRate,
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
                  title: t("staked by forbole"),
                  stats: data.TVL,
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
                  title: t("unbonding period"),
                  stats: data.unbondingTime,
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

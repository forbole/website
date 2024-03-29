import useTranslation from "next-translate/useTranslation";
import { __, assocPath, identity, pipe, reduce } from "ramda";
import { useMemo } from "react";
import { useQuery } from "urql";

import { networkGridQuery } from "@src/graphql/queries/networkGrid";
import { networkFunctions } from "@src/utils/network_functions";

import type { NetworkProps } from "./config";
import {
  cosmosNetworkParams,
  elrondNetworkParams,
  oasisNetworkParams,
  radixNetworkParams,
  solanaNetworkParams,
  suiNetworkParams,
} from "./config";

const elrondNetworkFunctions = networkFunctions.elrond;

export const useNetworkHook = () => {
  const { t } = useTranslation("staking");

  const [{ data: networkGridData, fetching: networkGridLoading }] = useQuery({
    query: networkGridQuery,
  });

  const cosmosNetworks = useMemo(() => {
    if (!networkGridLoading && networkGridData) {
      const {
        archwayBondedToken,
        archwayTVL,
        eachCosmosAPY,
        eachCosmosBondedToken,
        eachCosmosTVL,
      } = networkGridData;

      return pipe(
        reduce<any, any>(
          (acc: any, data: any) =>
            assocPath([data.metric.instance, "bonded"], data.bondedToken, acc),
          __,
          eachCosmosBondedToken,
        ),
        assocPath(
          ["archway", "bonded"],
          archwayBondedToken?.bondedToken || undefined,
        ),
        assocPath(["archway", "TVL"], archwayTVL?.TVL || undefined),
        reduce(
          (acc: any, data: any) =>
            assocPath([data.metric.instance, "APY"], data.APY, acc),
          __,
          eachCosmosAPY,
        ),
        reduce(
          (acc: any, data: any) =>
            assocPath([data.metric.instance, "TVL"], data.TVL, acc),
          __,
          eachCosmosTVL,
        ),
      )(cosmosNetworkParams);
    }

    return cosmosNetworkParams;
  }, [networkGridData, networkGridLoading]);

  // These are hardcoded until we have the new logic to dynamically generate them
  const ethereumNetwork: NetworkProps = useMemo(
    () => ({
      ethereum: {
        APY: 0,
        bonded: 0,
        custom: {
          content: {
            "POOL APY": "3.16%",
            "POOL MEV APY": "4.55%",
            "SOLO AVG APY": "4%",
            "SOLO MEV APY": "5,69%",
          },
          tooltips: {
            "POOL APY": t("tooltip.poolAPY"),
            "POOL MEV APY": t("tooltip.poolMevAPY"),
            "SOLO AVG APY": t("tooltip.soloAvgAPY"),
            "SOLO MEV APY": t("tooltip.soloMevAPY"),
          },
        },
        TVL: 0,
      },
    }),
    [t],
  );

  const elrondNetwork = useMemo(() => {
    if (!networkGridLoading && networkGridData) {
      const { elrondAPY, elrondBondedToken, elrondTVL } = networkGridData;

      return pipe(
        reduce<any, any>(
          (acc: any, data: any) =>
            assocPath(
              [data.metric.instance, "bonded"],
              elrondNetworkFunctions.converter(data.bondedToken),
              acc,
            ),
          __,
          elrondBondedToken,
        ),
        reduce(
          (acc: any, data: any) =>
            assocPath(
              [data.metric.instance, "APY"],
              elrondNetworkFunctions.converter(data.APY),
              acc,
            ),
          __,
          elrondAPY,
        ),
        reduce(
          (acc: any, data: any) =>
            assocPath(
              [data.metric.instance, "TVL"],
              elrondNetworkFunctions.converter(data.TVL),
              acc,
            ),
          __,
          elrondTVL,
        ),
      )(elrondNetworkParams);
    }

    return elrondNetworkParams;
  }, [networkGridLoading, networkGridData]);

  const solanaNetwork = useMemo(() => {
    if (!networkGridLoading && networkGridData) {
      const { solanaBondedToken, solanaTVL } = networkGridData;

      if (!solanaTVL || !solanaBondedToken) {
        return solanaNetworkParams;
      }

      return pipe(
        assocPath([solanaTVL.metric.instance, "TVL"], solanaTVL.TVL),
        assocPath(
          [solanaBondedToken.metric.instance, "bonded"],
          solanaBondedToken.bondedToken,
        ),
      )(solanaNetworkParams) as NetworkProps;
    }

    return solanaNetworkParams;
  }, [networkGridData, networkGridLoading]);

  const oasisNetwork = useMemo(() => {
    if (!networkGridLoading && networkGridData) {
      const { oasisBondedToken, oasisTVL } = networkGridData;

      if (
        !oasisBondedToken?.[0]?.metric?.instance ||
        !oasisTVL?.[0]?.metric?.instance
      ) {
        return oasisNetworkParams;
      }

      const networkWithTVL = {
        ...oasisNetworkParams,
        [oasisTVL[0].metric.instance]: {
          ...oasisNetworkParams[oasisTVL[0].metric.instance],
          TVL: oasisTVL[0].TVL,
        },
      };

      const key = oasisBondedToken[0].metric.instance;
      const bonded = oasisBondedToken[0].bondedToken;

      return {
        ...networkWithTVL,
        [key]: {
          ...(networkWithTVL as any)[key],
          bonded,
        },
      };
    }

    return oasisNetworkParams;
  }, [networkGridData, networkGridLoading]);

  const suiNetwork = useMemo(() => {
    if (!networkGridLoading && networkGridData) {
      const suiBondedToken = networkGridData?.suiBondedToken
        ?.bondedToken as string;

      const apy = networkGridData?.suiAPY?.APY as string;
      const tvl = networkGridData?.suiTVL?.TVL as string;
      const bonded = Number(suiBondedToken);

      return pipe(
        assocPath(["sui", "APY"], apy),
        assocPath(["sui", "TVL"], tvl),
        Number.isNaN(bonded) ? identity : assocPath(["sui", "bonded"], bonded),
      )(suiNetworkParams) as NetworkProps;
    }

    return suiNetworkParams;
  }, [networkGridData, networkGridLoading]);

  const radixNetwork = useMemo(() => {
    if (!networkGridLoading && networkGridData) {
      const { radixAPY, radixBondedToken, radixTVL } = networkGridData;
      const { TVL } = radixTVL?.[0] || {};
      const { APY } = radixAPY?.[0] || {};
      const { bondedToken } = radixBondedToken?.[0] || {};

      return pipe(
        assocPath(["radix", "TVL"], TVL),
        assocPath(["radix", "APY"], APY),
        assocPath(["radix", "bonded"], bondedToken),
      )(radixNetworkParams) as NetworkProps;
    }

    return radixNetworkParams;
  }, [networkGridData, networkGridLoading]);

  return {
    cosmosNetworks,
    elrondNetwork,
    ethereumNetwork,
    oasisNetwork,
    radixNetwork,
    solanaNetwork,
    suiNetwork,
  };
};

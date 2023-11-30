import { useQuery } from "@apollo/client";
import { networkGridQuery } from "@graphql/queries";
import { assocPath, compose } from "ramda";
import { useMemo } from "react";

import { networkFunctions } from "@utils/network_functions";

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
  const { loading: networkGridLoading, data: networkGridData } =
    useQuery(networkGridQuery);

  const cosmosNetworks = useMemo(() => {
    if (!networkGridLoading && networkGridData) {
      const { eachCosmosBondedToken, eachCosmosAPY, eachCosmosTVL } =
        networkGridData;

      const keys = Object.keys(cosmosNetworkParams);

      const objWithBonded = eachCosmosBondedToken.reduce(
        (acc: any, data: any) => {
          if (keys.includes(data.metric.instance)) {
            return {
              ...acc,
              [data.metric.instance]: {
                ...acc[data.metric.instance],
                bonded: data.bondedToken,
              },
            };
          }

          return acc;
        },
        cosmosNetworkParams,
      );

      const objWithAYP = eachCosmosAPY.reduce((acc: any, data: any) => {
        if (keys.includes(data.metric.instance)) {
          return {
            ...acc,
            [data.metric.instance]: {
              ...acc[data.metric.instance],
              APY: data.APY,
            },
          };
        }

        return acc;
      }, objWithBonded);

      return eachCosmosTVL.reduce((acc: any, data: any) => {
        if (keys.includes(data.metric.instance)) {
          return {
            ...acc,
            [data.metric.instance]: {
              ...acc[data.metric.instance],
              TVL: data.TVL,
            },
          };
        }

        return acc;
      }, objWithAYP);
    }

    return cosmosNetworkParams;
  }, [networkGridData, networkGridLoading]);

  const elrondNetwork = useMemo(() => {
    if (!networkGridLoading && networkGridData) {
      const { elrondBondedToken, elrondAPY, elrondTVL } = networkGridData;

      const key = Object.keys(elrondNetworkParams);

      const objWithBonded = elrondBondedToken.reduce((acc: any, data: any) => {
        if (key.includes(data.metric.instance)) {
          return {
            ...acc,
            [data.metric.instance]: {
              ...acc[data.metric.instance],
              bonded: elrondNetworkFunctions.converter(data.bondedToken),
            },
          };
        }

        return acc;
      }, elrondNetworkParams);

      const objWithAPY = elrondAPY.reduce((acc: any, data: any) => {
        if (key.includes(data.metric.instance)) {
          return {
            ...acc,
            [data.metric.instance]: {
              ...acc[data.metric.instance],
              APY: elrondNetworkFunctions.converter(data.APY),
            },
          };
        }
      }, objWithBonded);

      return elrondTVL.reduce((acc: any, data: any) => {
        if (key.includes(data.metric.instance)) {
          return {
            ...acc,
            [data.metric.instance]: {
              ...acc[data.metric.instance],
              TVL: elrondNetworkFunctions.converter(data.TVL),
            },
          };
        }

        return acc;
      }, objWithAPY);
    }

    return elrondNetworkParams;
  }, [networkGridLoading, networkGridData]);

  const solanaNetwork = useMemo(() => {
    if (!networkGridLoading && networkGridData) {
      const { solanaTVL, solanaBondedToken } = networkGridData;

      return compose(
        assocPath([solanaTVL.metric.instance, "TVL"], solanaTVL.TVL),
        assocPath(
          [solanaBondedToken.metric.instance, "bonded"],
          solanaBondedToken.bondedToken,
        ),
      )(solanaNetworkParams);
    }

    return solanaNetworkParams;
  }, [networkGridData, networkGridLoading]);

  const oasisNetwork = useMemo(() => {
    if (!networkGridLoading && networkGridData) {
      const { oasisTVL, oasisBondedToken } = networkGridData;

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

      const bonded = Number(suiBondedToken);
      if (Number.isNaN(bonded)) {
        return;
      }

      return { sui: { bonded, APY: 0, TVL: 0 } };
    }

    return suiNetworkParams;
  }, [networkGridData, networkGridLoading]);

  const radixNetwork = useMemo(() => {
    if (!networkGridLoading && networkGridData) {
      const { radixTVL, allRadixStakedTokens } = networkGridData;
      const tvlKey = radixTVL[0].metric.instance;
      const { TVL } = radixTVL[0];

      const bondedKey = allRadixStakedTokens[0].metric.instance;
      const bonded = allRadixStakedTokens[0].bondedToken;

      return compose(
        assocPath([tvlKey, "TVL"], TVL),
        assocPath([bondedKey, "bonded"], bonded),
      )(radixNetworkParams);
    }
  }, [networkGridData, networkGridLoading]);

  return {
    cosmosNetworks,
    elrondNetwork,
    oasisNetwork,
    radixNetwork,
    solanaNetwork,
    suiNetwork,
  };
};

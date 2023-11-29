import { gql, useQuery } from "@apollo/client";
import {
  getOasisBondedToken,
  getOasisTVL,
  getRadixBondedToken,
  getRadixTVL,
  networkGridQuery,
} from "@graphql/queries";
import { useMemo, useState } from "react";

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

  const [oasisNetwork, setOasisNetwork] = useState(oasisNetworkParams);
  const { loading: oasisBondedLoading, data: oasisBondedData } = useQuery(gql`
    ${getOasisBondedToken()}
  `);
  const { loading: oasisTVLLoading, data: oasisTVLData } = useQuery(gql`
    ${getOasisTVL()}
  `);

  const [radixNetwork, setRadixNetwork] = useState(radixNetworkParams);
  const { loading: radixBondedLoading, data: radixBondedData } = useQuery(gql`
    ${getRadixBondedToken()}
  `);
  const { loading: radixTVLLoading, data: radixTVLData } = useQuery(gql`
    ${getRadixTVL()}
  `);

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

      const objWithTVL = {
        ...solanaNetworkParams,
        [solanaTVL.metric.instance]: {
          ...solanaNetworkParams[solanaTVL.metric.instance],
          TVL: solanaTVL.TVL,
        },
      };

      return {
        ...objWithTVL,
        [solanaBondedToken.metric.instance]: {
          ...(objWithTVL as any)[solanaBondedToken.metric.instance],
          bonded: solanaBondedToken.bondedToken,
        },
      };
    }

    return solanaNetworkParams;
  }, [networkGridData, networkGridLoading]);

  useMemo(() => {
    if (!oasisTVLLoading && oasisTVLData) {
      const { oasisTVL } = oasisTVLData;
      setOasisNetwork((prev) => ({
        ...prev,
        [oasisTVL[0].metric.instance]: {
          ...oasisNetwork[oasisTVL[0].metric.instance],
          TVL: oasisTVL[0].TVL,
        },
      }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oasisTVLLoading, oasisTVLData]);

  useMemo(() => {
    if (!oasisBondedLoading && oasisBondedData) {
      const { oasisBondedToken } = oasisBondedData;
      const key = oasisBondedToken[0].metric.instance;
      const bonded = oasisBondedToken[0].bondedToken;

      if (oasisNetwork[key]?.bonded !== bonded) {
        setOasisNetwork((prev) => ({
          ...prev,
          [key]: {
            ...oasisNetwork[key],
            bonded,
          },
        }));
      }
    }
  }, [oasisBondedData, oasisBondedLoading, oasisNetwork]);

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

  useMemo(() => {
    if (!radixTVLLoading && radixTVLData) {
      const { radixTVL } = radixTVLData;
      const key = radixTVL[0].metric.instance;
      const { TVL } = radixTVL[0];

      if (radixNetwork[key]?.TVL !== TVL) {
        setRadixNetwork((prev) => ({
          ...prev,
          [key]: {
            ...radixNetwork[key],
            TVL,
          },
        }));
      }
    }
  }, [radixTVLLoading, radixTVLData, radixNetwork]);

  useMemo(() => {
    if (!radixBondedLoading && radixBondedData) {
      const { allRadixStakedTokens } = radixBondedData;
      const key = allRadixStakedTokens[0].metric.instance;
      const bonded = allRadixStakedTokens[0].bondedToken;
      if (radixNetwork[key]?.bonded !== bonded) {
        setRadixNetwork((prev) => ({
          ...prev,
          [key]: {
            ...radixNetwork[key],
            bonded,
          },
        }));
      }
    }
  }, [radixBondedData, radixBondedLoading, radixNetwork]);

  return {
    cosmosNetworks,
    elrondNetwork,
    oasisNetwork,
    radixNetwork,
    solanaNetwork,
    suiNetwork,
  };
};

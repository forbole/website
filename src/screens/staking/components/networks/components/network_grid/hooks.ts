/* eslint-disable no-unused-expressions */
import { gql, useQuery } from "@apollo/client";
import {
  getEachCosmosAPY,
  getEachCosmosBondedToken,
  getEachCosmosTVL,
  getElrondAPY,
  getElrondBondedToken,
  getElrondTVL,
  getOasisBondedToken,
  getOasisTVL,
  getRadixBondedToken,
  getRadixTVL,
  getSolanaBondedToken,
  getSolanaTVL,
} from "@graphql/queries";
import { networkFunctions } from "@utils/network_functions";
import { useMemo, useState } from "react";

import {
  cosmosNetworkParams,
  elrondNetworkParams,
  oasisNetworkParams,
  radixNetworkParams,
  solanaNetworkParams,
} from "./config";

export const useNetworkHook = () => {
  const [cosmosNetworks, setCosmosNetworks] = useState(cosmosNetworkParams);
  const { loading: cosmosBondedLoading, data: cosmosBondedData } = useQuery(gql`
    ${getEachCosmosBondedToken()}
  `);
  const { loading: cosmosAPYLoading, data: cosmosAPYData } = useQuery(gql`
    ${getEachCosmosAPY()}
  `);
  const { loading: cosmosTVLLoading, data: cosmosTVLData } = useQuery(gql`
    ${getEachCosmosTVL()}
  `);

  const [elrondNetwork, setElrondNetwork] = useState(elrondNetworkParams);
  const elrondNetworkFunctions = networkFunctions.elrond;
  const { loading: elrondBondedLoading, data: elrondBondedData } = useQuery(gql`
    ${getElrondBondedToken()}
  `);
  const { loading: elrondAPYLoading, data: elrondAPYData } = useQuery(gql`
    ${getElrondAPY()}
  `);
  const { loading: elrondTVLLoading, data: elrondTVLData } = useQuery(gql`
    ${getElrondTVL()}
  `);

  const [solanaNetwork, setSolanaNetwork] = useState(solanaNetworkParams);
  const { loading: solanaBondedLoading, data: solanaBondedData } = useQuery(gql`
    ${getSolanaBondedToken()}
  `);
  const { loading: solanaTVLLoading, data: solanaTVLData } = useQuery(gql`
    ${getSolanaTVL()}
  `);

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

  useMemo(() => {
    if (!cosmosBondedLoading) {
      const { eachCosmosBondedToken } = cosmosBondedData;
      eachCosmosBondedToken.forEach((data: any) => {
        const keys = Object.keys(cosmosNetworks);

        if (
          keys.includes(data.metric.instance) &&
          cosmosNetworks?.[data.metric.instance]?.bonded !== data?.bondedToken
        ) {
          setCosmosNetworks((prev) => ({
            ...prev,
            [data.metric.instance]: {
              ...cosmosNetworks[data.metric.instance],
              bonded: data.bondedToken,
            },
          }));
        }
      });
    }
  }, [cosmosBondedData, cosmosBondedLoading, cosmosNetworks]);

  useMemo(() => {
    if (!cosmosAPYLoading) {
      const { eachCosmosAPY } = cosmosAPYData;
      eachCosmosAPY.forEach((data: any) => {
        const keys = Object.keys(cosmosNetworks);

        if (keys.includes(data.metric.instance)) {
          setCosmosNetworks((prev) => ({
            ...prev,
            [data.metric.instance]: {
              ...cosmosNetworks[data.metric.instance],
              APY: data.APY,
            },
          }));
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cosmosAPYData, cosmosAPYLoading]);

  useMemo(() => {
    if (!cosmosTVLLoading) {
      const { eachCosmosTVL } = cosmosTVLData;
      eachCosmosTVL.forEach((data: any) => {
        const keys = Object.keys(cosmosNetworks);

        if (keys.includes(data.metric.instance)) {
          setCosmosNetworks((prev) => ({
            ...prev,
            [data.metric.instance]: {
              ...cosmosNetworks[data.metric.instance],
              TVL: data.TVL,
            },
          }));
        }
      });
    }
    return cosmosNetworks;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cosmosTVLData, cosmosTVLLoading]);

  useMemo(() => {
    if (!elrondBondedLoading) {
      const { elrondBondedToken } = elrondBondedData;
      elrondBondedToken.forEach((data: any) => {
        const key = Object.keys(elrondNetwork);

        if (key.includes(data.metric.instance)) {
          setElrondNetwork((prev) => ({
            ...prev,
            [data.metric.instance]: {
              ...elrondNetwork[data.metric.instance],
              bonded: elrondNetworkFunctions.converter(data.bondedToken),
            },
          }));
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elrondBondedData, elrondBondedLoading]);

  useMemo(() => {
    if (!elrondAPYLoading) {
      const { elrondAPY } = elrondAPYData;
      elrondAPY.forEach((data: any) => {
        const key = Object.keys(elrondNetwork);
        if (key.includes(data.metric.instance)) {
          setElrondNetwork((prev) => ({
            ...prev,
            [data.metric.instance]: {
              ...elrondNetwork[data.metric.instance],
              APY: elrondNetworkFunctions.converter(data.APY),
            },
          }));
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elrondAPYData, elrondAPYLoading]);

  useMemo(() => {
    if (!elrondTVLLoading) {
      const { elrondTVL } = elrondTVLData;
      elrondTVL.forEach((data: any) => {
        const key = Object.keys(elrondNetwork);
        if (key.includes(data.metric.instance)) {
          setElrondNetwork((prev) => ({
            ...prev,
            [data.metric.instance]: {
              ...elrondNetwork[data.metric.instance],
              TVL: elrondNetworkFunctions.converter(data.TVL),
            },
          }));
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elrondTVLData, elrondTVLLoading]);

  useMemo(() => {
    if (!solanaTVLLoading) {
      const { solanaTVL } = solanaTVLData;
      setSolanaNetwork((prev) => ({
        ...prev,
        [solanaTVL.metric.instance]: {
          ...solanaNetwork[solanaTVL.metric.instance],
          TVL: solanaTVL.TVL,
        },
      }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solanaTVLLoading, solanaTVLData]);

  useMemo(() => {
    if (!solanaBondedLoading) {
      const { solanaBondedToken } = solanaBondedData;
      setSolanaNetwork((prev) => ({
        ...prev,
        [solanaBondedToken.metric.instance]: {
          ...solanaNetwork[solanaBondedToken.metric.instance],
          bonded: solanaBondedToken.bondedToken,
        },
      }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solanaBondedData, solanaBondedLoading]);

  useMemo(() => {
    if (!oasisTVLLoading) {
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
    if (!oasisBondedLoading) {
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

  useMemo(() => {
    if (!radixTVLLoading) {
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
    if (!radixBondedLoading) {
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
    solanaNetwork,
    oasisNetwork,
    radixNetwork,
  };
};

/* eslint-disable no-unused-expressions */

/* eslint-disable array-callback-return */

/* eslint-disable no-console */
import { gql, useQuery } from "@apollo/client";
import { useStakingContext } from "@contexts";
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
import { useEffect, useMemo, useState } from "react";

import {
  allNetworkKeys,
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

  const { setNetworkNumber } = useStakingContext();

  useEffect(() => {
    const networkLength = allNetworkKeys.length;
    setNetworkNumber(networkLength);
  }, [setNetworkNumber]);

  useMemo(() => {
    if (!cosmosBondedLoading) {
      const { eachCosmosBondedToken } = cosmosBondedData;
      eachCosmosBondedToken.map((data: any) => {
        const keys = Object.keys(cosmosNetworks);
        keys.includes(data.metric.instance)
          ? setCosmosNetworks((prev) => ({
              ...prev,
              [data.metric.instance]: {
                ...cosmosNetworks[data.metric.instance],
                bonded: data.bondedToken,
              },
            }))
          : null;
      });
    }
    return cosmosNetworks;
  }, [cosmosBondedData, cosmosBondedLoading]);

  useMemo(() => {
    if (!cosmosAPYLoading) {
      const { eachCosmosAPY } = cosmosAPYData;
      eachCosmosAPY.map((data: any) => {
        const keys = Object.keys(cosmosNetworks);
        keys.includes(data.metric.instance)
          ? setCosmosNetworks((prev) => ({
              ...prev,
              [data.metric.instance]: {
                ...cosmosNetworks[data.metric.instance],
                APY: data.APY,
              },
            }))
          : null;
      });
    }
    return cosmosNetworks;
  }, [cosmosAPYData, cosmosAPYLoading]);

  useMemo(() => {
    if (!cosmosTVLLoading) {
      const { eachCosmosTVL } = cosmosTVLData;
      eachCosmosTVL.map((data: any) => {
        const keys = Object.keys(cosmosNetworks);
        keys.includes(data.metric.instance)
          ? setCosmosNetworks((prev) => ({
              ...prev,
              [data.metric.instance]: {
                ...cosmosNetworks[data.metric.instance],
                TVL: data.TVL,
              },
            }))
          : null;
      });
    }
    return cosmosNetworks;
  }, [cosmosTVLData, cosmosTVLLoading]);

  useMemo(() => {
    if (!elrondBondedLoading) {
      const { elrondBondedToken } = elrondBondedData;
      elrondBondedToken.map((data: any) => {
        const key = Object.keys(elrondNetwork);
        key.includes(data.metric.instance)
          ? setElrondNetwork((prev) => ({
              ...prev,
              [data.metric.instance]: {
                ...elrondNetwork[data.metric.instance],
                bonded: elrondNetworkFunctions.converter(data.bondedToken),
              },
            }))
          : null;
      });
    }
  }, [elrondBondedData, elrondBondedLoading]);

  useMemo(() => {
    if (!elrondAPYLoading) {
      const { elrondAPY } = elrondAPYData;
      elrondAPY.map((data: any) => {
        const key = Object.keys(elrondNetwork);
        key.includes(data.metric.instance)
          ? setElrondNetwork((prev) => ({
              ...prev,
              [data.metric.instance]: {
                ...elrondNetwork[data.metric.instance],
                APY: elrondNetworkFunctions.converter(data.APY),
              },
            }))
          : null;
      });
    }
  }, [elrondAPYData, elrondAPYLoading]);

  useMemo(() => {
    if (!elrondTVLLoading) {
      const { elrondTVL } = elrondTVLData;
      elrondTVL.map((data: any) => {
        const key = Object.keys(elrondNetwork);
        key.includes(data.metric.instance)
          ? setElrondNetwork((prev) => ({
              ...prev,
              [data.metric.instance]: {
                ...elrondNetwork[data.metric.instance],
                TVL: elrondNetworkFunctions.converter(data.TVL),
              },
            }))
          : null;
      });
    }
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
  }, [oasisTVLLoading, oasisTVLData]);

  useMemo(() => {
    if (!oasisBondedLoading) {
      const { oasisBondedToken } = oasisBondedData;
      setOasisNetwork((prev) => ({
        ...prev,
        [oasisBondedToken[0].metric.instance]: {
          ...oasisNetwork[oasisBondedToken[0].metric.instance],
          bonded: oasisBondedToken[0].bondedToken,
        },
      }));
    }
  }, [oasisBondedData, oasisBondedLoading]);

  useMemo(() => {
    if (!radixTVLLoading) {
      const { radixTVL } = radixTVLData;
      setRadixNetwork((prev) => ({
        ...prev,
        [radixTVL[0].metric.instance]: {
          ...radixNetwork[radixTVL[0].metric.instance],
          TVL: radixTVL[0].TVL,
        },
      }));
    }
  }, [radixTVLLoading, radixTVLData]);

  useMemo(() => {
    if (!radixBondedLoading) {
      const { allRadixStakedTokens } = radixBondedData;
      setRadixNetwork((prev) => ({
        ...prev,
        [allRadixStakedTokens[0].metric.instance]: {
          ...oasisNetwork[allRadixStakedTokens[0].metric.instance],
          bonded: allRadixStakedTokens[0].bondedToken,
        },
      }));
    }
  }, [radixBondedData, radixBondedLoading]);

  return {
    cosmosNetworks,
    elrondNetwork,
    solanaNetwork,
    oasisNetwork,
    radixNetwork,
  };
};

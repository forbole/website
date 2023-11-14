import { gql, useQuery } from "@apollo/client";
import {
  getAllCosmosTVL,
  getCosmosUsersCount,
  getElrondTVL,
  getElrondUsersCount,
  getOasisTVL,
  getOasisUsersCount,
  getRadixTVL,
  getRadixUsersCount,
  getSolanaTVL,
  getSolanaUsersCount,
} from "@graphql/queries";
import { networkFunctions } from "@utils/network_functions";
import { networkNumber } from "@utils/network_info";
import { useEffect, useMemo, useState } from "react";

import { statsItems } from "./config";

export const useStatsHook = () => {
  const [stats, setStats] = useState(statsItems);
  const [cosmosTVL, setCosmosTVL] = useState(0);
  const [elrondTotalTVL, setElrondTotalTVL] = useState(0);
  const [solanaTotalTVL, setSolanaTotalTVL] = useState(0);
  const [oasisTotalTVL, setOasisTotalTVL] = useState(0);
  const [radixTotalTVL, setRadixTotalTVL] = useState(0);
  const [totalTVL, setTotalTVL] = useState(0);
  const [cosmosUser, setCosmosUser] = useState(0);
  const [solanaUser, setSolanaUser] = useState(0);
  const [elrondUser, setElrondUser] = useState(0);
  const [oasisUser, setOasisUser] = useState(0);
  const [radixUser, setRadixUser] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  const { loading: cosmosTotalTVLLoading, data: cosmosTotalTVL } = useQuery(gql`
    ${getAllCosmosTVL()}
  `);

  const { loading: cosmosUsersCountLoading, data: cosmosUsersCountData } =
    useQuery(gql`
      ${getCosmosUsersCount()}
    `);

  const { loading: elrondTVLLoading, data: elrondTVLData } = useQuery(gql`
    ${getElrondTVL()}
  `);

  const { loading: solanaTVLLoading, data: solanaTVLData } = useQuery(gql`
    ${getSolanaTVL()}
  `);

  const { loading: oasisTVLLoading, data: oasisTVLData } = useQuery(gql`
    ${getOasisTVL()}
  `);

  const { loading: radixTVLLoading, data: radixTVLData } = useQuery(gql`
    ${getRadixTVL()}
  `);

  const { loading: solanaUserLoading, data: solanaUserData } = useQuery(gql`
    ${getSolanaUsersCount()}
  `);

  const { loading: elrondUserLoading, data: elrondUserData } = useQuery(gql`
    ${getElrondUsersCount()}
  `);

  const { loading: oasisUserLoading, data: oasisUserData } = useQuery(gql`
    ${getOasisUsersCount()}
  `);

  const { loading: radixUserLoading, data: radixUserData } = useQuery(gql`
    ${getRadixUsersCount()}
  `);

  useEffect(() => {
    if (!cosmosUsersCountLoading) {
      const { cosmosUsersCount } = cosmosUsersCountData;
      setCosmosUser(cosmosUsersCount[0].usersCount);
    }
    if (!solanaUserLoading) {
      const { solanaUsers } = solanaUserData;
      setSolanaUser(solanaUsers.usersCount);
    }
    if (!elrondUserLoading) {
      const { elrondUsers } = elrondUserData;
      setElrondUser(elrondUsers[0].usersCount);
    }
    if (!oasisUserLoading) {
      const { oasisUsers } = oasisUserData;
      setOasisUser(oasisUsers[0].usersCount);
    }
    if (!radixUserLoading) {
      const { radixUsers } = radixUserData;
      setRadixUser(radixUsers[0].usersCount);
    }
  }, [
    cosmosUsersCountLoading,
    cosmosUsersCountData,
    solanaUserLoading,
    solanaUserData,
    elrondUserLoading,
    elrondUserData,
    oasisUserLoading,
    oasisUserData,
    radixUserLoading,
    radixUserData,
  ]);

  useMemo(() => {
    let userCount = 0;
    if (cosmosUser && Number(cosmosUser) !== 0) {
      userCount += Number(cosmosUser);
      setTotalUsers(userCount);
    }
    if (solanaUser && Number(solanaUser) !== 0) {
      userCount += Number(solanaUser);
      setTotalUsers(userCount);
    }
    if (elrondUser && Number(elrondUser) !== 0) {
      userCount += Number(elrondUser);
      setTotalUsers(userCount);
    }
    if (oasisUser && Number(oasisUser) !== 0) {
      userCount += Number(oasisUser);
      setTotalUsers(userCount);
    }
    if (radixUser && Number(radixUser) !== 0) {
      userCount += Number(radixUser);
      setTotalUsers(userCount);
    }
    statsItems.map((item, i) =>
      item.title === "users staking"
        ? setStats((prevStats) => ({
            ...prevStats,
            [i]: {
              ...item,
              stats: totalUsers,
            },
          }))
        : null,
    );
  }, [
    cosmosUser,
    solanaUser,
    elrondUser,
    oasisUser,
    radixUser,
    totalUsers,
    setTotalUsers,
  ]);

  useEffect(() => {
    if (!cosmosTotalTVLLoading) {
      const { allCosmosTVL } = cosmosTotalTVL;
      setCosmosTVL(allCosmosTVL[0].cosmosTVL);
    }
    if (!elrondTVLLoading) {
      const { elrondTVL } = elrondTVLData;
      const elrondNetworkFunctions = networkFunctions.elrond;
      const TVL = elrondNetworkFunctions.converter(elrondTVL[0].TVL);
      setElrondTotalTVL(TVL);
    }
    if (!solanaTVLLoading) {
      const { solanaTVL } = solanaTVLData;
      setSolanaTotalTVL(solanaTVL.TVL);
    }
    if (!oasisTVLLoading) {
      const { oasisTVL } = oasisTVLData;
      setOasisTotalTVL(oasisTVL[0].TVL);
    }
    if (!radixTVLLoading) {
      const { radixTVL } = radixTVLData;
      setRadixTotalTVL(radixTVL[0].TVL);
    }
  }, [
    cosmosTotalTVL,
    cosmosTotalTVLLoading,
    elrondTVLData,
    elrondTVLLoading,
    solanaTVLData,
    solanaTVLLoading,
    oasisTVLLoading,
    oasisTVLData,
    radixTVLLoading,
    radixTVLData,
  ]);

  useMemo(() => {
    let tvl = 0;
    if (cosmosTVL && Number(cosmosTVL) !== 0) {
      tvl += Number(cosmosTVL);
      setTotalTVL(tvl);
    }
    if (elrondTotalTVL && Number(elrondTotalTVL) !== 0) {
      tvl += Number(elrondTotalTVL);
      setTotalTVL(tvl);
    }
    if (solanaTotalTVL && Number(solanaTotalTVL) !== 0) {
      tvl += Number(solanaTotalTVL);
      setTotalTVL(tvl);
    }
    if (oasisTotalTVL && Number(oasisTotalTVL) !== 0) {
      tvl += Number(oasisTotalTVL);
      setTotalTVL(tvl);
    }
    if (radixTotalTVL && Number(radixTotalTVL) !== 0) {
      tvl += Number(radixTotalTVL);
      setTotalTVL(tvl);
    }
    statsItems.map((item, i) =>
      item.title === "full tvl"
        ? setStats((prevStats) => ({
            ...prevStats,
            [i]: {
              ...item,
              stats: totalTVL,
            },
          }))
        : null,
    );
  }, [
    cosmosTVL,
    elrondTotalTVL,
    solanaTotalTVL,
    oasisTotalTVL,
    radixTotalTVL,
    totalTVL,
    setTotalTVL,
  ]);

  useMemo(() => {
    if (networkNumber !== 0) {
      statsItems.map((item, i) =>
        item.title === "supporting networks"
          ? setStats((prevStats) => ({
              ...prevStats,
              [i]: {
                ...item,
                stats: networkNumber,
              },
            }))
          : null,
      );
    }
  }, []);

  return stats;
};

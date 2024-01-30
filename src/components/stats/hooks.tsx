import useTranslation from "next-translate/useTranslation";
import { useEffect, useMemo } from "react";
import { useQuery } from "urql";

import { statsQuery } from "@src/graphql/queries/stats";
import { useStakingRef } from "@src/screens/staking/lib/staking_sdk/context";
import {
  fetchCoinPriceForNetwork,
  fetchNetworksInfo,
} from "@src/screens/staking/lib/staking_sdk/context/actions";
import { getNetworkTVL } from "@src/screens/staking/lib/staking_sdk/context/selectors";
import { StakingNetworkId } from "@src/screens/staking/lib/staking_sdk/core";
import { networkFunctions } from "@src/utils/network_functions";
import { networkNumber } from "@src/utils/network_info";

const elrondNetworkFunctions = networkFunctions.elrond;

type StatsItem = {
  stats: number | string;
  title: string;
};

// These networks don't have the exporter enabled so the value from the staking API is added
const networksWithStakingTVL = [
  StakingNetworkId.Celestia,
  StakingNetworkId.DyDx,
];

export const useStatsHook = () => {
  const { t } = useTranslation("common");
  const stakingRef = useStakingRef();

  useEffect(() => {
    fetchNetworksInfo(stakingRef.current);
    fetchCoinPriceForNetwork(stakingRef.current, networksWithStakingTVL);
  }, [stakingRef]);

  const stats: StatsItem[] = useMemo(
    () => [
      {
        stats: "-",
        title: t("full tvl"),
      },
      {
        stats: "-",
        title: t("users staking"),
      },
      {
        stats: networkNumber,
        title: t("supporting networks"),
      },
    ],
    [t],
  );

  const [{ data: statsQueryData, fetching: statsQueryLoading }] = useQuery({
    query: statsQuery,
  });

  const extraTVL = networksWithStakingTVL.reduce((acc, network) => {
    const networkTVL = getNetworkTVL(stakingRef.current.state, network);

    if (!networkTVL) return acc;

    return acc + networkTVL.toNumber();
  }, 0);

  const parsedStats = useMemo(() => {
    if (!statsQueryLoading && statsQueryData) {
      const {
        allCosmosTVL,
        archwayTVL,
        cosmosUsersCount,
        elrondTVL,
        elrondUsers,
        oasisTVL,
        oasisUsers,
        radixTVL,
        radixUsers,
        solanaTVL,
        solanaUsers,
        suiTVL,
      } = statsQueryData;

      return stats.map((stat) => {
        if (stat.title === t("users staking"))
          return {
            ...stat,
            stats:
              (stat.stats === "-" ? 0 : Number(stat.stats)) +
                Number(cosmosUsersCount[0].usersCount || 0) +
                Number(oasisUsers[0].usersCount || 0) +
                Number(radixUsers[0].usersCount || 0) +
                Number(elrondUsers[0].usersCount || 0) +
                Number(solanaUsers.usersCount || 0) || "-",
          };

        if (stat.title === t("full tvl")) {
          return {
            ...stat,
            stats:
              Number(archwayTVL?.[0]?.TVL || 0) +
              Number(allCosmosTVL?.[0]?.cosmosTVL || 0) +
              Number(solanaTVL?.TVL || 0) +
              Number(oasisTVL?.[0]?.TVL || 0) +
              Number(radixTVL?.[0]?.TVL || 0) +
              Number(suiTVL?.[0]?.TVL || 0) +
              elrondNetworkFunctions.converter(elrondTVL?.[0]?.TVL || 0) +
              extraTVL,
          };
        }

        return stat;
      });
    }

    return stats;
  }, [statsQueryLoading, statsQueryData, stats, t, extraTVL]);

  return parsedStats;
};

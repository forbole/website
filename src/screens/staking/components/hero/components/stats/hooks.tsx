import { useQuery } from "@apollo/client";
import useTranslation from "next-translate/useTranslation";
import { useMemo } from "react";

import { statsQuery } from "@src/graphql/queries/stats";
import { networkFunctions } from "@utils/network_functions";
import { networkNumber } from "@utils/network_info";

const elrondNetworkFunctions = networkFunctions.elrond;

type StatsItem = {
  stats: string | number;
  title: string;
};

export const useStatsHook = () => {
  const { t } = useTranslation("common");

  const stats: StatsItem[] = useMemo(
    () => [
      {
        title: t("full tvl"),
        stats: "-",
      },
      {
        title: t("users staking"),
        stats: "-",
      },
      {
        title: t("supporting networks"),
        stats: networkNumber,
      },
    ],
    [t],
  );

  const { loading: statsQueryLoading, data: statsQueryData } =
    useQuery(statsQuery);

  const parsedStats = useMemo(() => {
    if (!statsQueryLoading && statsQueryData) {
      const {
        allCosmosTVL,
        cosmosUsersCount,
        elrondTVL,
        elrondUsers,
        oasisTVL,
        oasisUsers,
        radixTVL,
        radixUsers,
        solanaTVL,
        solanaUsers,
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

        if (stat.title === t("full tvl"))
          return {
            ...stat,
            stats:
              Number(allCosmosTVL?.[0]?.cosmosTVL || 0) +
              Number(solanaTVL?.TVL || 0) +
              Number(oasisTVL?.[0]?.TVL || 0) +
              Number(radixTVL?.[0]?.TVL || 0) +
              elrondNetworkFunctions.converter(elrondTVL?.[0]?.TVL || 0),
          };

        return stat;
      });
    }

    return stats;
  }, [statsQueryLoading, statsQueryData, stats, t]);

  return parsedStats;
};

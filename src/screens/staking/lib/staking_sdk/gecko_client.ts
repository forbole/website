import { IS_E2E } from "@src/utils/e2e";

import { CoinDenom } from "./core";

export type CoinsPricesResult = { [key in CoinDenom]?: string };

export const geckoClient = {
  getCoinsPrices: async (): Promise<CoinsPricesResult> => {
    const denomToEndpoint: Record<CoinDenom, null | string> = {
      [CoinDenom.AKT]: "akash-network",
      [CoinDenom.ATOM]: "cosmos",
      [CoinDenom.DYDX]: "dydx",
      [CoinDenom.OSMO]: "osmosis",
      [CoinDenom.PICA]: "picasso",
      [CoinDenom.REGEN]: "regen",
      [CoinDenom.TIA]: "celestia",
    } as const;

    const endpointToDenom = Object.fromEntries(
      Object.entries(denomToEndpoint).map(([k, v]) => [v, k]),
    ) as Record<string, CoinDenom>;

    const denoms = Object.keys(denomToEndpoint) as CoinDenom[];

    const ids = denoms
      .map((denom) => denomToEndpoint[denom])
      .filter(Boolean)
      .join(",");

    const defaultValue = {};

    return IS_E2E
      ? Promise.resolve(defaultValue)
      : fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`,
        )
          .then((res) => res.json() as Promise<Record<string, { usd: number }>>)
          .then((data) =>
            Object.keys(data).reduce((acc, key) => {
              const price =
                data[key as keyof typeof data]?.usd?.toString() || "-1";

              const denom = endpointToDenom[key];

              acc[denom] = price;

              return acc;
            }, {} as CoinsPricesResult),
          )
          .catch(() => defaultValue);
  },
};

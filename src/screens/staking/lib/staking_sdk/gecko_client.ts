import BigNumber from "bignumber.js";

import { IS_E2E } from "@src/utils/e2e";

import { CoinDenom } from "./core";

const denomToEndpoint: Record<CoinDenom, string> = {
  [CoinDenom.AKT]: "akash-network",
  [CoinDenom.ATOM]: "cosmos",
  [CoinDenom.DYDX]: "dydx",
  [CoinDenom.TIA]: "celestia",
} as const;

const denomToMultiplier: Record<CoinDenom, number> = {
  [CoinDenom.AKT]: 0,
  [CoinDenom.ATOM]: 0,
  [CoinDenom.DYDX]: 0,
  [CoinDenom.TIA]: 0,
} as const;

const queryOpts = new URLSearchParams({
  community_data: "false",
  developer_data: "false",
  market_data: "true",
  sparkline: "false",
  tickers: "false",
});

export const geckoClient = {
  getCoinPrice: async (denom: CoinDenom): Promise<string> =>
    IS_E2E
      ? Promise.resolve("0.1")
      : fetch(
          `https://api.coingecko.com/api/v3/coins/${denomToEndpoint[denom]}?${queryOpts}`,
        )
          .then((res) => res.json())
          .then((data) => {
            const basePrice = new BigNumber(
              data?.market_data?.current_price?.usd,
            );

            const multiplier = new BigNumber(10).pow(denomToMultiplier[denom]);

            return basePrice.multipliedBy(multiplier).toString();
          }),
};

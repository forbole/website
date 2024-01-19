import BigNumber from "bignumber.js";

import { IS_E2E } from "@src/utils/e2e";

import { CoinDenom } from "./core";
import { adydxExp, uaktExp, uatomExp, utiaExp } from "./utils/coins";

const denomToEndpoint: Record<CoinDenom, string> = {
  [CoinDenom.AKT]: "akash-network",
  [CoinDenom.ATOM]: "cosmos",
  [CoinDenom.DYDX]: "dydx",
  [CoinDenom.TIA]: "celestia",
} as const;

const denomToMultiplier: Record<CoinDenom, number> = {
  [CoinDenom.AKT]: uaktExp,
  [CoinDenom.ATOM]: uatomExp,
  [CoinDenom.DYDX]: adydxExp,
  [CoinDenom.TIA]: utiaExp,
} as const;

export const geckoClient = {
  getCoinPrice: async (denom: CoinDenom): Promise<string> =>
    IS_E2E
      ? Promise.resolve("0.1")
      : fetch(
          `https://api.coingecko.com/api/v3/coins/${denomToEndpoint[denom]}`,
        )
          .then((res) => res.json())
          .then((data) => {
            const basePrice = new BigNumber(
              data?.market_data?.current_price?.usd,
            );

            const multiplier = new BigNumber(10).pow(denomToMultiplier[denom]);

            return basePrice.dividedBy(multiplier).toString();
          }),
};

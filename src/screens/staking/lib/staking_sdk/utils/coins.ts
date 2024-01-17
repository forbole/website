import type { Coin } from "@cosmjs/stargate";

type DenomToResolve = "adydx" | "uatom" | "utia";

const uatomExp = 6;
const utiaExp = 6;
const adydxExp = 18;

export const resolveCoin = (coin: Coin): Coin => {
  const num = Number(coin.amount);

  if (Number.isNaN(num)) {
    return coin;
  }

  const compared = coin.denom?.toLowerCase() as DenomToResolve;

  switch (compared) {
    case "uatom": {
      return {
        amount: (num / 10 ** uatomExp).toString(),
        denom: "ATOM",
      };
    }

    case "utia": {
      return {
        amount: (num / 10 ** utiaExp).toString(),
        denom: "TIA",
      };
    }

    case "adydx": {
      return {
        amount: (num / 10 ** adydxExp).toString(),
        denom: "DYDX",
      };
    }

    default: {
      compared satisfies never;
    }
  }

  return {
    ...coin,
    denom: coin.denom?.toUpperCase(),
  };
};

// @TODO: Improve multiple denoms handling
export const sumCoins = (coinA?: Coin, coinB?: Coin): Coin => ({
  amount: (Number(coinA?.amount || 0) + Number(coinB?.amount || 0)).toString(),
  denom: coinA?.denom || coinB?.denom || "",
});

export const getEmptyCoin = (): Coin => ({ amount: "0", denom: "" });

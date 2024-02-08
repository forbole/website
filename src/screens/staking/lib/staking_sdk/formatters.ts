import BigNumber from "bignumber.js";

import type { Coin } from "./core";
import { normaliseCoin } from "./utils/coins";

type FormatOpts = {
  decimals?: number;
  maximumFractionDigits?: number;
};

export const formatCoin = (coin: Coin, opts: FormatOpts = {}): string => {
  if (!coin?.denom) {
    return "";
  }

  const normalisedCoin = normaliseCoin(coin);
  const num = new BigNumber(normalisedCoin?.amount);

  if (num.isNaN()) {
    return `- ${coin.denom.toUpperCase()}`;
  }

  const { decimals, maximumFractionDigits } = opts;

  const formatNum = (n: BigNumber): string =>
    n.toNumber().toLocaleString("en-US", {
      maximumFractionDigits: maximumFractionDigits ?? decimals ?? 6,
      minimumFractionDigits: decimals ?? 2,
    });

  return `${formatNum(num)} ${normalisedCoin.denom}`;
};

export const formatStakedDataUSD = (stakedData: Coin, coinPrice: string) => {
  const stakedNormalised = normaliseCoin(stakedData);
  const coinNum = new BigNumber(stakedNormalised.amount);
  const coinValue = coinNum.multipliedBy(new BigNumber(coinPrice));

  const minNum = new BigNumber(10).pow(-5);

  if (coinValue.isNaN() || coinValue.lt(minNum)) {
    return `< ${minNum.toFormat(5)} USD`;
  }

  return `≈ ${coinValue.toFormat(5)} USD`;
};

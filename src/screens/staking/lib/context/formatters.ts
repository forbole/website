import type { Account } from "./types";

const formatNum = (num: number): string =>
  num.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });

const uatomExp = 6;

export const resolveDenom = (denom: string): string => {
  if (!denom) {
    return "";
  }

  switch (denom) {
    case "uatom": {
      return "ATOM";
    }
  }

  return denom.toUpperCase();
};

export const formatDenom = (denom: string, value: string): string => {
  const num = Number(value);

  if (!denom) {
    return "";
  }

  if (Number.isNaN(num)) {
    return `- ${denom.toUpperCase()}`;
  }

  switch (denom) {
    case "uatom": {
      return `${formatNum(num / 10 ** uatomExp)} ATOM`;
    }
  }

  return `${formatNum(num)} ${denom.toUpperCase()}`;
};

export const sortAccounts = (a: Account, b: Account) =>
  a.address.localeCompare(b.address);

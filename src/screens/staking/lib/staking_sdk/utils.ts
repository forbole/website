import type { Coin } from "@cosmjs/stargate";

import type { WalletId } from "./types";

const localStorageKey = "connectedWallets";

export const getConnectedWallets = (): WalletId[] => {
  const connectedWallets = window.localStorage.getItem(localStorageKey);

  if (!connectedWallets) {
    return [];
  }

  try {
    const parsedWallets = JSON.parse(connectedWallets);

    return parsedWallets;
  } catch (e) {
    return [];
  }
};

export const addToConnectedWallets = (wallet: WalletId) => {
  const connectedWallets = getConnectedWallets();

  const newWalletsSet = new Set([...connectedWallets, wallet]);
  const newWallets = Array.from(newWalletsSet);

  window.localStorage.setItem(localStorageKey, JSON.stringify(newWallets));
};

export const clearConnectedWallets = () => {
  window.localStorage.removeItem(localStorageKey);
};

// @TODO: Improve multiple denoms handling
export const sumCoins = (coinA?: Coin, coinB?: Coin): Coin => ({
  amount: (Number(coinA?.amount || 0) + Number(coinB?.amount || 0)).toString(),
  denom: coinA?.denom || coinB?.denom || "",
});

export const getEmptyCoin = (): Coin => ({ amount: "0", denom: "" });

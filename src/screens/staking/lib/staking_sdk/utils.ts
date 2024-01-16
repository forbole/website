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

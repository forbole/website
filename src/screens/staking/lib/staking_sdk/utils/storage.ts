import { walletsSupported } from "../core";
import type { WalletId } from "../core/base";

const walletsStorageKey = "connectedWallets";
const stakedStorageKey = "hasStaked";
const unstakedStorageKey = "hasUnstaked";

export const getConnectedWallets = (): WalletId[] => {
  const connectedWallets = window.localStorage.getItem(walletsStorageKey);

  if (!connectedWallets) {
    return [];
  }

  try {
    const parsedWallets: WalletId[] = JSON.parse(connectedWallets);

    return parsedWallets.filter((w) => walletsSupported.has(w));
  } catch (e) {
    return [];
  }
};

export const addToConnectedWallets = (wallet: WalletId) => {
  const connectedWallets = getConnectedWallets();

  const newWalletsSet = new Set([...connectedWallets, wallet]);
  const newWallets = Array.from(newWalletsSet);

  window.localStorage.setItem(walletsStorageKey, JSON.stringify(newWallets));
};

export const setConnectedWallet = (walletsIds: WalletId[]) => {
  if (!walletsIds.length) {
    window.localStorage.removeItem(walletsStorageKey);
  } else {
    const newWalletsSet = new Set([...walletsIds]);
    const newWallets = Array.from(newWalletsSet);

    window.localStorage.setItem(walletsStorageKey, JSON.stringify(newWallets));
  }
};

export const getHasStaked = () =>
  window.localStorage.getItem(stakedStorageKey) === "true";

export const setHasStaked = () =>
  window.localStorage.setItem(stakedStorageKey, "true");

export const getHasUnstaked = () =>
  window.localStorage.getItem(unstakedStorageKey) === "true";

export const setHasUnstaked = () =>
  window.localStorage.setItem(unstakedStorageKey, "true");

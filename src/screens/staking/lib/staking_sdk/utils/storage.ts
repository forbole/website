import { walletsSupported } from "../core";
import type { WalletId } from "../core/base";

const walletsStorageKey = "connectedWallets";
const stakedStorageKey = "hasStaked";
const unstakedStorageKey = "hasUnstaked";

const solanaWithdrawReady = "solanaWithdrawReady";

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

/**
 * This function checks if the value was notified in the last 24 hours
 */
export const getSolanaWithdrawNotified = () => {
  const val = window.localStorage.getItem(solanaWithdrawReady);

  if (!val) return false;

  const dateTimestamp = JSON.parse(val);

  if (Number.isNaN(dateTimestamp)) return false;

  const now = Date.now();

  return now - dateTimestamp < 1000 * 60 * 60 * 24;
};

export const setSolanaWithdrawNotified = () => {
  window.localStorage.setItem(solanaWithdrawReady, JSON.stringify(Date.now()));
};

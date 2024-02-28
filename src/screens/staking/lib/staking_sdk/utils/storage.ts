import { WalletId } from "../core";

const localStorageKey = "connectedWallets";

export const getConnectedWallets = (): WalletId[] => {
  const connectedWallets = window.localStorage.getItem(localStorageKey);

  if (!connectedWallets) {
    return [];
  }

  try {
    const parsedWallets: WalletId[] = JSON.parse(connectedWallets);

    return parsedWallets.filter((walletId) => walletId !== WalletId.Leap); // TODO remove this line when staking with Leap Wallet is reliable
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

export const setConnectedWallet = (walletsIds: WalletId[]) => {
  if (!walletsIds.length) {
    window.localStorage.removeItem(localStorageKey);
  } else {
    const newWalletsSet = new Set([...walletsIds]);
    const newWallets = Array.from(newWalletsSet);

    window.localStorage.setItem(localStorageKey, JSON.stringify(newWallets));
  }
};

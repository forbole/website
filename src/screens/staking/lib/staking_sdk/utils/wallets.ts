import type { WalletId } from "../core";

export const sortWallets = (a: WalletId, b: WalletId) => a.localeCompare(b);

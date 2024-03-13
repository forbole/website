import type { WalletId } from "../core/base";

export const sortWallets = (a: WalletId, b: WalletId) => a.localeCompare(b);
